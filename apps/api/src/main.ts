import { ExpressAdapter } from "./infra/http/httpServer";
import { PrismaTransactionRepository } from "./infra/repository/PrismaTransactionRepository";
import DashboardController from "./infra/controller/Dashboard";
import GetDashboardUsecase from "./application/usecase/GetDashboardUsecase";
import TransactionsController from "./infra/controller/TransactionsController";
import GetAllTransactionsUsecase from "./application/usecase/GetAllTransactionsUsecase";
import GetTransactionUsecase from "./application/usecase/GetTransactionUsecase";
import CreateTransactionUsecase from "./application/usecase/CreateTransactionUsecase";
import UpdateTransactionUsecase from "./application/usecase/UpdateTransactionUsecase";
import DeleteTransactionUsecase from "./application/usecase/DeleteTransactionUsecase";

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
