const Compiler = require("./Compiler");
const { spawnSync } = require("node:child_process");
const fs = require("fs-extra");

// gcc C standards
const gccCStandards = {
    C17: 'c17',
    C11: 'c11',
    C99: 'c99',
}

class GccCompiler extends Compiler {
    constructor(standard, sourceCode, programInput) {
        super('GCC', 'gcc', sourceCode, programInput, '.c');
        this.standard = gccCStandards[this.standard] ?? gccCStandards.C17;
    }

    // Override
    async compile() {
        // Create a temporary source file
        const fd = await this.createSourceFile();
        const filePath = fd.path
        
        // Compile the C file using gcc
        const compileProcess = spawnSync(this.cmd, [
            filePath,
            "-o",
            `temp/${this.tempFileName}${this.outputFileExtention}`,
            `-std=${this.standard}`
        ]);

        if (compileProcess.error || compileProcess.stderr.length) {
            throw new Error(compileProcess.stderr + compileProcess.stderr.toString());
        }
        
        // remove the temporary source file
        //await fs.remove(filePath);
    }

    async run() {
        const outputFilePath = `temp/${this.tempFileName}${this.outputFileExtention}`
        const runProcess = spawnSync(
            outputFilePath,
            { input: this.programInput }
        );

        //await fs.remove(outputFilePath);

        if (runProcess.error || runProcess.stderr.length) {
            throw new Error(runProcess.stderr + runProcess.error);
        } else {
            return {
                status: true,
                output: runProcess.stdout.toString(),
            };
        }
    }

    async cleanup() {
        const outputFilePath = `temp/${this.tempFileName}${this.outputFileExtention}`
        const inputFilePath = `temp/${this.tempFileName}${this.sourceFileExtention}`

        await fs.remove(inputFilePath);
        await fs.remove(outputFilePath);
    }
}

module.exports = {GccCompiler, gccCStandards};