"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import { defaultExtensions } from "./extensions";
import { useDebouncedCallback } from "use-debounce";
import { EditorBubbleMenu } from "./bubble-menu";
import Mathematics from "@tiptap-pro/extension-mathematics";
import UniqueID from "@tiptap-pro/extension-unique-id";
import TableOfContent from "@tiptap-pro/extension-table-of-content";
import { ToC } from "./ToC";
import React from "react";

import "katex/dist/katex.min.css";

const MemorizedToC = React.memo(ToC);
// const MemorizedToC = ToC

const defaultContent = `{"type":"doc","content":[{"type":"heading","attrs":{"uid":"9b13f2c2-809e-42ac-aa77-0998f8c46651","textAlign":"left","id":"c39786b1-1a29-417e-a6eb-c7bb2578a185","data-toc-id":"c39786b1-1a29-417e-a6eb-c7bb2578a185","level":1},"content":[{"type":"text","text":"Nomad Method"}]},{"type":"paragraph","attrs":{"uid":"f9bef7d5-cc57-4d1d-b1da-75022491358f","textAlign":"left"}},{"type":"paragraph","attrs":{"uid":"64b158e8-6f35-4212-b216-a1b1f6aa4fcc","textAlign":"left"},"content":[{"type":"text","text":"Nomad Method is "},{"type":"text","marks":[{"type":"bold"},{"type":"textStyle","attrs":{"color":""}}],"text":"a mnemonic system for learning Mandarin Chinese characters"},{"type":"text","text":". It is inspired from Luke and Phils earth shattering "},{"type":"text","marks":[{"type":"link","attrs":{"href":"https://www.mandarinblueprint.com/","target":"_blank","rel":"noopener noreferrer","class":"notion-link-token notion-focusable-token notion-enable-hover"}},{"type":"textStyle","attrs":{"color":""}}],"text":"mandarin blueprint"},{"type":"text","text":" system… with a minor tweaks."}]},{"type":"paragraph","attrs":{"uid":"5791865f-f7fb-410b-8b37-37674bdb1a3c","textAlign":"left"}},{"type":"heading","attrs":{"uid":"de198a40-68a9-43f9-baa1-2efb1c93b058","textAlign":"left","id":"1a9fc6b8-3163-42f0-ab41-0b2ab51f5457","data-toc-id":"1a9fc6b8-3163-42f0-ab41-0b2ab51f5457","level":2},"content":[{"type":"text","text":"nomads, destinations and locations"}]},{"type":"paragraph","attrs":{"uid":"b0b4f22a-f35f-488d-be80-6d623ced5d1e","textAlign":"left"}},{"type":"paragraph","attrs":{"uid":"50594e57-1f87-4cdf-9e4a-2616e93e2bb5","textAlign":"left"},"content":[{"type":"text","text":"Nomads initials represents the initials of hanzi. They don't actually have to be real nomads. They can be anyone."}]},{"type":"paragraph","attrs":{"uid":"535d5e4e-1084-438a-96a9-18f2a18044e7","textAlign":"left"},"content":[{"type":"text","text":"The places that you choose are places that you've been. Maybe places you've lived, places that you can walk around quite easily in your mind's eye and imagine. We call those "},{"type":"text","marks":[{"type":"bold"}],"text":"destinations."},{"type":"text","text":" Destinations initials is used to remember the finals of hanzi"}]},{"type":"paragraph","attrs":{"uid":"1cef56ee-02ec-4622-8ebe-727b585cbd0a","textAlign":"left"},"content":[{"type":"text","text":"Locations represent the tone of the hanzi. In Nomad Mandarin Method we use five specific "},{"type":"text","marks":[{"type":"bold"}],"text":"locations"},{"type":"text","text":" within the destination:"}]},{"type":"bulletList","attrs":{"tight":true},"content":[{"type":"listItem","content":[{"type":"paragraph","attrs":{"uid":"98a5a161-e1fc-4360-98f3-e6034fe42d2f","textAlign":"left"},"content":[{"type":"text","text":"first tone represents the airport / bustop / train station"}]}]},{"type":"listItem","content":[{"type":"paragraph","attrs":{"uid":"7fcabeb0-7803-43e3-91c0-6c91da7ea018","textAlign":"left"},"content":[{"type":"text","text":"second tone represents the hotel / hostel"}]}]},{"type":"listItem","content":[{"type":"paragraph","attrs":{"uid":"ad9a7139-0d58-4622-8bbf-ef98fa42b52f","textAlign":"left"},"content":[{"type":"text","text":"third tone represents the restaurant"}]}]},{"type":"listItem","content":[{"type":"paragraph","attrs":{"uid":"37ffb8b5-05bc-4d63-b3aa-d9fce860372c","textAlign":"left"},"content":[{"type":"text","text":"fourth tone represents outside"}]}]},{"type":"listItem","content":[{"type":"paragraph","attrs":{"uid":"37caa25d-ef72-4c1e-a638-b4e9b3c13dd9","textAlign":"left"},"content":[{"type":"text","text":"fifth tone represents museums"}]}]}]},{"type":"paragraph","attrs":{"uid":"3ca8cf7f-13cc-49c8-8b1d-551550f3b7ff","textAlign":"left"},"content":[{"type":"text","text":"nomads, destination and location help us remember pronunciation and tone of the hanzi character."}]},{"type":"paragraph","attrs":{"uid":"d4bf6205-fb2b-46e5-a660-d53997470197","textAlign":"left"},"content":[{"type":"text","text":"What about the structure and meaning of the character?"}]},{"type":"paragraph","attrs":{"uid":"aa8425e6-74e4-4827-9523-9de077595cba","textAlign":"left"},"content":[{"type":"text","text":"Thats where components and stories come into play"}]},{"type":"heading","attrs":{"uid":"25dd61d5-cad6-410c-a865-5ce96cf59714","textAlign":"left","id":"db72ceb1-2510-4c4a-9da9-50beed8362e9","data-toc-id":"db72ceb1-2510-4c4a-9da9-50beed8362e9","level":2},"content":[{"type":"text","text":"components and stories"}]},{"type":"paragraph","attrs":{"uid":"ace62615-a0d2-4aa4-af57-a98c652b2b43","textAlign":"left"}},{"type":"paragraph","attrs":{"uid":"a06aa891-bf57-4ddd-b465-3d476086d7f3","textAlign":"left"},"content":[{"type":"text","text":"Each Chinese character is made up of one or more "},{"type":"text","marks":[{"type":"bold"}],"text":"components"},{"type":"text","text":". Components can be real world 3D object, a person, an animal or even an abstract idea. It will be used to represent components of the character"}]},{"type":"paragraph","attrs":{"uid":"fec0ca52-5360-4782-af7c-0fb1d1abeffd","textAlign":"left"},"content":[{"type":"text","text":"And finally, everything that you do with the nomad in the location of the destination, with the components, the actions of the series of actions that you have is called the "},{"type":"text","marks":[{"type":"bold"}],"text":"story"},{"type":"text","text":". So without further ado, let's jump in and learn the first character."}]}]}`;
export const Editor = ({
  content,
  // id,
  className,
  onUpdate,
  readOnly = true,
}: {
  className?: string;
  content: string;
  onUpdate?: any;
  // id: string;
  readOnly?: boolean;
}) => {
  const debounced = useDebouncedCallback(
    // function
    (value) => {
      onUpdate?.(value);
    },
    // delay in ms
    1000
  );

  const editor = useEditor({
    autofocus: false,
    extensions: [
      ...defaultExtensions,
      // Mathematics.configure({
      //   katexOptions: {
      //     maxSize: 300
      //   }
      // }),
      Mathematics,
      // UniqueID.configure({
      //   attributeName: "uid",
      //   types: ["heading", "paragraph"],
      // }),
      TableOfContent,
    ],
    // content: content,
    content: content,
    // content:
    //   typeof window !== "undefined" && JSON.parse(localStorage?.getItem(id) || '')?.content?.length < 10
    //     ? JSON.parse(defaultContent)
    //     : JSON.parse(defaultContent),
    onUpdate: ({ editor }) => {
      // if (id) {
      //   localStorage &&
      //     localStorage.setItem(id, JSON.stringify(editor.getJSON()));
      // }

      if (readOnly) {
        return null;
      } else {
        debounced(editor.getJSON());

        onUpdate && onUpdate?.(editor?.getJSON());
      }
    },
  });

  if (content) {
    return (
      <>
        {/* <div className="hidden sm:block table-of-content">
          <MemorizedToC
            editor={editor}
            items={editor?.storage?.tableOfContent?.content}
          />
        </div> */}
        {editor && !readOnly && <EditorBubbleMenu editor={editor} />}
        <div className="mt-0 pt-0">
          <EditorContent
            // className="pt-0"
            readOnly={readOnly}
            // className={className}
            editor={editor}
          />
        </div>
      </>
    );
  }
};
