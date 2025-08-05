import express, { Request, Response } from "express";
import cors from "cors";

export default interface HttpServer {
  register(method: string, url: string, callback: Function): void;
  listen(port: number, host: string): void;
}

export class ExpressAdapter implements HttpServer {
  app: any;

  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.app.use(cors());
  }

  register(method: string, url: string, callback: Function): void {
    this.app[method](url, async function (req: Request, res: Response) {
      try {
        const output = await callback(req.params, req.body);
        res.json(output);
      } catch (e: any) {
        res.status(422).json({ message: e.message });
      }
    });
  }

  listen(port: number, host: string): void {
    this.app.listen(port, host);
    console.log(`Servidor rodando na porta ${port}`);
  }
}
