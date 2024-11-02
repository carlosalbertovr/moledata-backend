import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express, { Application, Request, Response, json, urlencoded } from "express";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";

import { apiConfig } from "./config";
import { errorHandler } from "./errors";
import { RegisterRoutes } from "../tsoa/routes";
import openapi from "../tsoa/swagger.json";
import { removeBearerMiddleware } from "./middlewares/removeBearerMiddleware";

dotenv.config();

/**
 * Express application instance.
 */
export const app: Application = express();

const port = apiConfig.port;

app.disable("x-powered-by");
app.use(helmet());

// Enable CORS for specified origins
app.use(
	cors({
		origin: [
			/^https?:\/\/localhost:[\d]*/,
			/^https:\/\/api(.dev)?\.moledata\.net/,
		],
	})
);

app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));
// Use body parser to read sent json payloads
app.use(
	urlencoded({
		extended: true,
	})
);
app.use(json());

// Custom middlewares
app.use(removeBearerMiddleware);

/**
 * Endpoint to retrieve the OpenAPI specification.
 * @param _req - The request object.
 * @param res - The response object.
 */
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
	})
);

// Register tsoa controllers
RegisterRoutes(app);

/**
 * Healthcheck endpoint.
 * @param _req - The request object.
 * @param res - The response object.
 */
app.get("/", (_req: Request, res: Response) => {
	console.log(`Checked at ${new Date()}`);
	res.json({ msg: "Welcome to Mole Data API 😎" });
});

// Error handler
app.use(errorHandler);

app.listen(port, () => {
	console.log(
		`🚀 [Environment: ${apiConfig.envName}] Server running on port ${port} @ ${new Date().toISOString()} 🚀`
	);
});

