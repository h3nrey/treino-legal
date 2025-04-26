import { localEnviroment } from "./enviroment.local";
import { prodEnviroment } from "./enviroment.prod";

let envFile = process.env.NODE_ENV ?? "local";

export const enviroment =
  envFile === "production" ? prodEnviroment : localEnviroment;
