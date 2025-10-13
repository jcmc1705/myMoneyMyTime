import express, { Request, Response } from "express";
import cors from "cors";

export default interface HttpServer {
  register<TResponse, TInput>(
    method: "post" | "get" | "put" | "delete" | "patch",
    url: string,
    callback: (arg: TInput) => Promise<TResponse>,
  ): void;
  listen(port: number, host: string): void;
}

export class ExpressAdapter implements HttpServer {
  app: express.Express;

  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.app.use(cors());
  }

  register<TResponse, TInput>(
    method: "post" | "get" | "put" | "delete" | "patch",
    url: string,
    callback: (arg: TInput) => Promise<TResponse>,
  ): void {
    this.app[method](url, async (req: Request, res: Response) => {
      try {
        const input = {
          params: req.params,
          query: req.query,
          body: req.body,
        } as unknown as TInput;

        const output = await callback(input);
        res.json(output);
      } catch (e: any) {
        res.status(422).json({ message: e.message });
      }
    });
  }

  listen(port: number, host: string): void {
    this.app.listen(port, host, () => {
      console.log(`Servidor rodando em http://${host}:${port}`);
    });
  }
}
