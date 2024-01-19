const Compiler = require("./Compiler");
const { spawnSync } = require("node:child_process");

// Todo: Add support for newer or older standards here
const gnuCppStandards = {
	Cpp2a: "c++2a",
	Cpp17: "c++17",
	Cpp14: "c++14",
};

class CppCompiler extends Compiler {
	constructor({ standard, code, input, cmd, timeout }) {
		super({
			name: "G++",
			cmd: cmd ?? "g++",
			sourceCode: code,
			timeout: timeout,
			programInput: input,
			sourceFileExtention: ".cpp",
		});
		this.standard = gnuCppStandards[standard] ?? gnuCppStandards.Cpp17;
	}

	// Override
	async compile() {
		try {
			// Create a temporary source file
			const fd = await this.createSourceFile();
			const filePath = fd.path;

			// Compile the C file using gcc
			// fork() -> spawnSync()
			// exec(cmd, args[]) -> spawnSync(cmd, [])
			const compileProcess = spawnSync(this.cmd, [
				filePath,
				"-o",
				`${this.tempPath}/${this.tempFileName}${this.outputFileExtention}`,
				`-std=${this.standard}`,
			]);
			// child -> gcc ./temp/GCC_123456789.c -o temp/GCC_123456789.exe -std=c17

			if (compileProcess.error || compileProcess.stderr.length) {
				throw new Error(
					compileProcess.stderr + compileProcess.stderr.toString()
				);
			} else {
				return {
					status: true,
					output: "Compilation successful.",
				};
			}

			// remove the temporary source file
			// await fs.remove(filePath);
		} catch (error) {
			throw new Error(error);
		}
	}

	async run() {
		try {
			const outputFilePath = `${this.tempPath}/${this.tempFileName}${this.outputFileExtention}`;
			const runProcess = spawnSync(outputFilePath, {
				input: this.programInput,
				timeout: this.timeout,
			});
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
		} catch (error) {
			throw new Error(error);
		}
	}
}

module.exports = { CppCompiler, gnuCppStandards };
