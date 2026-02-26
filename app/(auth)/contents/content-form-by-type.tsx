"use client";

import { ContentV2Type } from "@/domain/content-service/content-v2.types";
import { useAddContentV2Mutation } from "@/domain/content-service/use-add-content-v2.mutation";
import { useParseHtmlMutation } from "@/domain/content-service/use-parse-html.mutation";
import { useGetVideoByIdMutation } from "@/domain/youtube/get-video-by-id";
import {
  normalizeYoutubeUrl,
  parseYoutubeUrl,
} from "@/components/summary/parse-youtube-url";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Send,
  FileText,
  Globe,
  Loader2,
  Mic,
  X,
  Youtube,
  Upload,
} from "lucide-react";
import { useRouter } from "next/navigation";
import ReactPlayer from "react-player";

interface FormData {
  title?: string;
  url?: string;
  text?: string;
  file?: File;
}

interface YoutubeVideoData {
  title: string;
  description: string;
  author: string;
  thumbnails: {
    default: { url: string; width: number; height: number };
    medium: { url: string; width: number; height: number };
    high: { url: string; width: number; height: number };
    standard: { url: string; width: number; height: number };
    maxres: { url: string; width: number; height: number };
  };
}

function AddButton({
  onClick,
  isPending,
}: {
  onClick: () => void;
  isPending: boolean;
}) {
  return (
    <div className="flex justify-end">
      <Button onClick={onClick} disabled={isPending} size="lg" className="px-6">
        {isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : "Add"}
      </Button>
    </div>
  );
}

export function ContentFormByType({
  contentType,
}: {
  contentType: ContentV2Type;
}) {
  const router = useRouter();
  const addContentV2Mutation = useAddContentV2Mutation();
  const parseHtmlMutation = useParseHtmlMutation();
  const [formData, setFormData] = useState<FormData>({});
  const [youtubeVideoData, setYoutubeVideoData] =
    useState<YoutubeVideoData | null>(null);
  const [youtubeUrlError, setYoutubeUrlError] = useState<string | null>(null);
  const getVideoByIdMutation = useGetVideoByIdMutation();

  const handleSubmit = async () => {
    try {
      let text = formData.text;
      if (
        (contentType === "youtube" || contentType === "website") &&
        formData.url
      ) {
        text = `${formData.text || ""}\n\nURL: ${formData.url}`;
      }

      const resp = await addContentV2Mutation.mutateAsync({
        type: contentType,
        title: formData.title,
        text,
      });
      router.push(`/contents/${resp.pk}`);
    } catch (error) {
      console.error("Error creating content:", error);
    }
  };

  const handleYoutubeUrlChange = (url: string) => {
    setYoutubeUrlError(null);
    setFormData({ ...formData, url });
    setYoutubeVideoData(null);
  };

  const validateAndFetchYoutubeVideo = async (url: string) => {
    setYoutubeUrlError(null);
    setYoutubeVideoData(null);

    if (!url) return;

    if (contentType === "youtube") {
      const validation = parseYoutubeUrl(url);
      if (!validation.success) {
        setYoutubeUrlError("Invalid YouTube URL");
        return;
      }

      const cleanedUrl = normalizeYoutubeUrl(url);
      setFormData({ ...formData, url: cleanedUrl });

      try {
        const videoData = await getVideoByIdMutation.mutateAsync({
          url: cleanedUrl,
        });
        if (videoData) {
          setYoutubeVideoData(videoData);
          setFormData((prev) => ({
            ...prev,
            url: cleanedUrl,
            title: videoData.title,
            text: videoData.description,
          }));
        }
      } catch (error) {
        console.error("Error fetching YouTube video:", error);
      }
    }
  };

  const handleWebsiteUrlChange = (url: string) => {
    setFormData({ ...formData, url, text: undefined });
  };

  const validateAndFetchWebsite = async (url: string) => {
    if (url && contentType === "website") {
      try {
        const result = await parseHtmlMutation.mutateAsync({ websiteUrl: url });
        setFormData((prev) => ({ ...prev, url, text: result.html }));
      } catch (error) {
        console.error("Error parsing website:", error);
      }
    }
  };

  const hasContent = () => {
    return formData.text || formData.url || formData.file;
  };

  const getMessageContent = () => {
    if (!hasContent()) {
      return (
        <div className="text-center space-y-4">
          <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-purple-500/10 to-blue-500/10 dark:from-purple-500/20 dark:to-blue-500/20">
            {contentType === "youtube" && (
              <Youtube className="w-12 h-12 text-red-500" />
            )}
            {contentType === "text" && (
              <FileText className="w-12 h-12 text-blue-500" />
            )}
            {contentType === "website" && (
              <Globe className="w-12 h-12 text-purple-500" />
            )}
            {contentType === "audio" && (
              <Mic className="w-12 h-12 text-green-500" />
            )}
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-1">
              {contentType === "youtube" && "Enter a YouTube URL"}
              {contentType === "text" && "Start typing your content"}
              {contentType === "website" && "Enter a website URL"}
              {contentType === "audio" && "Upload an audio file"}
            </h3>
            <p className="text-sm text-muted-foreground">
              {contentType === "youtube" &&
                "Paste the link to import video content"}
              {contentType === "text" && "Write or paste your text below"}
              {contentType === "website" &&
                "Paste the link to extract webpage content"}
              {contentType === "audio" &&
                "Select a file to transcribe and process"}
            </p>
          </div>
        </div>
      );
    }

    switch (contentType) {
      case "youtube":
        if (youtubeUrlError) {
          return null;
        }

        if (getVideoByIdMutation.isPending) {
          return (
            <div className="flex flex-col items-center justify-center py-12 space-y-3">
              <Loader2 className="w-8 h-8 animate-spin text-red-500" />
              <p className="text-sm text-muted-foreground">
                Loading video details...
              </p>
            </div>
          );
        }

        if (!youtubeVideoData) {
          return null;
        }

        return (
          <div className="space-y-4">
            <div className="space-y-4">
              <div className="aspect-video w-full rounded-xl overflow-hidden bg-black/5 dark:bg-white/5">
                <ReactPlayer
                  url={formData.url}
                  width="100%"
                  height="100%"
                  controls
                />
              </div>

              <div className="space-y-3">
                <div>
                  <h3 className="text-xl font-semibold mb-1">
                    {youtubeVideoData.title}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="font-medium">
                      {youtubeVideoData.author}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <AddButton
              onClick={handleSubmit}
              isPending={addContentV2Mutation.isPending}
            />
          </div>
        );

      case "text":
        if (!formData.text) {
          return null;
        }
        return (
          <div className="space-y-4">
            {formData.title && (
              <h3 className="text-xl font-semibold">{formData.title}</h3>
            )}
            <p className="whitespace-pre-wrap text-gray-700 dark:text-gray-300 leading-relaxed">
              {formData.text}
            </p>
            <AddButton
              onClick={handleSubmit}
              isPending={addContentV2Mutation.isPending}
            />
          </div>
        );

      case "website":
        if (parseHtmlMutation.isPending) {
          return (
            <div className="flex flex-col items-center justify-center py-12 space-y-3">
              <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
              <p className="text-sm text-muted-foreground">
                Parsing website...
              </p>
            </div>
          );
        }

        if (!formData.text) {
          return null;
        }

        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Globe className="w-4 h-4" />
              <span className="truncate">{formData.url}</span>
            </div>
            <textarea
              placeholder="Edit the extracted content..."
              value={formData.text || ""}
              onChange={(e) =>
                setFormData({ ...formData, text: e.target.value })
              }
              className="w-full min-h-[200px] max-h-[500px] resize-y rounded-xl border border-input bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/30 dark:to-blue-950/30 px-4 py-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
            <AddButton
              onClick={handleSubmit}
              isPending={addContentV2Mutation.isPending}
            />
          </div>
        );

      case "audio":
        if (!formData.file) {
          return null;
        }
        const fileUrl = URL.createObjectURL(formData.file);
        return (
          <div className="space-y-4 pt-8 px-4 bg-gray-50">
            <div className="flex items-center gap-3 bg-gradient-to-br  dark:from-green-950/30 dark:to-emerald-950/30 rounded-xl border border-green-200/50 dark:border-green-800/50">
              <div className="p-2 rounded-full ">
                <Mic className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">
                  {formData.title || formData.file?.name || "Untitled Audio"}
                </p>
              </div>
            </div>
            <div className="aspect-audio w-full rounded-xl overflow-hidden bg-black/5 dark:bg-white/5">
              <ReactPlayer
                url={fileUrl}
                width="100%"
                height="50px"
                controls
                config={{
                  file: {
                    forceAudio: true,
                  },
                }}
              />
            </div>
            <AddButton
              onClick={handleSubmit}
              isPending={addContentV2Mutation.isPending}
            />
          </div>
        );
    }
  };

  const getInputArea = () => {
    switch (contentType) {
      case "youtube":
        return (
          <div className="space-y-2">
            <div className="flex items-end gap-2">
              <div className="flex-1">
                <Input
                  type="url"
                  placeholder="Paste YouTube URL..."
                  value={formData.url || ""}
                  onChange={(e) => handleYoutubeUrlChange(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      validateAndFetchYoutubeVideo(formData.url || "");
                    }
                  }}
                  disabled={getVideoByIdMutation.isPending}
                  className={
                    youtubeUrlError
                      ? "border-red-500 h-14 text-base"
                      : "h-14 text-base"
                  }
                />
              </div>
              {formData.url && !youtubeVideoData && (
                <Button
                  onClick={() => validateAndFetchYoutubeVideo(formData.url!)}
                  disabled={
                    !formData.url ||
                    youtubeUrlError !== null ||
                    getVideoByIdMutation.isPending
                  }
                  size="lg"
                  className="h-14 px-6"
                >
                  {getVideoByIdMutation.isPending ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Youtube className="w-5 h-5" />
                  )}
                </Button>
              )}
            </div>
            {youtubeUrlError && (
              <p className="text-sm text-red-500">{youtubeUrlError}</p>
            )}
          </div>
        );

      case "text":
        return (
          <div className="space-y-3">
            <Input
              type="text"
              placeholder="Add a title (optional)..."
              value={formData.title || ""}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="h-12"
            />
            <textarea
              placeholder="Type your content here..."
              value={formData.text || ""}
              onChange={(e) =>
                setFormData({ ...formData, text: e.target.value })
              }
              className="flex-1 min-h-[80px] max-h-[200px] resize-y w-full rounded-md border border-input bg-background px-4 py-3 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey && formData.text) {
                  e.preventDefault();
                  handleSubmit();
                }
              }}
            />
          </div>
        );

      case "website":
        return (
          <div className="space-y-3">
            <div className="flex items-end gap-2">
              <div className="flex-1">
                <Input
                  type="url"
                  placeholder="Paste website URL..."
                  value={formData.url || ""}
                  onChange={(e) => handleWebsiteUrlChange(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      validateAndFetchWebsite(formData.url || "");
                    }
                  }}
                  disabled={parseHtmlMutation.isPending}
                  className="h-14 text-base"
                />
              </div>
              {formData.url && !formData.text && (
                <Button
                  onClick={() => validateAndFetchWebsite(formData.url || "")}
                  disabled={parseHtmlMutation.isPending}
                  size="lg"
                  className="h-14 px-6"
                >
                  {parseHtmlMutation.isPending ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Globe className="w-5 h-5" />
                  )}
                </Button>
              )}
            </div>
          </div>
        );

      case "audio":
        return (
          <div className="space-y-3">
            <Input
              type="text"
              placeholder="Add a title (optional)..."
              value={formData.title || ""}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="h-12"
            />
            <label className="block">
              <div className="flex items-center justify-center h-14 px-4 rounded-md border-2 border-dashed border-input bg-background hover:bg-accent/50 transition-colors cursor-pointer">
                {formData.file ? (
                  <div className="flex items-center gap-2 w-full">
                    <Mic className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="truncate text-sm">
                      {formData.file.name}
                    </span>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setFormData({ ...formData, file: undefined });
                      }}
                      className="ml-auto shrink-0"
                    >
                      <X className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Upload className="w-5 h-5 shrink-0" />
                    <span className="text-sm">Upload audio file</span>
                  </div>
                )}
              </div>
              <input
                type="file"
                className="hidden"
                accept="audio/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setFormData({ ...formData, file, title: file.name });
                  }

                  if (e?.target?.value) {
                    e.target.value = "";
                  }
                }}
              />
            </label>
          </div>
        );
    }
  };

  return (
    <div className="space-y-4">
      <div>{getInputArea()}</div>

      {getMessageContent()}
    </div>
  );
}
