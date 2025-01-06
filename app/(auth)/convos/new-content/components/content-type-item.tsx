export function ContentTypeItem({
  title,
  Icon,
  children,
}: {
  title: string;
  Icon: any;
  children?: React.ReactNode;
}) {
  return (
    <div className="p-4 flex-1 border-dotted dark:border-gray-700 border-2 rounded-2xl">
      <h4 className="space-x-2">
        <Icon />
        <span className="text-sm">{title}</span>
      </h4>

      {children}
    </div>
  );
}
