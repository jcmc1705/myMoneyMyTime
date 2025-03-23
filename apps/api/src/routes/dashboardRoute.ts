import { Router } from 'express';
import { TransactionRepositoryPrisma } from '../database/transactionRepositoryPrisma';
import { GetDashboardUseCase } from '../application/getDashboardUseCase';

const router = Router();
const getDashboardUseCase = new GetDashboardUseCase(
  new TransactionRepositoryPrisma()
);

router.get('/', async (req, res) => {
  try {
    const dashboardData = await getDashboardUseCase.execute();
    res.json(dashboardData);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

export default router;
