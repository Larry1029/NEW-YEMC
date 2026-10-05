import server from "../../build/server/index.js";

export async function handler(event, context) {
  const lambdaHandler = await server;
  return lambdaHandler(event, context);
}
