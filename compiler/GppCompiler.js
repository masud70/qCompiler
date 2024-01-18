const Compiler = require("./Compiler");
const { spawnSync } = require("node:child_process");
const fs = require("fs-extra");

// Todo: Add support for newer or older standards here
const gnuCppStandards = {
    Cpp2a: 'c++2a',
    Cpp17: 'c++17',
    Cpp14: 'c++14',
}

class GppCompiler extends Compiler {
    constructor({standard, code, input}) {
        super('G++', 'g++', code, input, '.cpp')
        this.standard = gnuCppStandards[standard] ?? gnuCppStandards.Cpp2a;
    }

    // Override
    async compile() {
        // Create a temporary source file
        const fd = await this.createSourceFile();
        const filePath = fd.path
        
        // Compile the C file using gcc
        // fork() -> spawnSync()
        // exec(cmd, args[]) -> spawnSync(cmd, [])
        const compileProcess = spawnSync(this.cmd, [
            filePath,
            "-o",
            `temp/${this.tempFileName}${this.outputFileExtention}`,
            `-std=${this.standard}`
        ]);
        // child -> gcc ./temp/GCC_123456789.c -o temp/GCC_123456789.out -std=c17

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
        // child -> temp/abc.out [runs first]
        // secondly paste input string

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

module.exports = {GppCompiler, gnuCppStandards}