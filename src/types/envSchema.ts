import { z } from "zod";

export const envSchema = z.object({
  VITE_GRAPHQL_API_URL: z
    .string()
    .url()
    .default("https://syn-api-prod.herokuapp.com/graphql"),
  VITE_GRAPHQL_API_TOKEN: z.string().min(1),
});
