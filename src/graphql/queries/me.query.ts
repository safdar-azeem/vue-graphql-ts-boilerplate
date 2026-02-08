import gql from 'graphql-tag'

export const MEQUERY = gql`
	query Me {
		me {
			id
			email
			username
			mfaSettings {
				isEnabled
				method
			}
			createdAt
			updatedAt
		}
	}
`
