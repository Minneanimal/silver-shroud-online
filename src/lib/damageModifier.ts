export function calculateDamageModifier(str: number, siz: number): string {
	const total = str + siz;

	if (total <= 5) return "-1d8";
	if (total <= 10) return "-1d6";
	if (total <= 15) return "-1d4";
	if (total <= 20) return "-1d2";
	if (total <= 25) return "+0";
	if (total <= 30) return "+1d2";
	if (total <= 35) return "+1d4";
	if (total <= 40) return "+1d6";
	if (total <= 45) return "+1d8";
	if (total <= 50) return "+1d10";
	if (total <= 60) return "+1d12";
	if (total <= 70) return "+2d6";
	if (total <= 80) return "+1d8+1d6";
	if (total <= 90) return "+2d8";
	if (total <= 100) return "+1d10+1d8";
	if (total <= 110) return "+2d10";
	if (total <= 120) return "+2d10+1d2";
	if (total <= 130) return "+2d10+1d4";

	// For values above 130, continue the progression
	// Each 10 points beyond 130 adds another increment
	const excessPoints = total - 130;
	const increments = Math.floor(excessPoints / 10);

	// Base progression after 130: +2d10+1d4
	// Each increment adds +1d2 more
	if (increments === 0) return "+2d10+1d4";
	if (increments === 1) return "+2d10+1d6";
	if (increments === 2) return "+2d10+1d8";
	if (increments === 3) return "+2d10+1d10";
	if (increments === 4) return "+2d10+1d12";

	// For very high values, continue adding dice
	const additionalDice = Math.floor(increments / 5);
	const remainder = increments % 5;

	let modifier = "+2d10";
	if (additionalDice > 0) {
		modifier += `+${additionalDice}d12`;
	}

	// Add remainder dice
	if (remainder === 1) modifier += "+1d4";
	else if (remainder === 2) modifier += "+1d6";
	else if (remainder === 3) modifier += "+1d8";
	else if (remainder === 4) modifier += "+1d10";
	else if (remainder === 0 && additionalDice === 0) modifier += "+1d4";

	return modifier;
}

export function getDamageModifierInfo(str: number, siz: number) {
	const total = str + siz;
	const modifier = calculateDamageModifier(str, siz);

	return {
		modifier,
		total,
		explanation: `STR (${str}) + SIZ (${siz}) = ${total}`,
	};
}
