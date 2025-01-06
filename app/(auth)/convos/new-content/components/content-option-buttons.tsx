import { contentTypeStore } from "../new-content-store";

interface LinkType {
  id: string;
  title: string;
  Icon: any;
  disabled?: boolean;
}

export function ContentOptionsButton({ linkType }: { linkType: LinkType }) {
  const setType = contentTypeStore((state) => state.setType);
  return (
    <button
      disabled={!!linkType?.disabled}
      key={JSON.stringify(linkType)}
      onClick={() => {
        setType(linkType.id);
      }}
      className="space-x-2 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-900 transition bg-gray-100 shadow-sm shadow-[2px] px-4 rounded-2xl py-[4px] text-sm"
    >
      <linkType.Icon />
      <span>{linkType.title}</span>
    </button>
  );
}
