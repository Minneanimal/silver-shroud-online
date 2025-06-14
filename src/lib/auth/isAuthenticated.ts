"use server";

import { auth } from "./auth";

export const checkIsAuthenticated = async () => {
	const session = await auth();
	if (session) {
		return true;
	}
	return false;
};

export const getUser = async () => {
	const session = await auth();
	if (session) {
		return session.user;
	}
	return null;
};
