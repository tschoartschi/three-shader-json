export const glsl = () => {

    return {

        transform(code, id) {

            if (/\.glsl.js$/.test(id) === false) return;

            code = code.replace(/\/\* glsl \*\/\`((.*|\n|\r\n)*)\`/, function (match, p1) {

                return JSON.stringify(
                    p1
                        .trim()
                        .replace(/\r/g, '')
                        .replace(/[ \t]*\/\/.*\n/g, '') // remove //
                        .replace(/[ \t]*\/\*[\s\S]*?\*\//g, '') // remove /* */
                        .replace(/\n{2,}/g, '\n') // # \n+ to \n
                );

            });

            return {
                code: code,
                map: {mappings: ''}
            };

        }

    };

};