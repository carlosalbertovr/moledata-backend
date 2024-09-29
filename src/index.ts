import express, { Application, Request, Response } from "express";

const app: Application = express();

app.get("/", (_req: Request, res: Response) => {
	res.json({ msg: "Express on Vercel" });
});

module.exports = app;
