import {
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  Tooltip,
} from "@radix-ui/react-tooltip";
import { Icons } from "@/components/ui/icons.v2";
import { cn } from "@/lib/utils";

export function PermissionItem({
  title,
  description,
  scopesList,
  onSelectedScope,
  endpointsList,
  selectedScopes,
}: {
  title: string;
  description: string;
  scopesList: { id: string; title: string }[];
  onSelectedScope: (id: string) => void;
  endpointsList: string[];
  selectedScopes: string[];
}) {
  return (
    <div>
      <div className="flex justify-between items-start">
        <div className="flex space-x-2 items-center mb-2">
          <h4 className="text-sm font-semibold">{title}</h4>
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger>
                <Icons.infoCircle className="text-sm" />
              </TooltipTrigger>
              <TooltipContent className="rounded bg-gray-200 text-gray-800 p-2 text-[12px]">
                <p>{description}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="space-x-4">
          {scopesList?.map((scope) => {
            return (
              <button
                key={scope.id}
                onClick={() => {
                  onSelectedScope(scope.id);
                }}
                className={cn(
                  "font-light text-gray-500 text-[14px] rounded px-2",
                  selectedScopes?.includes(scope?.id)
                    ? "bg-rose-500 text-white"
                    : ""
                )}
              >
                {scope?.title}
              </button>
            );
          })}
        </div>
      </div>

      <div className="text-gray-400 text-[12px]">
        {endpointsList.map((endpoint) => {
          return (
            <p key={endpoint} className="font-mono">
              {endpoint}
            </p>
          );
        })}
      </div>
      <hr className="w-full border-t border-gray-800 my-6" />
    </div>
  );
}
