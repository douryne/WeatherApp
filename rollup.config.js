import typescript from '@rollup/plugin-typescript';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import {terser} from "rollup-plugin-terser";
import css from "rollup-plugin-import-css";
import replace from '@rollup/plugin-replace';
import dotenv from 'dotenv';

dotenv.config();

const watch = process.env.ROLLUP_WATCH

console.log("---------------------------" + process.env.PORT + "---------------------------------------")

export default {
  input: 'client/app.ts',
  output: {
    file: './public/dist/app.js',
    format: 'cjs'
  },
  plugins: [
    replace({
      'process.env.PORT': JSON.stringify(process.env.PORT),
      'process.env.WEATHER_OPEN_API_KEY': JSON.stringify(process.env.WEATHER_OPEN_API_KEY),
    }),
    typescript(),
    !watch && terser(),
    css({
      output: './public/dist/main.css',
      minify: !watch
    }),
    watch && serve({
      open: true,
      contentBase: 'public',
      host: 'localhost',
      port: '8080'
    }),
    watch && livereload(),
  ]
};
