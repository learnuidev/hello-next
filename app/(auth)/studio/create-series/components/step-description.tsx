import { Label } from "@/components/ui/label";
import { Icons } from "@/components/ui/icons.v2";
import { motion } from "framer-motion";

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="space-y-2">
        <Label htmlFor="description" className="text-base">
          Description
          <span className="text-red-500 ml-1">*</span>
        </Label>
        <textarea
          id="description"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Provide an overview of what this series covers, the target audience, and what learners can expect..."
          className="flex min-h-[200px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
          autoFocus
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Describe the series content and goals</span>
          <span className={value.length > 500 ? "text-red-500" : ""}>
            {value.length}/500
          </span>
        </div>
        {error && (
          <p className="text-sm text-red-500 flex items-center gap-1">
            <Icons.xMark className="h-4 w-4" />
            {error}
          </p>
        )}
      </div>

      <div className="bg-muted/50 rounded-lg p-6 border border-muted">
        <h3 className="font-semibold mb-3">What to include</h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
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
    </motion.div>
  );
}
