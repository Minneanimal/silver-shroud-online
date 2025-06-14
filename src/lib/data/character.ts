import { Race } from "@/types";
import pool from "../db";
import { rollStat } from "../dice";

export const createCharacter = async (
	name: string,
	age: number,
	race: Race,
	level: number = 1,
	user_id: string
) => {
	const stats = {
		str: rollStat(race.str, race.str_modifier),
		con: rollStat(race.con, race.con_modifier),
		siz: rollStat(race.siz, race.siz_modifier),
		dex: rollStat(race.dex, race.dex_modifier),
		int: rollStat(race.int, race.int_modifier),
		pow: rollStat(race.pow, race.pow_modifier),
		cha: rollStat(race.cha, race.cha_modifier),
	};

	const res = await pool.query(
		"INSERT INTO characters (name, race_id, level, str, con, siz, dex, int, pow, cha, movement, user_id, age) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *",
		[
			name,
			race.id,
			level,
			stats.str,
			stats.con,
			stats.siz,
			stats.dex,
			stats.int,
			stats.pow,
			stats.cha,
			race.movement,
			user_id,
			age,
		]
	);
	return res.rows[0];
};
