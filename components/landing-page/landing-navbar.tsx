import Link from "next/link";
import { Icons } from "../ui/icons.v2";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const LandingNavBarItem = ({ href, text }: { href: string; text: string }) => {
  const routeName = usePathname();

  return (
    <Link
      href={href}
      className={cn(
        `flex items-center text-sm space-x-2 transition hover:text-rose-400`,
        routeName === href ? "text-rose-400" : "text-gray-500"
      )}
    >
      <p>{text}</p>
    </Link>
  );
};

export const LandingNavbar = () => {
  const routeName = usePathname();
  return (
    <nav className="flex justify-between items-center w-full px-4 md:px-12 my-2 md:my-6">
      <div className="flex space-x-2 md:space-x-8 items-center">
        <Link href="/">
          <Icons.mandarin className="text-xl hover:text-rose-400 transition" />
        </Link>
      </div>
      <div className="hidden md:block">
        <div className="space-x-8 flex">
          <LandingNavBarItem text={"Why?"} href={"/why"} />

          <Link
            href={"/learn"}
            className={cn(
              `flex items-center text-sm space-x-2 transition hover:text-rose-400`,
              routeName === "/learn" ? "text-rose-400" : "text-gray-500"
            )}
          >
            <Icons.glassesRound />
            <p>Learn</p>
          </Link>
          <Link
            href={"/nmm"}
            className={cn(
              `flex items-center text-sm space-x-2 transition hover:text-rose-400`,
              routeName === "/nmm" ? "text-rose-400" : "text-gray-500"
            )}
          >
            <Icons.planet />
            <p>Playground</p>
          </Link>
        </div>
      </div>
      <div className="hidden md:block">
        <Link
          href="/login"
          className="flex items-center text-sm space-x-2 hover:text-rose-400 transition"
        >
          <Icons.fingerPrint className="" />
          <p>Login</p>
        </Link>
      </div>

      <div className="block md:hidden">
        <button className="text-2xl">
          <Icons.bars />
        </button>
      </div>
    </nav>
  );
};
