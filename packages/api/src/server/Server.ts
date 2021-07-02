import express, { Application } from "express";
import dotenv from "dotenv";

export class Server {
  public app: Application;

  public constructor() {
    this.app = express();
    this.registerMiddlewares();
    this.registerRoutes();

    dotenv.config();
  }

  public start() {
    this.app.listen(process.env.TRIPFORCE_API_PORT, () => {
      console.log(`Server started on port ${process.env.TRIPFORCE_API_PORT}`);
    });
  }

  private registerMiddlewares() {
    this.app.use(express.json());
    this.app.use(async (req, res, next) => {
      console.log(`[${req.method} - ${req.path}]`);

      next();
    });
  }

  private registerRoutes() {
    this.app.get("/", (req, res) => {
      res.json({ success: true, message: "Tripforce API" });
    });
  }
}
