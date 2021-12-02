import typescript from '@rollup/plugin-typescript';
import livereload from 'rollup-plugin-livereload';
import {terser} from "rollup-plugin-terser";
import css from "rollup-plugin-import-css";

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
    watch && livereload(),
  ]
};
