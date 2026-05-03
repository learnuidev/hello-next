import { Auth } from "aws-amplify";
import Chance from "chance";

export async function signUp({
  username,
  password,
  email,
  ...otherAttributes
}: any) {
  try {
    const { user } = await Auth.signUp({
      username,
      password,
      attributes: {
        email, // optional
        // phone_number: phoneNumber, // optional - E.164 number convention
        // // other custom attributes
        ...otherAttributes,
      },
    });

    return user;
  } catch (error) {
    throw error;
  }
}
export async function signUpPasswordLess({ email }: { email: string }) {
  try {
    const chance = new Chance();
    const password = chance.string({ length: 16 });
    const { user } = await Auth.signUp({
      username: email,
      password,
    });

    return user;
  } catch (error) {
    throw error;
  }
}

export async function signInPasswordLess({ email }: { email: string }) {
  try {
    const cognitoUser = await Auth.signIn(email);

    return cognitoUser;
  } catch (error: any) {
    alert(error?.message);
  }
}

export async function confirmSignUp({
  username,
  code,
}: {
  username: string;
  code: string;
}) {
  try {
    const resp = await Auth.confirmSignUp(username, code);
    return resp;
  } catch (error) {}
}

export async function confirmSignInPasswordless({
  authUser,
  code,
}: {
  authUser: string;
  code: string;
}) {
  // This will throw an error if it’s the 3rd wrong answer
  try {
    const challengeResult = await Auth.sendCustomChallengeAnswer(
      authUser,
      code,
    );

    return challengeResult;
  } catch (error) {
    alert("Too many failed attempts. Please try again.");
  }
}

function formatUser(user: any) {
  const { idToken } = user.getSignInUserSession();

  const formattedUser = {
    jwt: idToken.jwtToken,
  } as {
    jwt: string;
  };

  return formattedUser;
}

export async function signIn({
  username,
  password,
}: {
  username: string;
  password: string;
}) {
  try {
    const user = await Auth.signIn(username, password);
    return formatUser(user);
  } catch (error) {
    console.error("error signing in", error);
    throw error;
  }
}

export async function resendCode(username: string) {
  try {
    const resp = await Auth.resendSignUp(username);

    return resp;
  } catch (err) {
    console.error("error resending code: ", err);
  }
}

export async function signOut() {
  try {
    const resp = await Auth.signOut({ global: true });
    return resp;
  } catch (error) {
    console.error("error signing out: ", error);
  }
}

export async function currentAuthUser() {
  const user = await Auth.currentAuthenticatedUser();

  return formatUser(user);
}

const auth = {
  Auth,
};

export { auth };
