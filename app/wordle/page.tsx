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
    <div
      className="w-14 h-14 border-solid border-2 flex items-center justify-center mx-0.5
                      text-lg font-bold"
    >
      {letter}
    </div>
  );
}

function GameRow(props: any) {
  const { guess } = props;
  return (
    <div className="flex justify-center mb-1">
      {guess.map((letter: any) => {
        return <GameTile letter={letter} />;
      })}
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
    });
}

function GameBoard(props: { guessHistory: any; currentGuess: any }) {
  const { guessHistory, currentGuess } = props;
  const guessHistoryLength = guessHistory.length;
  const empties = Array(5 - guessHistory.length).fill("     ");
  console.log("EMPTIES", empties);
  return (
    <main className="pb-6">
      {guessHistory.map((guess: any, idx: any) => {
        return <GameRow key={`${guess}-${idx}`} guess={guess.split("")} />;
      })}
      <GameRow guess={transformForView(currentGuess)} />

      {/* <GameRow  */}
      {empties.map((guess, idx) => {
        return <GameRow key={`${guess}-${idx}`} guess={guess.split("")} />;
      })}
    </main>
  );
}

const secret = "我爱中文啊";

function App(props: any) {
  // 1. game state
  const [guessHistory, setGuessHistory] = useState([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [gameStatus, setGameStatus] = useState("");

  // Define event handlers (3)

  // 1. handler - handles characters
  const handleChar = (char: any) => {
    // guard
    if (currentGuess.length < 5) {
      setCurrentGuess(`${currentGuess}${char}`.toUpperCase());
    }
  };

  // 2. handles deleting charater
  const handleDelete = () => {
    // handle delete
    setCurrentGuess(currentGuess.slice(0, -1));
  };

  // 3. handles submittion
  const handleEnter = () => {
    // check if the currentGuess has 5 chars
    if (currentGuess.length < 5) {
      alert("Not enough letters");
    } else if (secret === currentGuess) {
      alert("You win");
      // } else if (!world.includes(currentGuess)) {
      //   alert("Word not in list");
    } else if (guessHistory.length === 5) {
      alert("You lose");
      setGameStatus("lost");
    } else {
      // add the current guess to guessHistory
      // reset currentGuess
      setGuessHistory(guessHistory.concat(currentGuess as any));
      setCurrentGuess("");
    }
  };

  const handleKeyBoard = (value: any) => {
    if (value === "Backspace") {
      handleDelete();
    } else if (value === "Enter") {
      handleEnter();
    } else {
      handleChar(value);
    }
  };

  const handleKeyup = (event: any) => {
    handleKeyBoard(event.key);
  };

  useEffect(() => {
    window.addEventListener("keyup", handleKeyup);
    // cleanup function
    return () => window.removeEventListener("keyup", handleKeyup);
  }, [handleChar, handleDelete, handleEnter]);

  return (
    <div>
      <NavBar />
      <div className="" onKeyUp={handleKeyup}>
        <header className="flex w-80 mx-auto mt-10 mb-8">
          <h1 className={"grow font-bold text-center"}>
            {" "}
            <span>拼音猜成语</span>{" "}
            <span className="text-gray-400">[worldle]</span>{" "}
          </h1>
        </header>
        <GameBoard guessHistory={guessHistory} currentGuess={currentGuess} />

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
