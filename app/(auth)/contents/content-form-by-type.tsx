"use client";

import { ContentV2Type } from "@/domain/content-service/content-v2.types";
import { useAddContentV2Mutation } from "@/domain/content-service/use-add-content-v2.mutation";
import { useState } from "react";

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
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Eye,
  FileText,
  Globe,
  Loader2,
  Mic,
  Play,
  Upload,
  Youtube,
} from "lucide-react";
import { useRouter } from "next/navigation";
import ReactPlayer from "react-player";

interface FormData {
  title?: string;
  url?: string;
  text?: string;
  file?: File;
}

export function ContentFormByType({
  contentType,
}: {
  contentType: ContentV2Type;
}) {
  const router = useRouter();
  const addContentV2Mutation = useAddContentV2Mutation();
  const [formData, setFormData] = useState<FormData>({});
  const [previewOpen, setPreviewOpen] = useState(false);

  const handleSubmit = async () => {
    try {
      const resp = await addContentV2Mutation.mutateAsync({
        type: contentType,
        title: formData.title,
        text: formData.text,
      });
      router.push(`/contents/${resp.pk}`);
    } catch (error) {
      console.error("Error creating content:", error);
    }
  };

  const canPreview = () => {
    switch (contentType) {
      case "youtube":
        return formData.url && ReactPlayer.canPlay(formData.url);
      case "text":
        return formData.text && formData.text.length > 0;
      case "website":
        return formData.url && formData.url.length > 0;
      case "audio":
        return formData.file !== undefined;
      default:
        return false;
    }
  };

  const getPreviewContent = () => {
    switch (contentType) {
      case "youtube":
        return (
          <div className="aspect-video w-full">
            <ReactPlayer
              url={formData.url}
              width="100%"
              height="100%"
              controls
            />
          </div>
        );

      case "text":
        return (
          <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
            {formData.title && (
              <h4 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                {formData.title}
              </h4>
            )}
            <p className="whitespace-pre-wrap text-gray-700 dark:text-gray-300 leading-relaxed">
              {formData.text}
            </p>
          </div>
        );

      case "website":
        return (
          <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
            <div className="flex items-center gap-3 mb-4">
              <Globe className="w-6 h-6 text-purple-500" />
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Website Preview
                </h4>
                <p className="text-sm text-muted-foreground break-all">
                  {formData.url}
                </p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              This URL will be processed to extract content from the webpage.
            </p>
          </div>
        );

      case "audio":
        const fileUrl = formData.file ? URL.createObjectURL(formData.file) : "";
        return (
          <div className="space-y-4">
            <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-full bg-green-500/10">
                  <Mic className="w-8 h-8 text-green-500" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {formData.title || "Untitled Audio"}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {formData.file?.name}
                  </p>
                </div>
              </div>
            </div>
            {fileUrl && (
              <div className="aspect-video w-full">
                <ReactPlayer
                  url={fileUrl}
                  width="100%"
                  height="100%"
                  controls
                  config={{
                    file: {
                      forceAudio: true,
                    },
                  }}
                />
              </div>
            )}
          </div>
        );
    }
  };

  const getFormContent = () => {
    switch (contentType) {
      case "youtube":
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-red-500/10">
                <Youtube className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Import from YouTube</h3>
                <p className="text-sm text-muted-foreground">
                  Paste a YouTube video URL to import its content
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="youtube-url">YouTube URL</Label>
              <Input
                id="youtube-url"
                type="url"
                placeholder="https://www.youtube.com/watch?v=..."
                value={formData.url || ""}
                onChange={(e) =>
                  setFormData({ ...formData, url: e.target.value })
                }
                className="h-12"
              />
              <p className="text-xs text-muted-foreground">
                Supports standard YouTube and short URLs
              </p>
            </div>
          </div>
        );

      case "text":
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-blue-500/10">
                <FileText className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Text Content</h3>
                <p className="text-sm text-muted-foreground">
                  Write or paste your content directly
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="text-title">Title (Optional)</Label>
              <Input
                id="text-title"
                type="text"
                placeholder="Give your content a title..."
                value={formData.title || ""}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="h-12"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="text-content">Content</Label>
              <textarea
                id="text-content"
                placeholder="Enter your text content here..."
                value={formData.text || ""}
                onChange={(e) =>
                  setFormData({ ...formData, text: e.target.value })
                }
                className="flex min-h-[200px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm resize-y"
              />
            </div>
          </div>
        );

      case "website":
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-purple-500/10">
                <Globe className="w-6 h-6 text-purple-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Import from Website</h3>
                <p className="text-sm text-muted-foreground">
                  Enter a website URL to extract its content
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="website-url">Website URL</Label>
              <Input
                id="website-url"
                type="url"
                placeholder="https://example.com/article"
                value={formData.url || ""}
                onChange={(e) =>
                  setFormData({ ...formData, url: e.target.value })
                }
                className="h-12"
              />
              <p className="text-xs text-muted-foreground">
                Enter the full URL of the webpage you want to import
              </p>
            </div>
          </div>
        );

      case "audio":
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-green-500/10">
                <Mic className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Audio Content</h3>
                <p className="text-sm text-muted-foreground">
                  Upload an audio file to transcribe and process
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="audio-title">Title (Optional)</Label>
              <Input
                id="audio-title"
                type="text"
                placeholder="Give your audio a title..."
                value={formData.title || ""}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="h-12"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="audio-file">Audio File</Label>
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="audio-file"
                  className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl cursor-pointer bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-10 h-10 mb-3 text-gray-400" />
                    {formData.file ? (
                      <p className="text-sm text-foreground font-medium">
                        {formData.file.name}
                      </p>
                    ) : (
                      <>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">Click to upload</span>{" "}
                          or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          MP3, WAV, OGG (MAX. 50MB)
                        </p>
                      </>
                    )}
                  </div>
                  <input
                    id="audio-file"
                    type="file"
                    className="hidden"
                    accept="audio/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setFormData({ ...formData, file });
                      }
                    }}
                  />
                </label>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <Card className="border-gray-200 dark:border-gray-800 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Create Content</CardTitle>
          <CardDescription>
            {contentType === "youtube" && "Import content from a YouTube video"}
            {contentType === "text" && "Write or paste text content"}
            {contentType === "website" && "Import content from a website"}
            {contentType === "audio" && "Upload and process audio content"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {getFormContent()}

          <div className="flex gap-3 mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
            <Button
              variant="outline"
              onClick={() => router.back()}
              className="flex-1"
              disabled={addContentV2Mutation.isPending}
            >
              Cancel
            </Button>
            <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="flex-1"
                  disabled={!canPreview() || addContentV2Mutation.isPending}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-2xl flex items-center gap-2">
                    <Play className="w-5 h-5" />
                    Content Preview
                  </DialogTitle>
                </DialogHeader>
                <div className="mt-4">{getPreviewContent()}</div>
              </DialogContent>
            </Dialog>
            <Button
              onClick={handleSubmit}
              disabled={addContentV2Mutation.isPending}
              className="flex-1"
            >
              {addContentV2Mutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Content"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
