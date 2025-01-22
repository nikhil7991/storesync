import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Button } from "../ui/button";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { changeUser } from "../../redux/dashboard/dashboardSlice";
import { toast } from "sonner";

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  > {}

export default function Navbar({}: Props) {
  const user = useAppSelector((state) => state.dashboard.user);
  const dispatch = useAppDispatch();

  return (
    <nav className="grid grid-cols-2 gap-4 py-4">
      <div>
        <h1 className="font-black text-2xl">StoreSync</h1>
      </div>
      <div className="flex items-center justify-end">
        <Select
          defaultValue={user || "admin"}
          value={user}
          onValueChange={(value: "admin" | "user") => {
            dispatch(changeUser(value));
            toast.success(`Switched to ${value}`);
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Select User</SelectLabel>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="user">User</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button className="ri-logout-box-r-line mx-4" variant="ghost"></Button>
      </div>
    </nav>
  );
}
