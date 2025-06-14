export interface Race {
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

export interface NewCharacter {
	name: string;
	race_id: number;
	age: number;
	level: number;
	user_id: string;
}

export interface Character extends NewCharacter {
	id: number;
	str: number;
	con: number;
	siz: number;
	dex: number;
	int: number;
	pow: number;
	cha: number;
	movement: number;
	created_at: string;
	updated_at: string;
}
