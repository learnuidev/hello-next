import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/ui/icons.v2";
import { motion } from "framer-motion";

interface StepTitleProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export function StepTitle({ value, onChange, error }: StepTitleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="space-y-2">
        <Label htmlFor="title" className="text-base">
          Series Title
          <span className="text-red-500 ml-1">*</span>
        </Label>
        <Input
          id="title"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="e.g., Chinese Culture Explorations"
          className="text-lg h-12"
          autoFocus
        />
        {error && (
          <p className="text-sm text-red-500 flex items-center gap-1">
            <Icons.xMark className="h-4 w-4" />
            {error}
          </p>
        )}
      </div>

      <div className="bg-muted/50 rounded-lg p-6 border border-muted">
        <h3 className="font-semibold mb-3">Tips for a great title</h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
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
    </motion.div>
  );
}
