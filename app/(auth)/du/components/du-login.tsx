import { cn } from "@/lib/utils";
import { useState } from "react";
import { useVerifyUserMutation } from "../hooks/auth/use-verify-user";
import { useDuStore } from "../hooks/use-du-store";

export const DuLogin = () => {
  const [cookie, setCookieLocal] = useState("");
  const [error, setError] = useState("");
  const setCookie = useDuStore((state) => state.setCookie);

  const verifyUserMutation = useVerifyUserMutation();

  return (
    <div className="mt-32 flex justify-center items-center flex-col">
      <h1 className="text-2xl font-bold">Login</h1>

      <textarea
        // onKeyDown={(event) => {
        //   if (event?.keyCode === 13) {
        //     if (newConvo.audio) {
        //       setConvo("mediaUrl", newConvo?.audio);
        //       setStep("title");
        //     }
        //   }
        // }}
        onChange={(event) => {
          setCookieLocal(event.target.value);
        }}
        value={cookie}
        autoFocus
        rows={8}
        placeholder=""
        className="mt-8 sm:w-[655px] w-full font-extralight focus:outline-0 p-2 border-0 border-none dark:text-gray-300"
      />

      <button
        disabled={!cookie}
        onClick={() => {
          setError("");
          verifyUserMutation.mutateAsync({ cookie }).then((res) => {
            if (!res.success) {
              setError("Incorrect Credential");
            } else {
              setCookie(cookie);
              setError("Success");
            }

            // revifyUserHandler();
            // alert(JSON.stringify(res));
          });
        }}
        className="mt-8"
      >
        Submit
      </button>

      {error && (
        <div
          className={cn(
            "my-8",
            error === "Incorrect Credential" ? "text-red-400" : "text-green-400"
          )}
        >
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};
