import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/ui/icons.v2";

interface StepTitleProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export function StepTitle({ value, onChange, error }: StepTitleProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label
          htmlFor="title"
          className="text-gray-700 font-medium dark:text-gray-300"
        >
          系列标题
          <span className="text-rose-500 ml-1">*</span>
        </Label>
        <Input
          id="title"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="例如：中华文化探索"
          className="text-base h-12 dark:bg-[rgb(11,12,13)] dark:border-gray-800 focus:border-rose-500 focus:ring-rose-500"
          autoFocus
        />
        {value.length > 0 && value.length < 1 && (
          <p className="text-sm text-rose-500">标题至少需要 3 个字符</p>
        )}
        {error && (
          <p className="text-sm text-rose-500 flex items-center gap-1">
            <Icons.xMark className="h-4 w-4" />
            {error}
          </p>
        )}
      </div>

      <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 dark:bg-[rgb(11,12,13)] dark:border-gray-800">
        <h3 className="font-semibold mb-3 text-gray-900 dark:text-gray-100">
          优秀标题的技巧
        </h3>
        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
          <li className="flex items-start gap-2">
            <Icons.check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
            <span>保持简洁且易于记忆</span>
          </li>
          <li className="flex items-start gap-2">
            <Icons.check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
            <span>使用描述性关键词</span>
          </li>
          <li className="flex items-start gap-2">
            <Icons.check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
            <span>避免特殊字符</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
