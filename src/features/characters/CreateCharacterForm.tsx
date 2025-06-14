"use client";
import { Race, Character } from "@/types";
import { useState } from "react";
import { getDamageModifierInfo } from "@/lib/damageModifier";

interface Props {
	races: Race[];
	user: any;
}

export default function RaceSelector({ races, user }: Props) {
	const [selectedRaceId, setSelectedRaceId] = useState<number>(1);
	const [name, setName] = useState<string>("");
	const [age, setAge] = useState<number>(20);
	const [generatedCharacter, setGeneratedCharacter] =
		useState<Character | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	async function generateStats() {
		setIsLoading(true);
		try {
			const response = await fetch("/api/characters/generate-stats", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					name,
					age: age,
					race: races.find((r) => r.id === selectedRaceId),
					level: 1,
					user_id: user.id,
				}),
			});

			if (!response.ok) {
				console.error("Failed to generate character stats");
				return;
			}

			const character = await response.json();
			setGeneratedCharacter(character);
		} catch (error) {
			console.error("Error generating character stats:", error);
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<div>
			<label>
				Race:
				<select
					value={selectedRaceId}
					onChange={(e) => setSelectedRaceId(Number(e.target.value))}>
					<option
						value=""
						disabled>
						Select a race
					</option>
					{races.map((race) => (
						<option
							key={race.id}
							value={race.id}>
							{race.name}
						</option>
					))}
				</select>
			</label>
			<label>
				Name:
				<input
					type="text"
					value={name}
					onChange={(e) => setName(e.target.value)}
					placeholder="Enter character name"
				/>
			</label>
			<label>
				Age:
				<input
					type="number"
					value={age}
					onChange={(e) => setAge(Number(e.target.value))}
					min={0}
					max={200}
				/>
			</label>
			<button
				onClick={generateStats}
				disabled={!name || selectedRaceId === 0 || isLoading}>
				{isLoading ? "Generating..." : "Generate Stats"}
			</button>

			{generatedCharacter && (
				<div
					style={{
						marginTop: "20px",
						padding: "20px",
						border: "1px solid #ccc",
						borderRadius: "8px",
					}}>
					<h3>Character Created Successfully!</h3>
					<div
						style={{
							display: "grid",
							gridTemplateColumns: "repeat(2, 1fr)",
							gap: "10px",
						}}>
						<div>
							<strong>Name:</strong> {generatedCharacter.name}
						</div>
						<div>
							<strong>Race:</strong>{" "}
							{races.find((r) => r.id === generatedCharacter.race_id)?.name}
						</div>
						<div>
							<strong>Level:</strong> {generatedCharacter.level}
						</div>
						<div>
							<strong>Movement:</strong> {generatedCharacter.movement}
						</div>
						<div>
							<strong>Strength:</strong> {generatedCharacter.str}
						</div>
						<div>
							<strong>Constitution:</strong> {generatedCharacter.con}
						</div>
						<div>
							<strong>Size:</strong> {generatedCharacter.siz}
						</div>
						<div>
							<strong>Dexterity:</strong> {generatedCharacter.dex}
						</div>
						<div>
							<strong>Intelligence:</strong> {generatedCharacter.int}
						</div>
						<div>
							<strong>Power:</strong> {generatedCharacter.pow}
						</div>
						<div>
							<strong>Charisma:</strong> {generatedCharacter.cha}
						</div>
						<div
							style={{
								gridColumn: "1 / -1",
								marginTop: "10px",
								padding: "10px",
								backgroundColor: "#f5f5f5",
								borderRadius: "4px",
							}}>
							<strong>Damage Modifier:</strong>{" "}
							{
								getDamageModifierInfo(
									generatedCharacter.str,
									generatedCharacter.siz
								).modifier
							}
							<br />
							<small>
								{
									getDamageModifierInfo(
										generatedCharacter.str,
										generatedCharacter.siz
									).explanation
								}
							</small>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
