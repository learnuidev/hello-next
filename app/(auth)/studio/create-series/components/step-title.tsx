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
        <Label htmlFor="title" className="text-gray-700 font-medium">
          Series Title
          <span className="text-rose-500 ml-1">*</span>
        </Label>
        <Input
          id="title"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="e.g., Chinese Culture Explorations"
          className="text-base h-12 border-gray-200 focus:border-rose-500 focus:ring-rose-500"
          autoFocus
        />
        {error && (
          <p className="text-sm text-rose-500 flex items-center gap-1">
            <Icons.xMark className="h-4 w-4" />
            {error}
          </p>
        )}
      </div>

      <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
        <h3 className="font-semibold mb-3 text-gray-900">Tips for a great title</h3>
        <ul className="space-y-2 text-sm text-gray-600">
          <li className="flex items-start gap-2">
            <Icons.check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
            <span>Keep it concise and memorable</span>
          </li>
          <li className="flex items-start gap-2">
            <Icons.check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
            <span>Use descriptive keywords</span>
          </li>
          <li className="flex items-start gap-2">
            <Icons.check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
            <span>Avoid special characters</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
