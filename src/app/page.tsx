import { SignIn } from "@/features/auth/SignInButton";
import styles from "./page.module.css";
import { SignOut } from "@/features/auth/SignOutButton";
import { checkIsAuthenticated } from "@/lib/auth/isAuthenticated";

export default async function Home() {
	const authenticated = await checkIsAuthenticated();

	if (!authenticated) return <SignIn />;
	return (
		<div className={styles.page}>
			<main className={styles.main}>
				<SignOut />
				<h1>Welcome to the app!</h1>
			</main>
		</div>
	);
}
