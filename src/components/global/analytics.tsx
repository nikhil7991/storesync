import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { useAppSelector } from "../../redux/hooks";

type Props = {
  isLoading: boolean;
  error: any;
};

export default function Analytics({}: Props) {
  const totalProducts = useAppSelector(
    (state) => state.dashboard.analytics.totalProducts
  );
  const storeValue = useAppSelector(
    (state) => state.dashboard.analytics.storeValue
  );
  const outOfStock = useAppSelector(
    (state) => state.dashboard.analytics.outOfStock
  );
  const categories = useAppSelector(
    (state) => state.dashboard.analytics.categories
  );
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="grid grid-cols-4 pb-2">
          <i className="ri-shopping-cart-line text-lg lg:text-3xl"></i>
          <CardTitle className="col-span-3">Total products</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-4">
          <p className="col-start-2 font-black text-2xl">{totalProducts}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="grid grid-cols-4 pb-2">
          <i className="ri-exchange-dollar-line text-lg lg:text-3xl"></i>
          <CardTitle className="col-span-3">Total store value</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-4">
          <p className="col-start-2 font-black text-2xl">{`$${storeValue}`}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="grid grid-cols-4 pb-2">
          <i className="ri-prohibited-line text-lg lg:text-3xl"></i>
          <CardTitle className="col-span-3">Out of stock</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-4">
          <p className="col-start-2 font-black text-2xl">{outOfStock}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="grid grid-cols-4 pb-2">
          <i className="ri-checkbox-multiple-blank-fill text-lg lg:text-3xl"></i>
          <CardTitle className="col-span-3">No of categories</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-4">
          <p className="col-start-2 font-black text-2xl">{categories}</p>
        </CardContent>
      </Card>
    </div>
  );
}
