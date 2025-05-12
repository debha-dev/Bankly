import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Bankly API",
      version: "1.0.0",
      description: "API for user authentication and banking features",
    },
    servers: [
      {
        url: "http://localhost:5055", 
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        Account: {
          type: "object",
          properties: {
            id: {
              type: "string",
              example: "23498723-b1f2-4f38-8b90-d30a7cc9ef10"
            },
            userId: {
              type: "string",
              example: "a63f84db-3d6e-4ddf-a0b7-1a62ffbcaa95"
            },
            accountNumber: {
              type: "string",
              example: "BANK-1039482837"
            },
            accountType: {
              type: "string",
              enum: ["savings", "current"]
            },
            balance: {
              type: "number",
              example: 0.00
            },
            createdAt: {
              type: "string",
              format: "date-time"
            },
            updatedAt: {
              type: "string",
              format: "date-time"
            }
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.ts", "./src/controllers/*.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = (app: Express) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
