import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src", "!src/**/*.stories.*"],
  outDir: "es",
  format: "esm",
  bundle: false,
  target: "esnext",
  dts: false,
  outExtension: () => {
    return {
      js: ".js"
    };
  },
  splitting: false,
  sourcemap: true,
  clean: true
});
