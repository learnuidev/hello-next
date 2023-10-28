// import { LockClosedIcon } from '@heroicons/react/solid';
import { useState } from "react";
import { Lightning, LockClosedIcon } from "@/components/ui/icons";

import {
  useSignInPasswordless,
  useConfirmSignInPasswordless,
} from "@/domain/auth/auth.mutations";

enum RegistrationViewTypes {
  login,
  confirmLogin,
  userExists,
  codeSent,
}

export function Login() {
  const [username, setUserName] = useState("");
  const [code, setCode] = useState("");
  const [authUser, setAuthUser] = useState(null);
  const [password, setPassword] = useState("");
  const [viewType, setViewtype] = useState(RegistrationViewTypes.login);

  const useSignInMutation = useSignInPasswordless({
    onSuccess: (data: any) => {
      setAuthUser(data);
      setViewtype(RegistrationViewTypes.confirmLogin);
    },
    onError: (err: any) => {
      console.log("ERROR YO", err.message);
      if (err.message === "User already exists") {
        // useResendCodeMutation.mutate(username)
      }
    },
  });
  const useConfirmSignInMutation = useConfirmSignInPasswordless({
    onSuccess: () => {
      // setViewtype(RegistrationViewTypes.confirmRegister)
      const anchor = document.createElement("a");
      anchor.href = "/";
      anchor.click();
    },
  });

  if (viewType === RegistrationViewTypes.codeSent) {
    return (
      <>
        <div className="min-h-full flex items-start justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div>
              {/* <img
                            className='mx-auto h-12 w-auto'
                            src='https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg'
                            alt='Workflow'
                        /> */}

              <Lightning className="dark:text-pink-800 text-pink-600 mx-auto h-12 w-auto" />
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-gray-200">
                Confirm Code
              </h2>
            </div>
            <form className="mt-8 space-y-6">
              <input type="hidden" name="remember" defaultValue="true" />
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="email-address" className="sr-only">
                    Username
                  </label>
                  <input
                    id="email-address"
                    name="email"
                    // type='email'
                    // autoComplete='email'
                    value={username}
                    onChange={(event) => {
                      setUserName(() => event.target.value);
                      console.log("EVENT", event.target.value);
                    }}
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Email address"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">
                    Code
                  </label>
                  <input
                    id="code"
                    name="code"
                    type="text"
                    value={code}
                    onChange={(event) => {
                      setCode(() => event.target.value);
                      console.log("EVENT", event.target.value);
                    }}
                    autoComplete="current-code"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Code"
                  />
                </div>
              </div>

              <div>
                <button
                  onClick={(event) => {
                    event.preventDefault();
                    useConfirmSignInMutation.mutate({
                      authUser: authUser || '',
                      code,
                    });
                  }}
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <LockClosedIcon
                      className="h-5 w-5 text-pink-500 group-hover:text-pink-400"
                      aria-hidden="true"
                    />
                  </span>
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }

  if (viewType === RegistrationViewTypes.login) {
    return (
      <>
        <div className="min-h-full flex items-start justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div>
              {/* <img
                              className='mx-auto h-12 w-auto'
                              src='https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg'
                              alt='Workflow'
                          /> */}

              <Lightning className="dark:text-pink-800 text-pink-600 mx-auto h-12 w-auto" />
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-gray-200">
                Login
              </h2>
              <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-300">
                Or{" "}
                <a
                  href="/register"
                  className="font-medium text-pink-600 hover:text-pink-500"
                >
                  create a new account
                </a>
              </p>
            </div>
            <form className="mt-8 space-y-6">
              <input type="hidden" name="remember" defaultValue="true" />
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    // autoComplete='email'
                    value={username}
                    onChange={(event) => {
                      setUserName(() => event.target.value);
                      console.log("EVENT", event.target.value);
                    }}
                    required
                    className="dark:bg-gray-900 dark:text-gray-200 dark:border-gray-800 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Email address"
                  />
                </div>
              </div>

              <div>
                <button
                  onClick={(event) => {
                    event.preventDefault();
                    useSignInMutation.mutate({
                      email: username,
                    });
                  }}
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <LockClosedIcon
                      className="h-5 w-5 text-pink-500 group-hover:text-pink-400"
                      aria-hidden="true"
                    />
                  </span>
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="min-h-full flex items-start justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div>
              {/* <img
                              className='mx-auto h-12 w-auto'
                              src='https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg'
                              alt='Workflow'
                          /> */}

              <Lightning className="dark:text-pink-800 text-pink-600 mx-auto h-12 w-auto" />
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-gray-200">
                Verification required
              </h2>

              <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-500">
                Enter the code sent to {username}
              </p>
            </div>
            <form className="mt-8 space-y-6">
              <input type="hidden" name="remember" defaultValue="true" />
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="password" className="sr-only">
                    Code
                  </label>
                  <input
                    id="code"
                    name="code"
                    type="text"
                    value={code}
                    onChange={(event) => {
                      setCode(() => event.target.value);
                      console.log("EVENT", event.target.value);
                    }}
                    autoComplete="current-code"
                    required
                    className="dark:bg-gray-900 dark:text-gray-200 dark:border-gray-800 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Code"
                  />
                </div>
              </div>

              <div>
                <button
                  onClick={(event) => {
                    event.preventDefault();
                    useConfirmSignInMutation.mutate({
                      authUser: authUser || '',
                      code,
                    });
                  }}
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <LockClosedIcon
                      className="h-5 w-5 text-pink-500 group-hover:text-pink-400"
                      aria-hidden="true"
                    />
                  </span>
                  Confirm Code
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
}
