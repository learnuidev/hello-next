import Lottie from "lottie-react";
import yay from "./yay.json";

export const LessonAddSuccessView = ({
  showYay,
  setShowMsg,
  setShowYay,
  showMsg,
  lesson,
  selectedId,
  setViewSuccessBanner,
}: any) => {
  return (
    <div className="relative content-center md:my-48 my-8">
      {showYay && (
        <Lottie
          className="z-10 inset-0 top-40 fixed h-80"
          animationData={yay}
          loop={false}
          onComplete={() => {
            setShowYay(false);
            setShowMsg(true);
          }}
        />
      )}

      {showMsg && (
        <div>
          <div>
            <div className="h-32 mx-4 md:mx-0 grow flex flex-col items-center transition ease-in-out">
              <h1 className="z-50 md:mx-48 my-2 mb-8 text-black dark:text-white text-3xl">
                Lesson successfully created for: {selectedId}
              </h1>
            </div>

            <div className="flex items-center w-full justify-center">
              <button
                className="z-50"
                onClick={() => {
                  setViewSuccessBanner(false);
                  setShowMsg(false);
                }}
              >
                View Lesson
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
