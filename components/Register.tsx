// import { LockClosedIcon } from '@heroicons/react/solid';
import { useState } from "react";
import { Lightning, LockClosedIcon } from "@/components/ui/icons";
import {
  useSignUpPasswordless,
  useResendCode,
  useSignUp,
  useConfirmSignUp,
} from "@/domain/auth/auth.mutations";

enum RegistrationViewTypes {
  register,
  confirmRegister,
  userExists,
  codeSent,
}

export function Register() {
  // const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  // const [email, setEmail] = useState("");
  const [viewType, setViewtype] = useState(RegistrationViewTypes.register);
  const [error, setError] = useState("");

  const useResendCodeMutation = useResendCode({
    onSuccess: () => {
      setViewtype(RegistrationViewTypes.codeSent);
    },
  });

  const useConfirmSignUpMutation = useConfirmSignUp({
    onSuccess: () => {
      // setViewtype(RegistrationViewTypes.confirmRegister)
      const anchor = document.createElement("a");
      anchor.href = "/login";
      anchor.click();
    },
  });

  const useSignupMutation = useSignUp({
    onSuccess: () => {
      setViewtype(RegistrationViewTypes.confirmRegister);
    },
    onError: (err: any) => {
      if (err.message === "An account with the given email already exists.") {
        setError(err.message);
        // useResendCodeMutation.mutate(username)
      }
    },
  });

  //  const useConfirmSignInMutation = useConfirmSignInPasswordless({
  //       onSuccess: () => {
  //           // setViewtype(RegistrationViewTypes.confirmRegister)
  //           const anchor = document.createElement('a');
  //           anchor.href = '/login';
  //           anchor.click();
  //       },
  //   });

  const onSubmit = (event: any) => {
    console.log("TODO");
  };

  if (viewType === RegistrationViewTypes.register) {
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
                Register for a new account
              </h2>
              <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-300">
                Or{" "}
                <a
                  href="/login"
                  className="font-medium text-pink-600 hover:text-pink-500"
                >
                  login to your account
                </a>
              </p>
            </div>
            <form className="mt-8 space-y-8">
              <input type="hidden" name="remember" defaultValue="true" />
              <div className="rounded-md shadow-sm space-y-4">
                <div>
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    // autoComplete='email'
                    value={email}
                    onChange={(event) => {
                      setEmail(() => event.target.value);
                      console.log("EVENT", event.target.value);
                    }}
                    required
                    className="dark:bg-gray-900 dark:text-gray-200 dark:border-gray-800 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Email address"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={(event) => {
                      setPassword(() => event.target.value);
                      console.log("EVENT", event.target.value);
                    }}
                    autoComplete="current-password"
                    required
                    className="dark:bg-gray-900 dark:text-gray-200 dark:border-gray-800 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Password"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-900 dark:text-gray-100"
                  >
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a
                    href="#"
                    className="font-medium text-pink-600 hover:text-pink-500"
                  >
                    Forgot your password?
                  </a>
                </div>
              </div>

              <div>
                <button
                  onClick={(event) => {
                    event.preventDefault();

                    console.log({ password });
                    useSignupMutation.mutate({
                      username: email,
                      password,
                      email,
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
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }

  if (viewType === RegistrationViewTypes.confirmRegister) {
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
              {/* <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-300">
                Or{" "}
                <a
                  href="/login"
                  className="font-medium text-pink-600 hover:text-pink-500"
                >
                  login to your account
                </a>
              </p> */}
            </div>
            <form className="mt-8 space-y-8">
              <input type="hidden" name="remember" defaultValue="true" />
              <div className="rounded-md shadow-sm space-y-4">
                <div>
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    // autoComplete='email'
                    value={email}
                    onChange={(event) => {
                      setEmail(() => event.target.value);
                      console.log("EVENT", event.target.value);
                    }}
                    required
                    className="dark:bg-gray-900 dark:text-gray-200 dark:border-gray-800 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
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
                    type="password"
                    value={code}
                    onChange={(event) => {
                      setCode(() => event.target.value);
                      console.log("EVENT", event.target.value);
                    }}
                    autoComplete="current-password"
                    required
                    className="dark:bg-gray-900 dark:text-gray-200 dark:border-gray-800 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Password"
                  />
                </div>
              </div>

              {/* <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-900 dark:text-gray-100"
                  >
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a
                    href="#"
                    className="font-medium text-pink-600 hover:text-pink-500"
                  >
                    Forgot your password?
                  </a>
                </div>
              </div> */}

              <div>
                <button
                  onClick={(event) => {
                    event.preventDefault();

                    console.log({ password });

                    useConfirmSignUpMutation.mutate({
                      username: email,
                      code,
                    });

                    // useSignupMutation.mutate({
                    //   username: email,
                    //   password,
                    //   email,
                    // });
                  }}
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <LockClosedIcon
                      className="h-5 w-5 text-pink-500 group-hover:text-pink-400"
                      aria-hidden="true"
                    />
                  </span>
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }

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
                    value={email}
                    onChange={(event) => {
                      setEmail(() => event.target.value);
                      // console.log("EVENT", event.target.value);
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

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-900 dark:text-gray-100"
                  >
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a
                    href="#"
                    className="font-medium text-pink-600 hover:text-pink-500"
                  >
                    Forgot your password?
                  </a>
                </div>
              </div>

              <div>
                <button
                  onClick={(event) => {
                    event.preventDefault();
                    useConfirmSignUpMutation.mutate({
                      username: email,
                      code,
                    });
                    // onSubmit({
                    //   username,
                    //   password,
                    // });
                  }}
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <LockClosedIcon
                      className="h-5 w-5 text-pink-500 group-hover:text-pink-400"
                      aria-hidden="true"
                    />
                  </span>
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }

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
              Register
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-300">
              Or{" "}
              <a
                href="/login"
                className="font-medium text-pink-600 hover:text-pink-500"
              >
                login to your account
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
                  value={email}
                  onChange={(event) => {
                    setEmail(() => event.target.value);
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
                  useSignupMutation.mutate({
                    email,
                    password,
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
                Sign Up
              </button>
            </div>
          </form>

          {error ? (
            <input
              onChange={(event) => {
                // setAnswer(() => event.target.value as any);
              }}
              value={error}
              placeholder="Your answer"
              className={`animate-slidein text-center mb-4 w-full focus:outline-0 dark:bg-[#0f1117] p-2 dark:text-gray-300 ${
                error
                  ? `border-[1px] error dark:hover:border-pink-600 hover:border-red-600 border-red-600`
                  : "border-0 border-none"
              }`}
            />
          ) : null}
        </div>
      </div>
    </>
  );
}
