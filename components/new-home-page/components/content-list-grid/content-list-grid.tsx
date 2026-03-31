export function ContentListGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3  gap-8">
      {children}
    </div>
  );
}
