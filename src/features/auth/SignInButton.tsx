import { signIn } from "@/lib/auth/auth";

export function SignIn() {
	return (
		<form
			action={async () => {
				"use server";
				await signIn("github");
			}}>
			<button type="submit">Sign in</button>
		</form>
	);
}
