import { ExpressAdapter } from "./infra/http/httpServer";
import { PrismaTransactionRepository } from "./infra/repository/PrismaTransactionRepository";
import DashboardController from "./infra/controller/Dashboard";
import GetDashboardUsecase from "./application/usercase/GetDashboardUsecase";
import TransactionsController from "./infra/controller/TransactionsController";
import CreateTransactionUsecase from "./application/usercase/CreateTransactionUsecase";
import GetAllTransactionsUsecase from "./application/usercase/GetAllTransactionsUsecase";
import GetTransactionUsecase from "./application/usercase/GetTransactionUsecase";
import UpdateTransactionUsecase from "./application/usercase/UpdateTransactionUsecase";
import DeleteTransactionUsecase from "./application/usercase/DeleteTransactionUsecase";

const httpServer = new ExpressAdapter();
const transactionRepository = new PrismaTransactionRepository();
new DashboardController(
  httpServer,
  new GetDashboardUsecase(transactionRepository),
);
new TransactionsController(
  httpServer,
  new CreateTransactionUsecase(transactionRepository),
  new GetAllTransactionsUsecase(transactionRepository),
  new GetTransactionUsecase(transactionRepository),
  new UpdateTransactionUsecase(transactionRepository),
  new DeleteTransactionUsecase(transactionRepository),
);
httpServer.listen(Number(process.env.PORT) || 3000, "localhost");