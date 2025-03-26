"use client";

// @ts-ignore
import datascript from "datascript";

function createConn(schema: any) {
  return datascript.create_conn(schema);
}

export function random_uuid() {
  return crypto.randomUUID();
}
