import { useEffect, useState } from "react";
// @ts-ignore
import datascript from "datascript";
// @ts-ignore
import deepEqual from "deep-equal";

function useBind(conn: any, query: any, ...args: any) {
  const queryArgs = [query, datascript.db(conn), ...args];
  const [state, updateState] = useState(() => datascript.q(...queryArgs));

  const id = crypto.randomUUID();

  useEffect(() => {
    datascript.listen(conn, id, function (data: any) {
      if (data.tx_data.length) {
        const updatedQueryArgs = [query, data.db_after, ...args];
        const updatedState = datascript.q(...updatedQueryArgs);

        if (!deepEqual(state, updatedState)) {
          updateState(updatedState);
        }
      }
    });
    return () => {
      return datascript.unlisten(conn);
    };
  }, [conn, query, args, id, state]);

  return state;
}

export default useBind;
