import { contentTextStore, contentTypeStore } from "../../new-content-store";

export const TextContent = () => {
  const setContentType = contentTypeStore((state) => state.setType);

  const contextText = contentTextStore((state) => state.text) || "";
  const setContextText = contentTextStore((state) => state.setText);

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
            setContentType("");
          }}
        >
          Add
        </button>

        <button
          onClick={() => {
            setContentType("");
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
