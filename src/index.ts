import dotenv from "dotenv";
import express, { Application, Request, Response } from "express";
import swaggerUi from "swagger-ui-express";

import { apiConfig } from "./config";
import { errorHandler } from "./errors";
import { RegisterRoutes } from "../tsoa/routes";
import openapi from "../tsoa/swagger.json";

dotenv.config();

const app: Application = express();

const port = apiConfig.port;

app.get("/openapi", (_req, res) => {
	res.send(openapi);
});
app.use(
	"/docs",
	swaggerUi.serve,
	swaggerUi.setup(openapi, {
		customCss: `
			@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap');
			body {
				font-family: 'Inter', sans-serif; /* Apply Inter font to the entire body */
				background-color: #FAFAFA; /* Change background color */
			}
			.swagger-ui .topbar { display: none; }
			.swagger-ui .info .title { color: #030303; } /* Change API title color */
			.swagger-ui .info { margin-bottom: 50px; } /* Add margin below the API info section */
		`,
		customSiteTitle: "Moledata API",
		swaggerOptions: {
			defaultModelsExpandDepth: -1,
		},
	}),
);

// Register tsoa controllers
RegisterRoutes(app);

// Healthcheck
app.get("/", (_req: Request, res: Response) => {
	console.log(`Checked at ${new Date()}`)
	res.json({ msg: "Welcome to Mole Data API 😎" });
});

// Error handler
app.use(errorHandler);

app.listen(port, () => {
	console.log(`🚀 [Environment: ${apiConfig.envName}] Server running on port ${port} @ ${new Date().toISOString()} 🚀`);
});

module.exports = app;
