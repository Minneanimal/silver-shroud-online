"use client";
import { useState } from "react";
import { rollDice, parseDiceNotation } from "@/lib/dice";

interface Race {
	id: number;
	name: string;
	movement?: number;
	description?: string;
	str: string;
	str_modifier: number;
	con: string;
	con_modifier: number;
	dex: string;
	dex_modifier: number;
	int: string;
	int_modifier: number;
	pow: string;
	pow_modifier: number;
	cha: string;
	cha_modifier: number;
	siz: string;
	siz_modifier: number;
}

interface Props {
	races: Race[];
}

export default function CharacterCreationForm({ races }: Props) {
	const [selectedRaceId, setSelectedRaceId] = useState<number | "">("");
	const [strength, setStrength] = useState<number | null>(null);
	const [constitution, setConstitution] = useState<number | null>(null);
	const [size, setSize] = useState<number | null>(null);
	const [dexterity, setDexterity] = useState<number | null>(null);
	const [intelligence, setIntelligence] = useState<number | null>(null);
	const [power, setPower] = useState<number | null>(null);
	const [charisma, setCharisma] = useState<number | null>(null);

	console.log(
		"Selected race:",
		races.find((r) => r.id === selectedRaceId)
	);

	const rollStat = (stat: string, modifier: number): number => {
		console.log("Rolling stat:", stat, "with modifier:", modifier);
		const { numDice, sides } = parseDiceNotation(stat);
		return rollDice(sides, numDice, modifier);
	};

	const handleRoll = () => {
		const race = races.find((r) => r.id === selectedRaceId);
		if (!race) return;
		const newStrength = rollStat(race.str, race.str_modifier);
		const newConstitution = rollStat(race.con, race.con_modifier);
		const newSize = rollStat(race.siz, race.siz_modifier);
		const newDexterity = rollStat(race.dex, race.dex_modifier);
		const newIntelligence = rollStat(race.int, race.int_modifier);
		const newPower = rollStat(race.pow, race.pow_modifier);
		const newCharisma = rollStat(race.cha, race.cha_modifier);
		setStrength(newStrength);
		setConstitution(newConstitution);
		setSize(newSize);
		setDexterity(newDexterity);
		setIntelligence(newIntelligence);
		setPower(newPower);
		setCharisma(newCharisma);
	};

	return (
		<div>
			<h1>Create Character</h1>
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
			<button
				onClick={handleRoll}
				disabled={selectedRaceId === ""}>
				Roll Stats
			</button>
			{strength !== null &&
				constitution !== null &&
				size !== null &&
				dexterity !== null &&
				intelligence !== null &&
				power !== null &&
				charisma !== null && (
					<div>
						<p>Strength: {strength}</p>
						<p>Constitution: {constitution}</p>
						<p>Size: {size}</p>
						<p>Dexterity: {dexterity}</p>
						<p>Intelligence: {intelligence}</p>
						<p>Power: {power}</p>
						<p>Charisma: {charisma}</p>
					</div>
				)}
		</div>
	);
}
