import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-7xl mx-auto">
      <header className="p-4">
        <h1 className="font-light text-2xl">
          <Link href="/interview">Grid Bank</Link>
        </h1>
      </header>

      {children}
    </div>
  );
}
