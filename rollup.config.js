import resolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';

export default [
  {
    input: './index.ts',
    plugins: [
      typescript({
        tsconfigDefaults: {
          compilerOptions: {
            declaration: true,
          },
        },
      }),
    ],
    output: {
      file: './index.js',
      format: 'cjs'
    },
    external: ['path-to-regexp']
  },
  {
    input: './index.ts',
    plugins: [
      resolve(),
      typescript(),
    ],
    output: {
      file: './index.iife.js',
      format: 'iife',
      name: 'ReiTinTin'
    }
  }
];
