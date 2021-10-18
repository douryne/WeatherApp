import typescript from '@rollup/plugin-typescript';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import {terser} from "rollup-plugin-terser";
import css from "rollup-plugin-import-css";

const watch = process.env.ROLLUP_WATCH

export default {
  input: 'src/app.ts',
  output: {
    file: 'dist/app.js',
    format: 'cjs'
  },
  plugins: [
    typescript(),
    !watch && terser(),
    css({
      output: './dist/main.css',
      minify: watch
    }),
    watch && serve({
      open: true,
      contentBase: ['public', 'dist'],
      host: 'localhost',
      port: '8080'
    }),
    watch && livereload(),
  ]
};