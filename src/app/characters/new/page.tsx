import CharacterCreationForm from "@/features/characters/CreateCharacterForm";
import { getUser } from "@/lib/auth/isAuthenticated";
import { getRaces } from "@/lib/data/races";

export default async function page() {
	const races = await getRaces();
	const user = await getUser();
	return (
		<CharacterCreationForm
			races={races}
			user={user}
		/>
	);
}
