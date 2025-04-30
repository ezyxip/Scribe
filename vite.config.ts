import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import dotenv from 'dotenv';


dotenv.config({ path: '.env.test' });

export default defineConfig({
  plugins: [reactRouter(), tsconfigPaths()],
  test: {
    setupFiles: './setupTests.ts',
  },
});
