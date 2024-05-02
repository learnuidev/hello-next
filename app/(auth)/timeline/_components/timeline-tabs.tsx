"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobeAsia } from "@fortawesome/pro-light-svg-icons";
import { faLightbulb } from "@fortawesome/pro-thin-svg-icons";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Icons } from "@/components/ui/icons.v2";
import { TimelineTabBody } from "./timeline-tab-body";
import { TimelineTabBodyV2 } from "./timeline-tab-body.v2";

export function TimelineTabs() {
  return (
    <Tabs defaultValue="all" className="p-0">
      <div className="my-8 flex justify-between items-center md:mx-12">
        <TabsList className="space-x-8">
          <TabsTrigger
            value="all"
            className="px-0 data-[state=active]:text-yellow-500"
          >
            <FontAwesomeIcon icon={faGlobeAsia} className="text-2xl" />
          </TabsTrigger>
          <TabsTrigger
            value="timeline"
            className="px-0 data-[state=active]:text-yellow-500"
          >
            <Icons.rectangleHistory className="text-2xl" />
          </TabsTrigger>
          <TabsTrigger
            // value="learned"
            value="discovered"
            className="px-0 data-[state=active]:text-yellow-500"
          >
            <FontAwesomeIcon icon={faLightbulb} className="text-2xl" />
          </TabsTrigger>
        </TabsList>

        <div className="space-x-4"></div>
      </div>

      <TabsContent value="all" className="my-8">
        <TimelineTabBodyV2 variant="all" />
      </TabsContent>
      <TabsContent value="timeline" className="my-8">
        <TimelineTabBodyV2 variant="timeline" />
      </TabsContent>
      <TabsContent value="discovered" className="my-8">
        <TimelineTabBodyV2 variant="discovered" />
      </TabsContent>
    </Tabs>
  );
}
