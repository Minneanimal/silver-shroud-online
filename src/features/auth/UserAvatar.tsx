import { auth } from "@/lib/auth/auth";

export default async function UserAvatar() {
	const session = await auth();

	if (!session?.user) return null;

	return (
		<div>
			<img
				src={session.user.image ? session.user.image : "/default-avatar.png"}
				alt="User Avatar"
			/>
		</div>
	);
}
