import "dotenv/config";

import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["dev", "prod", "test"]).default("dev"),
  PORT: z.coerce.number().positive().int().default(3333),
});

const _env = envSchema.safeParse(process.env);
if (_env.success === false) {
  console.error("There is an error on the follow Env Variable: ", _env.error.format());
  throw new Error("There is an error on the Env Variables! Please, double check the .env.example file!");
};

const env = _env.data;

export default env;