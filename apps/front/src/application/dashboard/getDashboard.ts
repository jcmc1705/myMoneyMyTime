import { Dashboad } from "../../domain/dashboard";
import { getDashboard } from "../../infra/http/dashboardService";

export async function getDashboardUsecase(
  setLoading: (value: boolean) => void,
  setData: (data: Dashboad) => void,
) {
  setLoading(true);
  const data = await getDashboard();
  setData(data);
  setLoading(false);
}
