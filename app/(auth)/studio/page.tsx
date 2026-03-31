"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons.v2";
import { SeriesManagement } from "./components/series-management";
import { ContentManagement } from "./components/content-management";
import { SourcesManagement } from "./components/sources-management";

export default function StudioPage() {
  const [activeTab, setActiveTab] = useState("series");

  return (
    <div className="mx-2 sm:mx-12 mb-32">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Studio</h1>
          <p className="text-muted-foreground mt-1">
            Manage your content series, sources, and pipeline
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 lg:w-[500px]">
          <TabsTrigger value="series" className="flex items-center gap-2">
            <Icons.contentSolid className="h-4 w-4" />
            Series
          </TabsTrigger>
          <TabsTrigger value="content" className="flex items-center gap-2">
            <Icons.layerGroup className="h-4 w-4" />
            Content
          </TabsTrigger>
          <TabsTrigger value="sources" className="flex items-center gap-2">
            <Icons.userSolid className="h-4 w-4" />
            Sources
          </TabsTrigger>
        </TabsList>

        <TabsContent value="series" className="mt-6">
          <SeriesManagement />
        </TabsContent>

        <TabsContent value="content" className="mt-6">
          <ContentManagement />
        </TabsContent>

        <TabsContent value="sources" className="mt-6">
          <SourcesManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
}
