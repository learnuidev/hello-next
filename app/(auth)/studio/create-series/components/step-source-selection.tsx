import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Icons } from "@/components/ui/icons.v2";
import { useListSourcesQuery } from "@/domain/content-v2/use-list-sources-query";
import { useAddSourceMutation } from "@/domain/content-v2/use-add-source-mutation";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface StepSourceSelectionProps {
  sourceId: string;
  sourceName: string;
  onSourceChange: (id: string, name: string) => void;
  error?: string;
}

export function StepSourceSelection({
  sourceId,
  sourceName,
  onSourceChange,
  error,
}: StepSourceSelectionProps) {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newSourceName, setNewSourceName] = useState("");
  const [newSourceTitle, setNewSourceTitle] = useState("");

  const { data: sourcesData, refetch } = useListSourcesQuery({
    filter: "me",
    limit: 100,
  });

  const addSourceMutation = useAddSourceMutation();

  const handleCreateSource = () => {
    if (!newSourceName.trim()) {
      toast.error("Please enter a source username");
      return;
    }

    addSourceMutation.mutate(
      {
        userName: newSourceName,
        title: newSourceTitle || newSourceName,
      },
      {
        onSuccess: (data) => {
          toast.success("Source created successfully");
          onSourceChange(data.id, data.title);
          setIsCreateDialogOpen(false);
          setNewSourceName("");
          setNewSourceTitle("");
          refetch();
        },
      },
    );
  };

  const sources = sourcesData?.items || [];

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label
          htmlFor="source"
          className="text-gray-700 font-medium dark:text-gray-300"
        >
          来源
          <span className="text-rose-500 ml-1">*</span>
        </Label>
        <div className="flex gap-2">
          <Select
            value={sourceId}
            onValueChange={(id) => {
              const source = sources.find((s) => s.id === id);
              onSourceChange(id, source?.title || "");
            }}
          >
            <SelectTrigger
              id="source"
              className="h-12 text-base flex-1 border-gray-200 focus:border-rose-500 focus:ring-rose-500 dark:bg-[rgb(11,12,13)] dark:border-gray-800"
            >
              <SelectValue placeholder="选择来源" />
            </SelectTrigger>
            <SelectContent>
              {sources.map((source) => (
                <SelectItem key={source.id} value={source.id} className="py-3">
                  <div className="flex flex-col">
                    <span className="font-medium">{source.title}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      @{source.userName}
                    </span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Dialog
            open={isCreateDialogOpen}
            onOpenChange={setIsCreateDialogOpen}
          >
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="gap-2 border-gray-200 hover:border-rose-500 hover:text-rose-500 hover:bg-rose-50 dark:border-gray-800 dark:hover:text-rose-500 dark:hover:bg-rose-950/20"
              >
                <Icons.plusIcon className="h-4 w-4" />
                新建
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>创建新来源</DialogTitle>
                <DialogDescription>为您的系列创建新来源</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="username">用户名 *</Label>
                  <Input
                    id="username"
                    placeholder="例如：@username"
                    value={newSourceName}
                    onChange={(e) => setNewSourceName(e.target.value)}
                    className="dark:bg-[rgb(11,12,13)] dark:border-gray-800"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="title">标题</Label>
                  <Input
                    id="title"
                    placeholder="例如：中文学习频道"
                    value={newSourceTitle}
                    onChange={(e) => setNewSourceTitle(e.target.value)}
                    className="dark:bg-[rgb(11,12,13)] dark:border-gray-800"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsCreateDialogOpen(false)}
                  className="border-gray-200 hover:bg-gray-100 dark:border-gray-800 dark:hover:bg-gray-800"
                >
                  取消
                </Button>
                <Button
                  onClick={handleCreateSource}
                  disabled={addSourceMutation.isPending}
                  className="bg-rose-500 hover:bg-rose-600"
                >
                  {addSourceMutation.isPending ? "创建中..." : "创建来源"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        {error && (
          <p className="text-sm text-rose-500 flex items-center gap-1">
            <Icons.xMark className="h-4 w-4" />
            {error}
          </p>
        )}
      </div>

      {sources.length > 0 && (
        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 dark:bg-[rgb(11,12,13)] dark:border-gray-800">
          <h3 className="font-semibold mb-3 text-gray-900 dark:text-gray-100">
            您的来源
          </h3>
          <div className="grid gap-2">
            {sources.slice(0, 5).map((source) => (
              <div
                key={source.id}
                onClick={() => onSourceChange(source.id, source.title)}
                className={cn(
                  `flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all`,
                  sourceId === source.id
                    ? "bg-rose-50 border-rose-500 text-rose-900 dark:bg-rose-950/20 dark:text-rose-100"
                    : "hover:bg-gray-100 border-gray-200 dark:hover:bg-gray-800 dark:border-gray-800 dark:text-gray-300",
                )}
              >
                <div className="flex flex-col">
                  <span className="font-medium">{source.title}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    @{source.userName}
                  </span>
                </div>
                {sourceId === source.id && (
                  <Icons.check className="h-5 w-5 text-rose-500" />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
