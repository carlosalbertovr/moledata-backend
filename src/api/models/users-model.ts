import { Prisma } from "@prisma/client";

import prisma from "../../services/prisma";
import { UserCreateInput } from "../../types/users";

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

export const checkIfEmailIsUsed = async (email: string) =>
	Boolean(await prisma.user.findFirst({ where: { email: email } }));

export const createUser = async (payload: Omit<UserCreateInput, "password">) =>
	await prisma.user.create({
		data: { ...payload },
		select,
	});
