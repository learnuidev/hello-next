import { useSpeak } from "@/app/(auth)/convos/_play/use-speak";
import { Icons } from "@/components/ui/icons.v2";
import { useAddSentenceMutation } from "@/domain/sentence/sentence.mutations";
import { useGetCurrentLang } from "@/hooks/use-get-current-lang";
import { BubbleMenu, BubbleMenuProps, isNodeSelection } from "@tiptap/react";
import { useParams, useRouter } from "next/navigation";
import { FC, useState } from "react";

import { NodeSelector } from "./node-selector";
import { ColorSelector } from "./color-selector";
import { useIsSuperAdmin } from "@/domain/auth/auth.queries";
import { useIsSearchTrackingEnabled } from "@/hooks/use-is-search-tracking-enabled";
import { useAddHistoryMutation } from "@/domain/history/history.mutations";
import { useGetComponentId } from "@/app/nmm/[component-id]/use-get-component-id";

export interface BubbleMenuItem {
  name: string;
  isActive: () => boolean;
  command: () => void;
  Icon?: any;
  text?: string;
}

type EditorBubbleMenuProps = Omit<BubbleMenuProps, "children">;

// TODO: Fix Type for this component
export const EditorBubbleMenu: FC<EditorBubbleMenuProps> = (props: any) => {
  const addSentenceMutation = useAddSentenceMutation();
  const lang = useGetCurrentLang();

  const contextId = useGetComponentId();

  const router = useRouter();

  const addHistoryMutation = useAddHistoryMutation();

  // TODO: Fix this
  const isSearchTrackingEnabled = useIsSearchTrackingEnabled();

  const { speak } = useSpeak();

  const params = useParams() as {
    "component-id": string;
  };

  const isSuperAdmin = useIsSuperAdmin();

  let items: BubbleMenuItem[] = [
    {
      name: "play",
      isActive: () => props.editor.isActive("bold"),
      Icon: Icons.playCircle,
      command: () => {
        const { view, state } = props.editor;
        const { from, to } = view.state.selection;
        const text = state.doc.textBetween(from, to, "");

        speak(text);
      },
    },
    {
      name: "route",
      isActive: () => props.editor.isActive("bold"),
      Icon: Icons.magnifyingGlass,
      command: () => {
        const { view, state } = props.editor;
        const { from, to } = view.state.selection;
        const text = state.doc.textBetween(from, to, "");

        if (isSearchTrackingEnabled) {
          addHistoryMutation.mutate({
            input: text,
            lang,
            eventType: "SEARCH",
            searchContextText: contextId,
          } as any);
        }

        router.push(`/nmm/${text}?lang=${lang || "zh"}`);
      },
    },
    {
      name: "bold",
      isActive: () => props.editor.isActive("bold"),
      Icon: Icons.bold,
      command: () => {
        return props.editor.chain().focus().toggleBold().run();
      },
    },
    {
      name: "italic",
      isActive: () => props.editor.isActive("italic"),
      command: () => props.editor.chain().focus().toggleItalic().run(),
      Icon: Icons.italic,
    },
  ];

  if (isSuperAdmin) {
    items = [
      {
        name: "add",
        isActive: () => props.editor.isActive("bold"),
        Icon: Icons.plusIcon,
        command: () => {
          // const { selection, state } = props.editor;
          // const { from, to } = selection;

          // const text = state.doc.textBetween(from, to, " ");
          // return props.editor.chain().focus().toggleBold().run();

          const { view, state } = props.editor;
          const { from, to } = view.state.selection;
          const text = state.doc.textBetween(from, to, "");
          alert(text);

          return (
            addSentenceMutation
              // @ts-ignore
              .mutateAsync({
                component: decodeURIComponent(params?.["component-id"]),
                input: text,
              })
          );
        },
        // text: "Add",
      },
      ...items,
    ];
  }

  const bubbleMenuProps: EditorBubbleMenuProps = {
    ...props,
    shouldShow: ({ state, editor }) => {
      const { selection } = state;
      const { empty } = selection;

      // don't show bubble menu if:
      // - the selected node is an image
      // - the selection is empty
      // - the selection is a node selection (for drag handles)
      if (editor.isActive("image") || empty || isNodeSelection(selection)) {
        return false;
      }
      return true;
    },
    tippyOptions: {
      moveTransition: "transform 0.15s ease-out",
      onHidden: () => {
        setIsNodeSelectorOpen(false);
        setIsColorSelectorOpen(false);
        setIsLinkSelectorOpen(false);
      },
    },
  };

  const [isNodeSelectorOpen, setIsNodeSelectorOpen] = useState(false);
  const [isColorSelectorOpen, setIsColorSelectorOpen] = useState(false);
  const [isLinkSelectorOpen, setIsLinkSelectorOpen] = useState(false);
  const [isActionSelectorOpen, setIsActionSelectorOpen] = useState(false);

  return (
    <BubbleMenu
      {...bubbleMenuProps}
      className="flex w-fit divide-x divide-stone-200 rounded border border-stone-200 bg-white shadow-xl"
    >
      <div className="flex">
        {items.map((item, index) => (
          <button
            key={index}
            onClick={item.command}
            className="flex space-x-2 p-2 items-center text-stone-600 text-sm hover:bg-stone-100 active:bg-stone-200"
            type="button"
          >
            <p>{item.text}</p>
            <item.Icon />
          </button>
        ))}
      </div>
      <NodeSelector
        editor={props.editor}
        isOpen={isNodeSelectorOpen}
        setIsOpen={() => {
          setIsNodeSelectorOpen(!isNodeSelectorOpen);
          setIsColorSelectorOpen(false);
          setIsLinkSelectorOpen(false);
          setIsActionSelectorOpen(false);
        }}
      />
      <ColorSelector
        editor={props.editor}
        isOpen={isColorSelectorOpen}
        setIsOpen={() => {
          setIsColorSelectorOpen(!isColorSelectorOpen);
          setIsNodeSelectorOpen(false);
          setIsLinkSelectorOpen(false);
          setIsActionSelectorOpen(false);
        }}
      />
    </BubbleMenu>
  );
};
