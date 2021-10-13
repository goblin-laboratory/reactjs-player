// import resolve from '@rollup/plugin-node-resolve';
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { babel } from "@rollup/plugin-babel";
import external from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";
import url from "@rollup/plugin-url";
import svgr from "@svgr/rollup";
import filesize from "rollup-plugin-filesize";

import pkg from "../package.json";

export default {
  input: "src/index.js",
  output: [
    {
      file: pkg.browser,
      name: pkg.name,
      format: "umd",
      sourcemap: true,
      globals: {
        react: "React",
        "prop-types": "PropTypes",
        "numeral": "numeral",
        "antd": "antd",
        "@ant-design/icons": "@ant-design/icons",
        "react-swf": "ReactSWF",
        "fbemitter": "fbemitter",
      },
    },
  ],
  plugins: [
    external(),
    postcss({
      modules: true,
    }),
    url(),
    url({
      limit: 0,
      include: ["**/*.swf"],
      emitFiles: true,
      fileName: "[name][extname]",
    }),
    svgr(),
    babel({
      babelrc: false,
      exclude: "node_modules/**",
      babelHelpers: "bundled",
      presets: [
        [
          "@babel/preset-env",
          {
            modules: false,
          },
        ],
        "@babel/preset-react",
      ],
    }),
    nodeResolve(),
    commonjs(),
    filesize(),
  ],
};
