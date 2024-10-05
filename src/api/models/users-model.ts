import { Prisma } from "@prisma/client";

import prisma from "../../services/prisma";

const select: Prisma.UserSelect = {
	id: true,
	email: true,
	fullname: true,
	country: true,
};

export const getUserById = async (userId: string) =>
	await prisma.user.findFirst({
		where: {
			id: userId,
		},
		select,
	});

export const checkIfUserExist = async (userId: string) =>
	Boolean(await prisma.user.findFirst({ where: { id: userId } }));
