import { Menu } from "lucide-react";
import Link from "next/link";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";

const ItemsMenuMobile = () => {
  return (
    <Popover>
      <PopoverTrigger>
        <Menu />
      </PopoverTrigger>
      <PopoverContent>
        <Link href="/categories/1" className="block">
          Item1
        </Link>
        <Link href="/categories/2" className="block">
          Item2
        </Link>
        <Link href="/categories/3" className="block">
          Item3
        </Link>
      </PopoverContent>
    </Popover>
  );
};

export default ItemsMenuMobile;
