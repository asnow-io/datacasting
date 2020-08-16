import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "rollup-plugin-babel";
import bundleSize from "rollup-plugin-bundle-size";
import { eslint } from "rollup-plugin-eslint";
import { terser } from "rollup-plugin-terser";
import pkg from "./package.json";

const isDev = process.env.NODE_ENV === "development";

const config = {
  input: "src/index.js",
  output: [
    {
      file: pkg.browser,
      name: "Datacasting",
      format: "umd",
    },
    {
      file: pkg.main,
      format: "cjs",
    },
    {
      file: pkg.module,
      format: "es",
    },
  ],
  plugins: [
    resolve({
      jsnext: true,
      main: true,
      browser: true,
    }),
    eslint({
      exclude: ["node_modules"],
    }),
    babel({
      runtimeHelpers: true,
      extensions: [".js"],
    }),
    commonjs(),
    bundleSize(),
  ],
  external: ["date-fns"],
};

if (!isDev) {
  config.plugins.push(terser());
}

export default config
