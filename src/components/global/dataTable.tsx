import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";

import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  deleteProduct,
  disableProduct,
  editProduct,
  enableProduct,
} from "../../redux/dashboard/dashboardSlice";
import { cn } from "../../lib/utils";
import {
  inventoryData,
  STATUS,
} from "../../redux/dashboard/services/inventory";
import { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

type Props = {
  isLoading: boolean;
  error: any;
};

export default function DataTable({ isLoading = false, error }: Props) {
  const data = useAppSelector((state) => state.dashboard.data);
  const user = useAppSelector((state) => state.dashboard.user);
  const dispatch = useAppDispatch();
  const [editOpen, setEditOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentProduct, setCurrentProduct] = useState<inventoryData>({
    name: "",
    price: "",
    category: "",
    quantity: 0,
    value: "",
    status: STATUS.disabled,
  });

  return (
    <div>
      <Table>
        <TableCaption>
          {!data?.length || error || isLoading
            ? "No Data"
            : "A list of products."}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="">Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Value</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        {!!data && !isLoading && (
          <TableBody>
            {data.map((product, index) => (
              <TableRow
                key={`data-${index}`}
                className={cn(
                  product.status === STATUS.disabled && "text-gray-400"
                )}
                aria-disabled={product.status === STATUS.disabled}
              >
                <TableCell className="font-bold">{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{`$${product.price}`}</TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell>{`$${product.value}`}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    className="ri-pencil-line text-foreground"
                    disabled={
                      user === "user" || product.status === STATUS.disabled
                    }
                    onClick={() => {
                      setCurrentIndex(index);
                      setCurrentProduct(product);
                      setEditOpen(true);
                    }}
                  ></Button>
                  {product.status === STATUS.disabled ? (
                    <Button
                      variant="ghost"
                      className="ri-eye-off-line text-purple-600"
                      disabled={user === "user"}
                      onClick={() => dispatch(enableProduct(index))}
                    ></Button>
                  ) : (
                    <Button
                      variant="ghost"
                      className="ri-eye-line text-purple-600"
                      disabled={user === "user"}
                      onClick={() => dispatch(disableProduct(index))}
                    ></Button>
                  )}
                  <Button
                    variant="destructive"
                    className="ri-delete-bin-line"
                    disabled={user === "user"}
                    onClick={() => dispatch(deleteProduct(index))}
                  ></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
        {isLoading && (
          <TableBody>
            <TableRow>
              <TableCell>
                <Skeleton className="w-full h-8 rounded-md bg-gray-300" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-full h-8 rounded-md bg-gray-300" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-full h-8 rounded-md bg-gray-300" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-full h-8 rounded-md bg-gray-300" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-full h-8 rounded-md bg-gray-300" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-full h-8 rounded-md bg-gray-300" />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Skeleton className="w-full h-8 rounded-md bg-gray-300" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-full h-8 rounded-md bg-gray-300" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-full h-8 rounded-md bg-gray-300" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-full h-8 rounded-md bg-gray-300" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-full h-8 rounded-md bg-gray-300" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-full h-8 rounded-md bg-gray-300" />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Skeleton className="w-full h-8 rounded-md bg-gray-300" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-full h-8 rounded-md bg-gray-300" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-full h-8 rounded-md bg-gray-300" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-full h-8 rounded-md bg-gray-300" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-full h-8 rounded-md bg-gray-300" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-full h-8 rounded-md bg-gray-300" />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Skeleton className="w-full h-8 rounded-md bg-gray-300" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-full h-8 rounded-md bg-gray-300" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-full h-8 rounded-md bg-gray-300" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-full h-8 rounded-md bg-gray-300" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-full h-8 rounded-md bg-gray-300" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-full h-8 rounded-md bg-gray-300" />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Skeleton className="w-full h-8 rounded-md bg-gray-300" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-full h-8 rounded-md bg-gray-300" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-full h-8 rounded-md bg-gray-300" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-full h-8 rounded-md bg-gray-300" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-full h-8 rounded-md bg-gray-300" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-full h-8 rounded-md bg-gray-300" />
              </TableCell>
            </TableRow>
          </TableBody>
        )}
        {/* {error && <p>{error?.data}</p>} */}
      </Table>
      <Dialog open={editOpen} onOpenChange={(value) => setEditOpen(value)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogDescription>{currentProduct?.name}</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                name="category"
                placeholder="Category"
                value={currentProduct.category}
                onChange={(e) =>
                  setCurrentProduct({
                    ...currentProduct,
                    category: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                name="price"
                placeholder="price"
                value={currentProduct.price}
                onChange={(e) =>
                  setCurrentProduct({
                    ...currentProduct,
                    price: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                name="quantity"
                placeholder="quantity"
                value={currentProduct.quantity}
                onChange={(e) =>
                  setCurrentProduct({
                    ...currentProduct,
                    quantity: parseInt(e.target.value) || 0,
                  })
                }
              />
            </div>
            <div>
              <Label htmlFor="value">value</Label>
              <Input
                id="value"
                name="value"
                placeholder="value"
                value={currentProduct.value}
                onChange={(e) =>
                  setCurrentProduct({
                    ...currentProduct,
                    value: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <DialogFooter className="mt-4">
            <Button
              variant="destructive"
              onClick={() => setEditOpen(false)}
              className="m-2"
            >
              Cancel{" "}
            </Button>
            <Button
              type="submit"
              className="bg-green-600 hover:bg-green-500 m-2"
              onClick={() => {
                dispatch(
                  editProduct({ index: currentIndex, data: currentProduct })
                );
                setEditOpen(false);
              }}
            >
              Save{" "}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
