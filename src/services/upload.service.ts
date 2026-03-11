import { loadApolloClients } from 'vue-apollo-client'
import { useRequestUploadUrlMutation, useConfirmUploadMutation } from '@/graphql'

export const uploadHandler = async (
  fileInput: File | { file: File; fileName?: string },
  folderIdentifier?: string | null
): Promise<string | null | undefined> => {
  const file = fileInput instanceof File ? fileInput : fileInput.file

  loadApolloClients()

  try {
    const isId =
      folderIdentifier && (folderIdentifier.length === 25 || folderIdentifier.length === 36)

    // 3. Step 1: Request Pre-signed URL
    const { mutate: requestURL } = useRequestUploadUrlMutation()

    const { data: requestData } = await requestURL({
      input: {
        filename: file.name,
        mimeType: file.type,
        size: file.size,
        folderId: isId ? folderIdentifier : null,
        folderName: !isId && folderIdentifier ? folderIdentifier : null,
        isPublic: true, // Avatars are generally public
      } as any,
    })

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
      throw new Error(`Storage upload failed: ${uploadResponse.statusText}`)
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
    throw error
  }
}
