import NextAuth from "next-auth";
import PostgresAdapter from "@auth/pg-adapter";
import { Pool } from "pg";
import GitHub from "next-auth/providers/github";

const pool = new Pool({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	max: 20,
	idleTimeoutMillis: 30000,
	connectionTimeoutMillis: 2000,
});

export const { handlers, auth, signIn, signOut } = NextAuth({
	adapter: PostgresAdapter(pool),
	providers: [GitHub],
	session: {
		strategy: "jwt",
		maxAge: 2592000,
	},
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				return {
					...token,
					id: user.id,
				};
			}
			return token;
		},
		async session({ session, token }) {
			console.log("session callback", { session, token });
			return {
				...session,
				user: {
					...session.user,
					id: token.id as string,
				},
			};
		},
	},
});
