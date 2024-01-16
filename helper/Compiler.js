const PlatformInfo = require('./PlatformInfo')
const fs = require('fs-extra');

const assert = require('assert');
const ld = require('lodash');

module.exports = class Compiler {
    constructor(name, cmd, sourceCode, programInput, sourceFileExtention) {
        const pltInfo = new PlatformInfo()
        
        assert(pltInfo.isSupported, 'Unsupported platform.')

        assert(
            ld.isString(cmd) &&
            !ld.isEmpty(cmd),
            'Compiler > Assertion failed! Command name expected.'
        )

        assert(
            ld.isString(sourceCode) &&
            !ld.isEmpty(sourceCode),
            "Compiler > Assertion failed! Given source code has to be non-empty text."
        )

        assert(
            ld.isNil(programInput) || 
            ld.isString(programInput),
            'Compiler > Assertion failed! Given program input has to be string or empty(null).'
        )

        assert(
            ld.isString(sourceFileExtention) &&
            !ld.isEmpty(sourceFileExtention),
            "Compiler > Assertion failed! Source code file extension cannot be empty."
        )


        this.name = name;
        this.cmd = cmd;
        this.sourceCode = sourceCode;
        this.programInput = programInput ?? '';
        this.tempFileName = this.name.concat(`_${Date.now()}`);
        this.outputFileExtention = pltInfo.binayExtention
        this.sourceFileExtention = sourceFileExtention;
    }

    async compile(){
        throw new Error("Compiler > compile() > Unimplemented method.")
    }
    async run(){
        throw new Error("Compiler > compile() > Unimplemented method.")
    }
    async cleanup(){
        throw new Error("Compiler > compile() > Unimplemented method.")
    }

    async createSourceFile() {
        try {
			const path = "temp";
			const filePath = `${path}/${this.tempFileName}${this.sourceFileExtention}`
            
			await fs.ensureDir(path);
			await fs.outputFile(filePath, this.sourceCode);

			return {
				status: true,
				path: filePath,
			};
		} catch (error) {
			throw new Error(error);
		}
    }
}