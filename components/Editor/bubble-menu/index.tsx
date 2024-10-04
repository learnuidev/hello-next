import { BubbleMenu, BubbleMenuProps, isNodeSelection } from "@tiptap/react";
import { FC, useState } from "react";
import {
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  StrikethroughIcon,
  AlignCenter,
  AlignRight,
  AlignLeft,
  CodeIcon,
} from "lucide-react";
import { NodeSelector } from "./node-selector";
import { ColorSelector } from "./color-selector";
import { LinkSelector } from "./link-selector";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/ui/icons.v2";
import { useAddSentenceMutation } from "@/domain/sentence/sentence.mutations";
import { useParams } from "next/navigation";
import { useSpeak } from "@/app/(auth)/convos/_play/use-speak";

export interface BubbleMenuItem {
  name: string;
  isActive: () => boolean;
  command: () => void;
  Icon?: any;
  text: string;
}

type EditorBubbleMenuProps = Omit<BubbleMenuProps, "children">;

// TODO: Fix Type for this component
export const EditorBubbleMenu: FC<EditorBubbleMenuProps> = (props: any) => {
  const addSentenceMutation = useAddSentenceMutation();

  const { speak } = useSpeak();

  const params = useParams() as {
    "component-id": string;
  };
  const items: BubbleMenuItem[] = [
    {
      name: "bold",
      isActive: () => props.editor.isActive("bold"),
      Icon: Icons.compass,
      command: () => {
        // const { selection, state } = props.editor;
        // const { from, to } = selection;

        // const text = state.doc.textBetween(from, to, " ");
        // return props.editor.chain().focus().toggleBold().run();

        const { view, state } = props.editor;
        const { from, to } = view.state.selection;
        const text = state.doc.textBetween(from, to, "");
        alert(text);

        return addSentenceMutation.mutateAsync({
          component: decodeURIComponent(params?.["component-id"]),
          input: text,
        });
      },
      text: "Add",
    },
    {
      name: "bold",
      isActive: () => props.editor.isActive("bold"),
      Icon: Icons.playCircle,
      command: () => {
        // const { selection, state } = props.editor;
        // const { from, to } = selection;

        // const text = state.doc.textBetween(from, to, " ");
        // return props.editor.chain().focus().toggleBold().run();

        const { view, state } = props.editor;
        const { from, to } = view.state.selection;
        const text = state.doc.textBetween(from, to, "");

        speak(text);
      },

      text: "Speak",
    },
    // {
    //   name: "italic",
    //   isActive: () => props.editor.isActive("italic"),
    //   command: () => props.editor.chain().focus().toggleItalic().run(),
    //   icon: ItalicIcon,
    // },
    // {
    //   name: "underline",
    //   isActive: () => props.editor.isActive("underline"),
    //   command: () => props.editor.chain().focus().toggleUnderline().run(),
    //   icon: UnderlineIcon,
    // },
    // {
    //   name: "strike",
    //   isActive: () => props.editor.isActive("strike"),
    //   command: () => props.editor.chain().focus().toggleStrike().run(),
    //   icon: StrikethroughIcon,
    // },
    // {
    //   name: "align-left",
    //   isActive: () => props.editor.isActive({ textAlign: "left" }),
    //   command: () => props.editor.chain().focus().setTextAlign("left").run(),
    //   icon: AlignLeft,
    // },
    // {
    //   name: "align-center",
    //   isActive: () => props.editor.isActive({ textAlign: "center" }),
    //   command: () => props.editor.chain().focus().setTextAlign("center").run(),
    //   icon: AlignCenter,
    // },
    // {
    //   name: "align-right",
    //   isActive: () => props.editor.isActive({ textAlign: "right" }),
    //   command: () => props.editor.chain().focus().setTextAlign("right").run(),
    //   icon: AlignRight,
    // },
    // {
    //   name: "code",
    //   isActive: () => props.editor.isActive("code"),
    //   command: () => props.editor.chain().focus().toggleCode().run(),
    //   icon: CodeIcon,
    // },
  ];

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

  return (
    <BubbleMenu
      {...bubbleMenuProps}
      className="flex w-fit divide-x divide-stone-200 rounded border border-stone-200 bg-white shadow-xl"
    >
      {/* <NodeSelector
        editor={props.editor}
        isOpen={isNodeSelectorOpen}
        setIsOpen={() => {
          setIsNodeSelectorOpen(!isNodeSelectorOpen);
          setIsColorSelectorOpen(false);
          setIsLinkSelectorOpen(false);
        }}
      /> */}
      {/* <LinkSelector
        editor={props.editor}
        isOpen={isLinkSelectorOpen}
        setIsOpen={() => {
          setIsLinkSelectorOpen(!isLinkSelectorOpen);
          setIsColorSelectorOpen(false);
          setIsNodeSelectorOpen(false);
        }}
      /> */}
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
      {/* <ColorSelector
        editor={props.editor}
        isOpen={isColorSelectorOpen}
        setIsOpen={() => {
          setIsColorSelectorOpen(!isColorSelectorOpen);
          setIsNodeSelectorOpen(false);
          setIsLinkSelectorOpen(false);
        }}
      /> */}
    </BubbleMenu>
  );
};
