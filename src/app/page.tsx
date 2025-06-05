import { SignIn } from "@/features/auth/SignInButton";
import styles from "./page.module.css";
import { auth } from "@/lib/auth";
import { SignOut } from "@/features/auth/SignOutButton";

export default async function Home() {
	const session = await auth();

	if (!session?.user) return <SignIn />;
	return (
		<div className={styles.page}>
			<main className={styles.main}>
				<SignOut />
				<h1>Welcome to the app!</h1>
			</main>
		</div>
	);
}
