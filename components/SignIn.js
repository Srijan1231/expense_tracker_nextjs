import { authContext } from "@/lib/store/auth-context";
import React, { useContext } from "react";
import { FcGoogle } from "react-icons/fc";
export const SignIn = () => {
  const { googleLoginHandler } = useContext(authContext);
  return (
    <div className="flex h-screen w-screen items-center overflow-hidden px-2">
      <div className="relative flex  w-96 flex-col space-y-5 rounded-lg border bg-white px-5 py-10 shadow-xl sm:mx-auto">
        <div className="flex flex-col items-center">
          <div className="mx-auto mb-2 space-y-3">
            <h1 className="text-center text-3xl font-bold text-gray-700">
              Sign in
            </h1>
            <p className="text-gray-500">Sign in to access your account</p>
          </div>

          <div className="flex w-full items-center">
            <button
              className="shrink-0 inline-block w-36 rounded-lg py-3 font-bold btn-primary"
              onClick={googleLoginHandler}
            >
              <div className="flex  flex-col items-center">
                <FcGoogle />
                <span>Sign In With Google</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
