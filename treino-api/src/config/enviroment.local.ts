export const localEnviroment = {
  frontendUrl: "http://localhost:4200",
  jwtSecret: process.env.JWT_SECRET,
  port: 3000,
  db: {
    host: "host.docker.internal",
    port: 4200,
    user: "ramondino",
    password: "chrisBumbstead",
    name: "treino-legal",
  },
};
