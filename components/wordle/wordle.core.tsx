"use client";

// @ts-ignore

import { faArrowLeft, faArrowRight } from "@fortawesome/pro-thin-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function GameTile(props: any) {
  const { letter } = props;
  return (
    <div className="w-14 h-14 border-solid border-2 flex items-center justify-center mx-0.5 text-lg font-bold uppercase">
      {letter}
    </div>
  );
}

export const NextLessonButton = ({
  onClick,
  ...otherProps
}: {
  onClick: () => void;
} & any) => {
  return (
    <button
      {...otherProps}
      className="col-span-1 hidden md:block md:text-2xl dark:text-gray-600"
      onClick={onClick}
    >
      <FontAwesomeIcon icon={faArrowRight} />
    </button>
  );
};

export const PreviousLessonButton = ({
  onClick,
  ...otherProps
}: {
  onClick: () => void;
} & any) => {
  return (
    <button
      {...otherProps}
      className="col-span-1 hidden md:block md:text-2xl dark:text-gray-600"
      onClick={onClick}
    >
      <FontAwesomeIcon icon={faArrowLeft} />
    </button>
  );
};

export function GameRow(props: any) {
  const { guess } = props;

  return (
    <div className="flex justify-center mb-1">
      {guess.split("").map((letter: string, idx: number) => {
        return <GameTile letter={letter} key={`${idx}-${letter}-${idx}`} />;
      })}
      {/* <input value={guess} /> */}
    </div>
  );
}

export const WinButton = ({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) => {
  return (
    <div className="text-center transition mt-8">
      <button onClick={onClick}>{children}</button>
    </div>
  );
};

export const FinishButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <div className="text-center transition">
      <button onClick={onClick}>Continue</button>
    </div>
  );
};
