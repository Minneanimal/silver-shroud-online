import CharacterCreationForm from "@/features/characters/CreateCharacterForm";
import { getRaces } from "@/lib/data/races";

export default async function page() {
	const races = await getRaces();
	return <CharacterCreationForm races={races} />;
}
