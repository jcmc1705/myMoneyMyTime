import { useEffect, useState } from "react";
import { getDashboardUsecase } from "../../application/dashboard/getDashboard";
import { Dashboad } from "../../domain/dashboard";
import Cards from "../../ui/components/Cards";
import Loading from "../../ui/components/Loading";

const Home = () => {
  const [data, setData] = useState<Dashboad>({
    incomes: 0,
    expenses: 0,
    balance: 0,
  });
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    getDashboardUsecase(setLoading, setData);
  }, []);

  if (loading) return <Loading />;
  return <Cards {...data} />;
};

export default Home;
