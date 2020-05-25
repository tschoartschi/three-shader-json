const path = require('path');
const fs = require('fs-extra');

const shaders = {};

export const glslJson = () => {

    return {

        transform(code, id) {

            if (/\.glsl.js$/.test(id) === false) return;

            const key = path.parse(path.basename(id)).name.replace('.glsl', '');
            const transformedCode = `export default _rsl.${key};`; // can not use array because examples etc rely on key names
            const codeString = code.replace(/\/\* glsl \*\/\`((.*|\n|\r\n)*)\`/, (match, p1) => {
                // had to remove JSON.stringify here (which is what Three.js does), the rest is identically to Three.js
                return p1
                    .trim()
                    .replace(/\r/g, '')
                    .replace(/[ \t]*\/\/.*\n/g, '') // remove //
                    .replace(/[ \t]*\/\*[\s\S]*?\*\//g, '') // remove /* */
                    .replace(/\n{2,}/g, '\n') // # \n+ to \n
            });

            shaders[key] = codeString.replace('export default', '').replace(/;[\r\n]+$/, '').trim().replace(/^"/, '').replace(/"$/, '');

            return {
                code: transformedCode,
                map: {mappings: ''}
            };

        },

        generateBundle() {
            console.log('Three.js generateBundle and create shaders.json');
            const distPath = path.join(__dirname, 'dist');
            console.log(distPath);
            fs.ensureDirSync(distPath);
            let content = JSON.stringify(shaders);
            fs.writeFileSync(path.join(distPath, 'shaders.json'), content);
        }

    };

};
