import { toast } from "sonner";
import Analytics from "./components/global/analytics";
import { Container } from "./components/global/container";
import DataTable from "./components/global/dataTable";
import Navbar from "./components/global/navbar";
import { Toaster } from "./components/ui/sonner";
import { gotData } from "./redux/dashboard/dashboardSlice";

import { useGetInventoryQuery } from "./redux/dashboard/services/inventory";
import { useAppDispatch } from "./redux/hooks";

function App() {
  const { data, error, isLoading } = useGetInventoryQuery();

  // testing
  // const data = [
  //   {
  //     name: "Bluetooth",
  //     category: "Electronic",
  //     value: "$150",
  //     quantity: 5,
  //     price: "$30",
  //   },
  //   {
  //     name: "Edifier M43560",
  //     category: "Electronic",
  //     value: "0",
  //     quantity: 0,
  //     price: "$0",
  //   },
  //   {
  //     name: "Sony 4k ultra 55 inch TV",
  //     category: "Electronic",
  //     value: "$1190",
  //     quantity: 17,
  //     price: "$70",
  //   },
  //   {
  //     name: "Samsumg 55 inch TV",
  //     category: "Electronic",
  //     value: "$600",
  //     quantity: 50,
  //     price: "$12",
  //   },
  //   {
  //     name: "samsumg S34 Ultra",
  //     category: "phone",
  //     value: "$0",
  //     quantity: 0,
  //     price: "$0",
  //   },
  // ];
  // const isLoading = false;
  // const error = false;

  const dispatch = useAppDispatch();

  if (!!data && !isLoading) dispatch(gotData(data));
  if (error) {
    toast.error(
      `Failed to fetch api${error.status === 429 && ", Too many requests"}`
    );
    console.log(error);
  }
  return (
    <Container>
      <Navbar />
      <section className="mt-12 mb-4">
        <h2 className="text-2xl font-bold mb-4">Inventory</h2>
      </section>
      <section className="my-4">
        <Analytics isLoading={isLoading} error={error} />
      </section>
      <section className="my-8">
        <DataTable isLoading={isLoading} error={error} />
      </section>
      <Toaster position="top-center" />
    </Container>
  );
}

export default App;
