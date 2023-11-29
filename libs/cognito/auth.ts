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
    console.log(`User signed up successfully`, user);
    return user;
  } catch (error) {
    console.log("error signing up:", error);
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
    console.log(`User signed up successfully`, user);
    return user;
  } catch (error) {
    console.log("error signing up:", error);
    throw error;
  }
}

// window.signUpPasswordLess = signUpPasswordLess;

export async function signInPasswordLess({ email }: { email: string }) {
  try {
    const cognitoUser = await Auth.signIn(email);
    console.log(cognitoUser);
    // window.authUser2 = cognitoUser;
    return cognitoUser;
  } catch (error: any) {
    alert(error?.message);
  }
}

// window.signIn2 = signInPasswordLess;

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
  } catch (error) {
    console.log("error confirming sign up", error);
  }
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
      code
    );
    console.log(challengeResult);
    return challengeResult;
  } catch (error) {
    alert("Too many failed attempts. Please try again.");
  }
}

// window.answerCustomChallenge = confirmSignInPasswordless;

function formatUser(user: any) {
  const { refreshToken, idToken } = user.getSignInUserSession();

  const formattedUser = {
    ...user.attributes,
    refreshToken: refreshToken.getToken(),
    jwt: idToken.jwtToken,
    // jwtToken: accessToken.jwtToken,
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
  try {
    const user = await Auth.currentAuthenticatedUser();

    // window.authUser = user;

    return formatUser(user);
  } catch (err) {
    throw err;
  }
}

// window.currentAuthUser = currentAuthUser;

const auth = {
  Auth,
};

export { auth };
