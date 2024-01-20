const Compiler = require("./Compiler");
const { spawnSync } = require("node:child_process");
const { performance } = require("node:perf_hooks");

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

			const startTime = performance.now();
			const runProcess = spawnSync(outputFilePath, {
				input: this.programInput,
				timeout: this.timeout,
			});
			const endTime = performance.now();
			// child -> temp/abc.out [runs first]
			// secondly paste input string

			// Save execution time
			this.executionTime = Math.round(endTime - startTime);

			//await fs.remove(outputFilePath);

			if (runProcess.status !== 0) {
				throw new Error(
					runProcess.stderr.length
						? runProcess.stderr.toString()
						: "Process terminated with an error."
				);
			} else {
				return {
					status: true,
					output: runProcess.stdout.toString(),
					executionTime: this.executionTime,
				};
			}
		} catch (error) {
			throw new Error(error);
		}
	}
}

module.exports = { CppCompiler, gnuCppStandards };
