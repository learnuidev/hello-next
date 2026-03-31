import { Label } from "@/components/ui/label";
import { Icons } from "@/components/ui/icons.v2";

interface StepDescriptionProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export function StepDescription({
  value,
  onChange,
  error,
}: StepDescriptionProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label
          htmlFor="description"
          className="text-gray-700 font-medium dark:text-gray-300"
        >
          描述
          <span className="text-rose-500 ml-1">*</span>
        </Label>
        <textarea
          id="description"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="提供本系列涵盖内容的概述、目标受众以及学习者可以期待的内容..."
          className="flex min-h-[200px] w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-base focus:border-rose-500 focus:ring-rose-500 placeholder:text-gray-400 resize-none dark:bg-[rgb(11,12,13)] dark:border-gray-800 dark:text-white dark:placeholder:text-gray-500"
          autoFocus
        />
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
          <span>描述系列内容和目标</span>
          <span className={value.length > 500 ? "text-rose-500" : ""}>
            {value.length}/500
          </span>
        </div>
        {error && (
          <p className="text-sm text-rose-500 flex items-center gap-1">
            <Icons.xMark className="h-4 w-4" />
            {error}
          </p>
        )}
      </div>

      <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 dark:bg-[rgb(11,12,13)] dark:border-gray-800">
        <h3 className="font-semibold mb-3 text-gray-900 dark:text-gray-100">
          应包含的内容
        </h3>
        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
          <li className="flex items-start gap-2">
            <Icons.check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
            <span>涵盖的主要主题和话题</span>
          </li>
          <li className="flex items-start gap-2">
            <Icons.check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
            <span>目标熟练程度水平</span>
          </li>
          <li className="flex items-start gap-2">
            <Icons.check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
            <span>学习目标</span>
          </li>
          <li className="flex items-start gap-2">
            <Icons.check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
            <span>内容频率和结构</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
