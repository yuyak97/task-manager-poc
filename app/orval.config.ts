import { defineConfig } from "orval";

export default defineConfig({
  backend: {
    input: "./openapi.yaml",
    output: {
      workspace: "./src/api/generated",
      target: "./api.ts",
      schemas: "./model",
      mode: "tags",
      tsconfig: "tsconfig.json",
      prettier: true,
      clean: true,

      override: {
        mutator: {
          path: "../orval-axios-instance.ts",
          name: "orvalAxiosInstance",
        },

        query: {
          useQuery: true,
          options: {
            staleTime: 10000,
          },
          signal: true,
        },
      },
    },
  },
});
