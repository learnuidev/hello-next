import { Icons } from "@/components/ui/icons.v2";
import Link from "next/link";

export default function ContentDetails() {
  return (
    <div className="m-8 flex justify-between items-center">
      <Link href="/contents">
        <Icons.back />
      </Link>
      <h1>Content Details</h1>
    </div>
  );
}
