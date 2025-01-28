import { envSchema } from "@/types/envSchema";

const { success, error, data } = envSchema.safeParse(import.meta.env);

if (!success) {
  console.error("Invalid environment variables:", error?.format());
  throw new Error("Invalid environment variables");
}

export const { VITE_GRAPHQL_API_URL, VITE_GRAPHQL_API_TOKEN } = data;
