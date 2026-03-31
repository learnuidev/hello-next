"use client";

import { useState } from "react";
import { useListSourcesQuery } from "@/domain/content-v2/use-list-sources-query";
import { useAddSourceMutation } from "@/domain/content-v2/use-add-source-mutation";
import { useUpdateSourceMutation } from "@/domain/content-v2/use-update-source-mutation";
import { Source } from "@/domain/content-v2/source.types";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Icons } from "@/components/ui/icons.v2";
import { motion } from "framer-motion";
import { toast } from "sonner";

interface SourceFormData {
  userName: string;
  title: string;
  status: string;
}

export function SourcesManagement() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedSource, setSelectedSource] = useState<Source | null>(null);
  const [formData, setFormData] = useState<SourceFormData>({
    userName: "",
    title: "",
    status: "unclaimed",
  });

  const {
    data: sourcesData,
    isLoading,
    refetch,
  } = useListSourcesQuery({
    filter: "me",
    limit: 100,
    direction: "desc",
  });

  const addSourceMutation = useAddSourceMutation();

  const updateSourceMutation = useUpdateSourceMutation();

  const handleAddSource = async () => {
    if (!formData.userName) {
      toast.error("Please enter a username");
      return;
    }

    addSourceMutation.mutate(
      {
        userName: formData.userName,
        title: formData.title || formData.userName,
        status: formData.status,
      },
      {
        onSuccess: () => {
          toast.success("Source created successfully");
          setIsAddDialogOpen(false);
          setFormData({ userName: "", title: "", status: "unclaimed" });
          refetch();
        },
        onError: () => {
          toast.error("Failed to create source");
        },
      },
    );
  };

  const handleEditSource = async () => {
    if (!selectedSource || !formData.userName) {
      toast.error("Please enter a username");
      return;
    }

    updateSourceMutation.mutate(
      {
        id: selectedSource.id,
        userName: formData.userName,
        title: formData.title || formData.userName,
        status: formData.status,
      },
      {
        onSuccess: () => {
          toast.success("Source updated successfully");
          setIsEditDialogOpen(false);
          setSelectedSource(null);
          refetch();
        },
        onError: () => {
          toast.error("Failed to update source");
        },
      },
    );
  };

  const openEditDialog = (source: Source) => {
    setSelectedSource(source);
    setFormData({
      userName: source.userName,
      title: source.title,
      status: source.status,
    });
    setIsEditDialogOpen(true);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Icons.spinner className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const sources = sourcesData?.items || [];

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold">来源</h2>
          <p className="text-muted-foreground">创建和管理您的内容来源</p>
        </div>

        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Icons.plusIcon className="h-4 w-4" />
              添加来源
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>创建新来源</DialogTitle>
              <DialogDescription>
                创建新的内容来源（频道、作者等）
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username *</Label>
                <Input
                  id="username"
                  placeholder="e.g., @username"
                  value={formData.userName}
                  onChange={(e) =>
                    setFormData({ ...formData, userName: e.target.value })
                  }
                />
                <p className="text-xs text-muted-foreground">
                  The unique identifier for this source
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="sourcetitle">Title</Label>
                <Input
                  id="sourcetitle"
                  placeholder="e.g., Chinese Learning Channel"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />
                <p className="text-xs text-muted-foreground">
                  Display name for the source (defaults to username if empty)
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="sourcestatus">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) =>
                    setFormData({ ...formData, status: value })
                  }
                >
                  <SelectTrigger id="sourcestatus">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="unclaimed">Unclaimed</SelectItem>
                    <SelectItem value="claimed">Claimed</SelectItem>
                    <SelectItem value="verified">Verified</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsAddDialogOpen(false)}
              >
                取消
              </Button>
              <Button
                onClick={handleAddSource}
                disabled={addSourceMutation.isPending}
              >
                {addSourceMutation.isPending ? "创建中..." : "创建来源"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {sources.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 text-center">
          <Icons.userSolid className="h-16 w-16 text-muted-foreground opacity-50" />
          <div className="mt-4">
            <h3 className="text-lg font-semibold">暂无来源</h3>
            <p className="text-muted-foreground">创建您的第一个来源以开始</p>
          </div>
          <Button
            onClick={() => setIsAddDialogOpen(true)}
            className="gap-2 mt-4"
          >
            <Icons.plusIcon className="h-4 w-4" />
            创建来源
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sources.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <CardTitle className="truncate">{item.title}</CardTitle>
                      <CardDescription className="truncate">
                        @{item.userName}
                      </CardDescription>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => openEditDialog(item)}
                    >
                      <Icons.edit className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={
                          item.status === "verified"
                            ? "default"
                            : item.status === "claimed"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {item.status}
                      </Badge>
                    </div>
                    {item.userId && (
                      <div className="text-sm text-muted-foreground">
                        <Icons.user className="h-3 w-3 inline mr-1" />
                        Owner ID: {item.userId.slice(0, 8)}...
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>编辑来源</DialogTitle>
            <DialogDescription>更新来源信息</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-username">Username *</Label>
              <Input
                id="edit-username"
                placeholder="e.g., @username"
                value={formData.userName}
                onChange={(e) =>
                  setFormData({ ...formData, userName: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-sourcetitle">Title</Label>
              <Input
                id="edit-sourcetitle"
                placeholder="e.g., Chinese Learning Channel"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-sourcestatus">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) =>
                  setFormData({ ...formData, status: value })
                }
              >
                <SelectTrigger id="edit-sourcestatus">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="unclaimed">Unclaimed</SelectItem>
                  <SelectItem value="claimed">Claimed</SelectItem>
                  <SelectItem value="verified">Verified</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
            >
              取消
            </Button>
            <Button
              onClick={handleEditSource}
              disabled={updateSourceMutation.isPending}
            >
              {updateSourceMutation.isPending ? "更新中..." : "更新来源"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
