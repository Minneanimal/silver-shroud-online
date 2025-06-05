import { signIn } from "@/lib/auth/authConfig";

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
