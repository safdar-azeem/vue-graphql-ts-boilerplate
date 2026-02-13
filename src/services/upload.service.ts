import { loadApolloClients } from 'vue-apollo-client'
import {
	RequestUploadUrlDocument,
	ConfirmUploadDocument,
	type RequestUploadUrlMutation,
	type RequestUploadUrlMutationVariables,
	type ConfirmUploadMutation,
	type ConfirmUploadMutationVariables,
	useRequestUploadUrlMutation,
	useConfirmUploadMutation,
} from '@/graphql/generated'

/**
 * Global File Upload Handler for VLite3
 * Orchestrates the secure upload flow:
 * 1. Request Signed URL (API)
 * 2. Upload File (Storage Provider)
 * 3. Confirm Upload (API)
 */
export const uploadHandler = async (
	fileInput: File | { file: File; fileName?: string },
	folderId?: string | null,
): Promise<string | null | undefined> => {
	console.log('folderId :>> ', folderId)
	// 1. Resolve File Object
	const file = fileInput instanceof File ? fileInput : fileInput.file

	// 2. Get Apollo Client (works outside Vue components)
	loadApolloClients()

	try {
		// 3. Step 1: Request Pre-signed URL
		const { mutate: requestURL } = useRequestUploadUrlMutation()

		const { data: requestData } = await requestURL({
			input: {
				filename: file.name,
				mimeType: file.type,
				size: file.size,
				folderId: folderId || null,
				isPublic: true, // Avatars are generally public
			},
		})

		console.log('requestData :>> ', requestData)

		if (!requestData?.requestUploadUrl) {
			throw new Error('Failed to generate upload URL')
		}

		const { signedUrl, fileId, publicUrl } = requestData.requestUploadUrl

		// 4. Step 2: Upload to Storage (Direct PUT)
		// Note: We use native fetch here to avoid Apollo middleware interference on external URLs
		const uploadResponse = await fetch(signedUrl, {
			method: 'PUT',
			body: file,
			headers: {
				'Content-Type': file.type,
				// Note: Do not add Authorization headers here for S3/Cloudinary presigned URLs
			},
		})

		if (!uploadResponse.ok) {
			throw new Error(
				`Storage upload failed: ${uploadResponse.statusText}`,
			)
		}

		// 5. Step 3: Confirm Upload
		const { mutate: confirmUpload } = useConfirmUploadMutation()

		const { data: confirmData } = await confirmUpload({
			fileId,
		})

		if (!confirmData?.confirmUpload) {
			throw new Error('Failed to confirm upload status')
		}

		// Return the final URL for the UI (resolved by the server based on FILE_PROXY_MODE)
		return confirmData.confirmUpload.url
	} catch (error) {
		console.error('[Upload Service] Error:', error)
		// Throwing ensures vlite3 catches the error and updates UI state
		throw error
	}
}
