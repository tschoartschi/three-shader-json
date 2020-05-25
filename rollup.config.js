import resolve from '@rollup/plugin-node-resolve';
import visualizer from 'rollup-plugin-visualizer';
import {glconstants} from './build/rollup-plugin-glconstants';
import {glsl} from './build/rollup-plugin-glsl';
import {glslJson} from './build/rollup-plugin-glsl-json';
import {terser} from 'rollup-plugin-terser';
const getBuild = (isJson, minify) => {
    const suffix = (isJson ? 'json' : 'regular') + (minify ? '.min' : '');
    const build = {
        input: 'src/index.js',
        plugins: [
            glconstants(),
            isJson ? glslJson() : glsl(),
            resolve(),
            visualizer({open: false, filename: 'dist/stats-' + suffix + '.html'})
        ],
        output: [
            {
                format: 'esm',
                file: 'dist/bundle-' + suffix + '.js',
                sourcemap: true
            }
        ]
    };
    if (minify) {
        build.plugins.push(terser());
    }
    return build;
};

export default [
    getBuild(false, false),
    getBuild(false, true),
    getBuild(true, false),
    getBuild(true, true),
];