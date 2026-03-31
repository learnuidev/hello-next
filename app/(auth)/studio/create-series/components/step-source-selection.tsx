import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
import { motion } from "framer-motion";

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
    if (!newSourceName) {
      toast.error("请输入用户名");
      return;
    }

    addSourceMutation.mutate(
      {
        userName: newSourceName,
        title: newSourceTitle || newSourceName,
        status: "unclaimed",
      },
      {
        onSuccess: () => {
          toast.success("来源创建成功");
          setIsCreateDialogOpen(false);
          setNewSourceName("");
          setNewSourceTitle("");
          refetch();
        },
        onError: () => {
          toast.error("创建来源失败");
        },
      }
    );
  };

  const sources = sourcesData?.items || [];

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label className="text-gray-700 font-medium dark:text-gray-300">
          来源
          <span className="text-rose-500 ml-1">*</span>
        </Label>
        <div className="space-y-3">
          {sources.length === 0 ? (
            <div className="text-center p-8 border-2 border-dashed border-gray-300 rounded-lg dark:border-gray-800">
              <Icons.userSolid className="h-12 w-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600 dark:text-gray-400 mb-4">暂无来源</p>
              <Dialog
                open={isCreateDialogOpen}
                onOpenChange={setIsCreateDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <Icons.plusIcon className="h-4 w-4" />
                    创建新来源
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
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[400px] overflow-y-auto">
                {sources.map((source) => {
                  const isSelected = sourceId === source.id;
                  return (
                    <motion.button
                      key={source.id}
                      onClick={() => {
                        if (isSelected) {
                          onSourceChange("", "");
                        } else {
                          onSourceChange(source.id, source.title);
                        }
                      }}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className={cn(
                        "flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all text-left",
                        isSelected
                          ? "border-rose-500 bg-rose-50 dark:bg-rose-950/20 dark:border-rose-500"
                          : "border-gray-200 hover:border-rose-500 hover:bg-rose-50/50 dark:border-gray-800 dark:hover:border-rose-500 dark:hover:bg-rose-950/10"
                      )}
                    >
                      <div className="h-12 w-12 rounded-full bg-rose-100 flex items-center justify-center flex-shrink-0 dark:bg-rose-950/30">
                        <Icons.userSolid className="h-6 w-6 text-rose-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 dark:text-gray-100 truncate">
                          {source.title}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          @{source.userName}
                        </p>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
              <div className="text-center pt-4">
                <Dialog
                  open={isCreateDialogOpen}
                  onOpenChange={setIsCreateDialogOpen}
                >
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="gap-2 dark:border-gray-800 dark:hover:bg-gray-800"
                    >
                      <Icons.plusIcon className="h-4 w-4" />
                      创建新来源
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>创建新来源</DialogTitle>
                      <DialogDescription>
                        为您的系列创建新来源
                      </DialogDescription>
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
            </>
          )}
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
            来源指南
          </h3>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <li className="flex items-start gap-2">
              <Icons.lightBulbSolid className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
              <span>选择与此系列内容相关的来源</span>
            </li>
            <li className="flex items-start gap-2">
              <Icons.lightBulbSolid className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
              <span>您可以随时创建新来源</span>
            </li>
            <li className="flex items-start gap-2">
              <Icons.lightBulbSolid className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
              <span>选择后您仍可以编辑来源</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
