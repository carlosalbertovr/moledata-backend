import express, { Application, Request, Response } from "express";

const app: Application = express();

app.get("/", (_req: Request, res: Response) => {
	res.json({ msg: "Welcome to Mole Data API😎" });
});

module.exports = app;
