import typescript from '@rollup/plugin-typescript';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import {terser} from "rollup-plugin-terser";
import css from "rollup-plugin-import-css";
import dotenv from "rollup-plugin-dotenv";

const watch = process.env.ROLLUP_WATCH

export default {
  input: 'client/app.ts',
  output: {
    file: './public/dist/app.js',
    format: 'cjs'
  },
  plugins: [
    typescript(),
    !watch && terser(),
    css({
      output: './public/dist/main.css',
      minify: !watch
    }),
    dotenv(),
    watch && serve({
      open: true,
      contentBase: 'public',
      host: 'localhost',
      port: '8080'
    }),
    watch && livereload(),
  ]
};