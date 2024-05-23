// @ts-ignore
import datascript from "datascript";
import ConnContext from "./db/ConnContext";
import { populate } from "./db/mock";
import schema from "./db/schema";
import { MQLInner } from "./MQLInner";

/*Create a connection to a new db instance using the schema*/
const conn = datascript.create_conn(schema);
populate(conn);

export const MQL = () => {
  return (
    <div>
      <ConnContext.Provider value={conn}>
        <MQLInner />
      </ConnContext.Provider>
    </div>
  );
};
