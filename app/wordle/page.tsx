"use client";

import {
  InformationCircleIcon,
  ChartBarIcon,
  SunIcon,
} from "@/components/ui/icons";

import { useState, useEffect } from "react";
//   import { wordsDictionary } from './constants'
import { world } from "./cities";
import { NavBar } from "@/components/navbar";

// Steps:
// 1. Define game state
// 2. Define handlers
// 3. Custom Components - KeyList
// 4. Custom Component - GameBoard

// Custom Components

function GameTile(props: any) {
  const { letter } = props;
  return (
    <div className="w-14 h-14 border-solid border-2 flex items-center justify-center mx-0.5 text-lg font-bold uppercase">
      {letter}
    </div>
  );
}

function GameRow(props: any) {
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

function transformForView(currentGuess: any) {
  const guessColl = currentGuess.split("");
  return Array(5)
    .fill("")
    .map((i, idx) => {
      if (guessColl[idx]) {
        return guessColl[idx];
      }
      return " ";
    })
    .join("");
}

const secret = "我爱中文啊";

function App(props: any) {
  // 1. game state
  const [guessHistory, setGuessHistory] = useState([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [gameStatus, setGameStatus] = useState("");

  // Define event handlers (3)

  // 3.1 handles submittion
  const handleEnter = () => {
    // check if the currentGuess has 5 chars
    if (secret === currentGuess) {
      alert("You win");
    } else if (guessHistory.length === 5) {
      alert("You lose");
      setGameStatus("lost");
    } else {
      // 1. add the current guess to guessHistory
      setGuessHistory(guessHistory.concat(currentGuess as any));

      // 2. reset currentGuess
      setCurrentGuess("");
    }
  };

  const handleKeyup = (event: any) => {
    if (event.key === "Enter") {
      handleEnter();
    } else {
      // handleChar();
      setCurrentGuess(event.target.value);
    }
  };

  const empties = Array(5 - guessHistory.length).fill("     ");

  console.log("guess history", guessHistory);

  return (
    <div>
      <NavBar />
      <div className="">
        <header className="flex w-80 mx-auto mt-10 mb-8">
          <h1 className={"grow font-bold text-center"}>
            {" "}
            <span>拼音猜成语</span>{" "}
            <span className="text-gray-400">[worldle]</span>{" "}
          </h1>
        </header>

        <main className="pb-6 flex items-center justify-center flex-col">
          <div className="w-80">
            {guessHistory.map((guess: any, idx: any) => {
              return <GameRow key={`${guess}-${idx}`} guess={guess} />;
            })}
          </div>

          <div className="flex justify-center my-4">
            <input
              className="h-14 border-solid border-2 w-[295px] text-2xl px-2"
              value={currentGuess}
              onKeyDown={(event: any) => {
                if (event.key === "Enter") {
                  handleEnter();
                } else {
                  setCurrentGuess(event.target.value);
                }
              }}
              onChange={(event) => {
                handleKeyup(event);
              }}
            />
          </div>
        </main>

        {gameStatus === "lost" && (
          <div>
            <p>{secret}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
