import {
  AddNewMediaParams,
  useAddNewMediaMutation,
} from "@/app/(auth)/listen/hooks/use-add-new-media-mutation";
import { contentTextStore, contentTypeStore } from "../../new-content-store";
import { useListenState } from "@/app/(auth)/listen/hooks/use-listen-state";
import { useRouter } from "next/navigation";

export const TextContent = () => {
  const contentType = contentTypeStore((state) => state.type);
  const setContentType = contentTypeStore((state) => state.setType);

  const contextText = contentTextStore((state) => state.text) || "";
  const setContextText = contentTextStore((state) => state.setText);

  const {
    addNewContent,
    setAddNewContent,
    setAddNewBook,
    addNew,
    setAddNew,
    addNewBook,
  } = useListenState();

  const router = useRouter();

  const addNewMedia = useAddNewMediaMutation();

  return (
    <div className="flex flex-col justify-end items-center gap-4 w-full">
      <textarea
        value={contextText}
        onChange={(event) => {
          setContextText(event.target.value);
        }}
        placeholder="Enter your content here..."
        className="p-4 max-w-8xl w-full h-[260px] sm:h-[600px] rounded-xl focus-visible:outline-none focus-visible:ring-ring"
      />

      <div className="flex gap-4">
        <button
          onClick={() => {
            addNewMedia
              .mutateAsync({
                text: contextText,
                type: contentType,
              } as AddNewMediaParams)
              .then((resp) => {
                setContextText("");

                setContentType("");
                router.push(`/listen/${resp.id}`);
              })
              .catch((err) => {
                alert("err yo");
              });
          }}
        >
          {addNewMedia.isPending ? "Adding..." : "Add"}
        </button>

        <button
          onClick={() => {
            setAddNew(!addNew);
            setAddNewContent(false);
            setAddNewBook(false);

            setAddNewContent(false);
            setContentType("");
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
