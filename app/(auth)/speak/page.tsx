"use client";

import "@/libs/cognito/init";

import { NavBar } from "@/components/navbar";

import { SpeakPage } from "@/components/speak/v1";

export default function Home() {
  return (
    // <main className="">
    //   <NavBar />
    //   {/* <NavigatorMap /> */}

    //   <SearchPage />
    // </main>

    <main className="">
      <NavBar />

      <SpeakPage />

      {/* {isLoading || isCharactersLoading ? null : (
        <NomadMethod selectedId={selectedId} />
      )} */}

      {/* <Wordle /> */}

      {/* <div className="px-4 md:px-32 md:my-4">
        <Editor content="Hello" id="home page" />
      </div> */}
    </main>
  );
}
