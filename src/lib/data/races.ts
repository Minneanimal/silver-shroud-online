import pool from "../db";

export const getRaces = async () => {
	const res = await pool.query("SELECT * FROM races");
	return res.rows;
};
