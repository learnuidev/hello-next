import { create } from "zustand";

export const useSelectedLevel = create((set: any, get: any) => ({
  selectedLevel: null,
  setSelectedLevel: (mode: any) => set({ selectedLevel: mode }),
}));

export const PinyinCodes = ({
  pinyinCodes,
}: {
  pinyinCodes: {
    level: number;
    total: number;
  }[];
}) => {
  const selectedLevel = useSelectedLevel((state) => state.selectedLevel) as any;
  const setSelectedLevel = useSelectedLevel((state) => state.setSelectedLevel);

  return (
    <div className="flex justify-center w-full my-32 text-gray-600 text-xl space-x-2">
      {pinyinCodes?.map((code: any) => {
        return (
          <p
            onClick={() => {
              if (
                selectedLevel?.level === code?.level &&
                selectedLevel?.isClicked
              ) {
                setSelectedLevel(null);
              } else {
                setSelectedLevel({ ...code, isClicked: true });
              }
            }}
            className="hover:text-white transition cursor-pointer"
            key={code?.level}
            onMouseLeave={() => {
              if (!selectedLevel?.isClicked) {
                setSelectedLevel(null);
              }
            }}
            onMouseEnter={() => {
              if (!selectedLevel?.isClicked) {
                setSelectedLevel(code);
              }
            }}
          >
            {code?.level}
            {code?.total}{" "}
          </p>
        );
      })}
    </div>
  );
};
