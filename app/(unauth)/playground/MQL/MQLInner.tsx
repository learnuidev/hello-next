import React, { useState, useContext } from "react";
import ConnContext from "./db/ConnContext";
// @ts-ignore
import datascript from "datascript";
import useBind from "./db/useBind";
import { random_uuid } from "./db/utils";

// ===== RULES ======

// ====== QUERIES ======

// ====== UI ======
const ui_query = `
  [:find ?uid .
   :where
   [?uid "ui/id"]
  ]
`;

const ui_query_2 = `
  [:find (pull ?uid [* {"ui/auth-user" [*]}]) .
   :where
   [?uid "ui/id"]
  ]
`;

// ====== AUTH ======
const authUserQuery = `
   [:find (pull ?user ["user/email"]) .
    :where
    [?ui "ui/auth-user" ?user]
   ]
  `;

// ====== USERS ======
const usersQuery = `
  [:find [(pull ?user ["user/email" "user/name"]) ...]
   :where [?user "user/name"]
  ]
`;

const userQuery = `
  [:find ?name .
   :in $ ?email-or-id
   :where
    (or 
      [?u "user/email" ?email-or-id]
      [?u "user/id"    ?email-or-id])
    [?u "user/name"  ?name]
  ]`;

const userNamesQuery = `
  [:find [?user ...]
   :where
   [?u "user/name" ?user]]
`;

// ====== TWEETS ======
const tweetsQuery = `
  [:find [(pull ?tweet [* {"tweet/author" [*]}]) ...]
  :where
  [?tweet "tweet/title"]
  ]
`;

const tweetQuery = `
  [:find (pull ?tweet [* {"tweet/author" [*]}]) .
  :in $ ?tid
  :where
  [?tweet "tweet/id" ?tid]
  [?tweet "tweet/title"]
  ]
`;
const tweetIdsQuery = `
  [:find [?tid ...]
   :where [?tweet "tweet/id" ?tid]]
`;

const tweetLikesCountQuery = ` 
  [:find (count ?user) .
   :in $ ?tweet-id
   :where
   [?tweet "tweet/id" ?tweet-id]
   [?tweet "tweet/likes" ?user]
  ]
`;

const tweetRepliesCountQuery = ` 
  [:find (count ?user) .
   :in $ ?tweet-id
   :where
   [?tweet "tweet/id" ?tweet-id]
   [?tweet "tweet/replies" ?user]
  ]
`;

const tweetRetweetsCountQuery = ` 
  [:find (count ?user) .
   :in $ ?tweet-id
   :where
   [?tweet "tweet/id" ?tweet-id]
   [?tweet "tweet/retweets" ?user]
  ]
`;

function populate(conn: any) {
  const data = [
    {
      "user/name": "Jane Doe",
      "user/email": "jane.doe@gmail.com",
    },
  ];
  datascript.transact(conn, data);
}

function addTweet(
  event: any,
  tweet: any,
  updateTweet: any,
  authEmail: any,
  conn: any
) {
  event.preventDefault();
  console.log("tweet", tweet);
  // const ui = datascript.q(ui_query_2, datascript.db(conn));
  // const authEmail = ui["ui/auth-user"]["user/email"];
  console.log("UI", authEmail);

  // const newTweet = [[":db/add", uid, "ui/auth-user", ["user/email", email]]];
  const newTweet = [
    {
      "tweet/id": random_uuid(),
      "tweet/title": tweet,
      "tweet/author": ["user/email", authEmail],
    },
  ];
  datascript.transact(conn, newTweet);
  updateTweet("");
}

function TweetInput() {
  const conn = useContext(ConnContext);
  const authUser = useBind(conn, authUserQuery);
  const userAvatar = authUser["user/avatar"];
  const userEmail = authUser["user/email"];

  const initState = "";
  const [tweetInput, updateTweet] = useState(initState);

  const handleChange = (event: any) => updateTweet(event.target.value);

  return (
    <div>
      <form
        onSubmit={(event) =>
          addTweet(event, tweetInput, updateTweet, userEmail, conn)
        }
      >
        <input
          value={tweetInput}
          placeholder="Whats happening?"
          onChange={handleChange}
        />
        <button type="submit"> Tweet</button>
      </form>
    </div>
  );
}

function Tweets() {
  const conn = useContext(ConnContext);

  const tweets = useBind(conn, tweetsQuery);

  const tweetIds = useBind(conn, tweetIdsQuery);

  console.log("tweets", tweets);

  return (
    <div className="space-y-16">
      <div className="mb-16">
        <TweetInput />
      </div>
      <code>
        <pre>{JSON.stringify(tweetIds, null, 2)}</pre>
      </code>
    </div>
  );
}

function changeAuthUser(email: any, conn: any) {
  console.log("email", email);

  const uid = datascript.q(ui_query, datascript.db(conn));
  console.log("uid", uid);
  const authUser = [[":db/add", uid, "ui/auth-user", ["user/email", email]]];
  datascript.transact(conn, authUser);
}

function NavBar() {
  const conn = useContext(ConnContext);
  const authUser = useBind(conn, authUserQuery);
  const users = useBind(conn, usersQuery);

  console.log("Auth user", users);
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <p>Auth User: {authUser["user/email"]}</p>
      <select
        value={authUser["user/email"]}
        onChange={(event) => changeAuthUser(event.target.value, conn)}
      >
        {users.map((user: any) => {
          return (
            <option key={user["user/email"]} value={user["user/email"]}>
              {user["user/name"]}
            </option>
          );
        })}
      </select>
    </nav>
  );
}

export function MQLInner() {
  const [state, updateState] = useState(null);
  const conn = useContext(ConnContext);

  const [queryStr, setQueryStr] = useState(`  [:find [?tid ...]
  :where [?tweet "tweet/id" ?tid]]`);

  const handleSearch = () => {
    const queryArgs = [queryStr, datascript.db(conn)];
    const resp = datascript.q(...queryArgs);
    updateState(resp);
  };
  return (
    <div className="mx-8 mt-16">
      {/* <div className="mx-8 space-y-8">
        <NavBar />
        <Tweets />
      </div> */}

      <div className="my-8">
        <h1 className="text-2xl font-bold"> MQL</h1>
        <h2 className="text-gray-500"> Query Language for Mandarino</h2>
      </div>

      <div>
        <textarea
          className="w-full min-h-[200px]"
          placeholder={""}
          value={queryStr}
          onChange={(event) => {
            setQueryStr(event.target.value);
          }}
        />

        <button onClick={handleSearch}> Search </button>

        <div>
          <code>
            <pre>{JSON.stringify(state, null, 2)}</pre>
          </code>
        </div>
      </div>
    </div>
  );
}
