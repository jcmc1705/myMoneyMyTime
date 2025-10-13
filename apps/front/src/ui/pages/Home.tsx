import { useEffect, useState } from "react";
import { FetchAdapter } from "../../infra/http/HttpClient";
import { DashboardGatewayHttp } from "../../infra/gateway/DashboardGateway";
import { GetDashboardUsecase } from "../../application/usecase/Dashboard/getDashboard";
import { Dashboard } from "../../domain/Dashboard";
import Cards from "../../ui/components/Cards";
import Loading from "../../ui/components/Loading";

const Home = () => {
  const httpClient = new FetchAdapter();
  const dashboardGateway = new DashboardGatewayHttp(httpClient);
  const getDashboardUsecase = new GetDashboardUsecase(dashboardGateway);
  const [data, setData] = useState<Dashboard>({
    incomes: 0,
    expenses: 0,
    balance: 0,
  });
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    async function fetchDashboard() {
      try {
        const data = await getDashboardUsecase.execute();
        setData(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchDashboard();
  }, []);

  if (loading) return <Loading />;
  return <Cards {...data} />;
};

export default Home;
