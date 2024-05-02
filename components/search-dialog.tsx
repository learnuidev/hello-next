import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Icons } from "./ui/icons.v2";
import { SearchInput } from "./search-input";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";

export function SearchDialogDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Icons.magnifyingGlass />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-12/12 top-64 border-none">
        <DialogHeader>
          {/* <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription> */}
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <SearchInput />
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
