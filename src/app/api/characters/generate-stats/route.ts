import { createCharacter } from "@/lib/data/character";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
	const { name, age, race, level, user_id } = await req.json();
	if (!name || !age || !race || !user_id) {
		return NextResponse.json(
			{ error: "Missing required fields" },
			{ status: 400 }
		);
	}
	const character = await createCharacter(name, age, race, level, user_id);
	console.log("Character created:", character);
	if (!character) {
		return NextResponse.json(
			{ error: "Failed to create character" },
			{ status: 500 }
		);
	}
	console.log("Character created successfully:", character);
	return NextResponse.json(character);
};
