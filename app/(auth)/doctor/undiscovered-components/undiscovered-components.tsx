"use client";

import { useGetHskCharacters } from "@/app/nmm/hsk/use-get-hsk-characters";
import { NoLessonView } from "@/app/nmm/no-lesson-view";
import { Nothing } from "@/app/nmm/nothing";
import { Icons } from "@/components/ui/icons.v2";
import { useIsSuperAdmin } from "@/domain/auth/auth.queries";
import { useListComponents } from "@/domain/lesson/component.queries";

import { useDiscoverMutation } from "@/domain/nmm/discover.mutations";

export function UndiscoveredComponents() {
  const discoverMutation = useDiscoverMutation();

  const { data: components, isLoading: isComponentsLoading } =
    useListComponents({ includeAll: true });

  const { data: hskCharacters, isLoading: isHskCharactersLoading } =
    useGetHskCharacters({ getAll: true, version: 3, level: 6 });

  const undiscoveredHskCharacters = hskCharacters?.filter(
    (item: any) => !item?.status
  );

  const filteredComponents = components?.filter((item) => {
    const undiscoveredChar = undiscoveredHskCharacters?.find(
      (val: any) => val?.hanzi === item?.hanzi
    );

    return undiscoveredChar;
  });

  const mutateAll = async () => {
    if (undiscoveredHskCharacters?.length !== 0) {
      return Promise.all(
        undiscoveredHskCharacters?.map(async (char: any) => {
          return discoverMutation.mutateAsync(char);
        })
      );
    }

    return null;
  };

  const isSuperAdmin = useIsSuperAdmin();

  if (!isSuperAdmin) {
    return <div> You dont have the permission to view this page </div>;
  }

  if (!undiscoveredHskCharacters?.length) {
    return <Nothing icon={Icons.kiwi} message={"Nothing to discover here"} />;
  }

  return (
    <div className="m-8">
      <button
        className="bg-gray-800 px-4 py-2"
        onClick={() => {
          mutateAll().then(() => {
            alert("DONE");
          });
        }}
      >
        {" "}
        Mutate All
      </button>

      <div>
        <p className="text-3xl font-extralight">
          {undiscoveredHskCharacters?.length} components
        </p>
      </div>

      <div>
        <code>
          <pre>{JSON.stringify(undiscoveredHskCharacters, null, 2)}</pre>
        </code>
      </div>
    </div>
  );
}
