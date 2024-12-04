"use client";

import { Nothing } from "@/app/nmm/nothing";
import { Icons } from "@/components/ui/icons.v2";
import { useIsSuperAdmin } from "@/domain/auth/auth.queries";
import { useUpdateComponentMutation } from "@/domain/component/use-update-component-mutation";

import { useListComponents } from "@/domain/lesson/component.queries";

export function Language() {
  const { data: components } = useListComponents({});

  const updateComponentMutation = useUpdateComponentMutation();

  const componentsWithoutLang = components
    ?.filter((item) => item.lang !== "zh")
    .map((comp) => {
      return {
        id: comp?.id,
        lang: comp?.lang,
        hanzi: comp?.hanzi,
      };
    });

  const mutateAll = async () => {
    if (componentsWithoutLang !== undefined) {
      return Promise.all(
        componentsWithoutLang?.map(async (char) => {
          return updateComponentMutation.mutateAsync(char);
        })
      );
    }

    return null;
  };

  const isSuperAdmin = useIsSuperAdmin();

  if (!isSuperAdmin) {
    return <div> You dont have the permission to view this page </div>;
  }

  if (!componentsWithoutLang?.length) {
    return (
      <Nothing
        icon={Icons.kiwi}
        message={"You have discovered all the components"}
      />
    );
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
          {componentsWithoutLang?.length} components
        </p>
      </div>

      <div>
        <code>
          <pre>{JSON.stringify(componentsWithoutLang, null, 2)}</pre>
        </code>
      </div>
    </div>
  );
}
