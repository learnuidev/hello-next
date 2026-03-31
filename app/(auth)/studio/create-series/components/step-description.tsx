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
        <Label htmlFor="description" className="text-gray-700 font-medium">
          Description
          <span className="text-rose-500 ml-1">*</span>
        </Label>
        <textarea
          id="description"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Provide an overview of what this series covers, the target audience, and what learners can expect..."
          className="flex min-h-[200px] w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-base focus:border-rose-500 focus:ring-rose-500 placeholder:text-gray-400 resize-none"
          autoFocus
        />
        <div className="flex justify-between text-sm text-gray-600">
          <span>Describe the series content and goals</span>
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

      <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
        <h3 className="font-semibold mb-3 text-gray-900">What to include</h3>
        <ul className="space-y-2 text-sm text-gray-600">
          <li className="flex items-start gap-2">
            <Icons.check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
            <span>Main themes and topics covered</span>
          </li>
          <li className="flex items-start gap-2">
            <Icons.check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
            <span>Target proficiency level</span>
          </li>
          <li className="flex items-start gap-2">
            <Icons.check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
            <span>Learning objectives</span>
          </li>
          <li className="flex items-start gap-2">
            <Icons.check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
            <span>Content frequency and structure</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
