import { TransactionsUseCase } from "./application/usercase/transactionsUserCase";
import { GetDashboardUseCase } from "./application/usercase/getDashboardUserCase";
import { PrismaTransactionRepository } from "./infra/repository/PrismaTransactionRepository";
import { ExpressAdapter } from "./infra/http/httpServer";
import TransactionsController from "./infra/controller/TransactionsController";
import DashboardController from "./infra/controller/Dashboard";

const httpServer = new ExpressAdapter();
const transactionRepository = new PrismaTransactionRepository();
const transactionsUseCase = new TransactionsUseCase(transactionRepository);
const getDashboardUseCase = new GetDashboardUseCase(transactionRepository);
new TransactionsController(httpServer, transactionsUseCase);
new DashboardController(httpServer, getDashboardUseCase);
httpServer.listen(3000);
