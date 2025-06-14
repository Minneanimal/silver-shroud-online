// Define constants for dice types
const D4 = 4;
const D6 = 6;
const D8 = 8;
const D10 = 10;
const D12 = 12;
const D20 = 20;

// Function to roll a single die of a given type
export function rollDie(sides: number): number {
	return Math.floor(Math.random() * sides) + 1;
}

export const parseDiceNotation = (
	notation: string
): { numDice: number; sides: number; modifier: number } => {
	const match = notation.match(/^(\d+)?d(\d+)([+-]\d+)?$/);
	if (!match) {
		throw new Error("Invalid dice notation");
	}
	const numDice = match[1] ? parseInt(match[1], 10) : 1; // Default to 1 die if not specified
	const sides = parseInt(match[2], 10);
	const modifier = match[3] ? parseInt(match[3], 10) : 0; // Default to 0 modifier if not specified
	return { numDice, sides, modifier };
};

// General function to roll multiple dice of the same type
export function rollDice(
	diceType: number,
	numRolls: number,
	modifier: number = 0
): number {
	let sum = 0;
	for (let i = 0; i < numRolls; i++) {
		sum += rollDie(diceType);
	}
	return sum + modifier;
}

export const rollStat = (stat: string, modifier: number): number => {
	console.log("Rolling stat:", stat, "with modifier:", modifier);
	const { numDice, sides } = parseDiceNotation(stat);
	return rollDice(sides, numDice, modifier);
};
