import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import {auth} from '@/services/auth.ts'

const authOptions = {
	providers:[
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				username: {label: "Username", type: "text", placeholder: "Username"},
				password: {label: "Password", type: "password", placeholder: "Password"}
			},
			async authorize(credentials, req){
				const {username, password} = credentials
				// console.log(credentials)
				const user = await auth(username,password)
				// console.log(user)

				if (!user.data) return null

				return {
					id: user.id,
					name: user.username
				}
			}
		})
	]
}

const handler = NextAuth(authOptions)

export {handler as GET, handler as POST}