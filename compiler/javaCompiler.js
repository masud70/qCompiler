const Compiler = require("./Compiler");
const { spawnSync } = require("node:child_process");

class JavaCompiler extends Compiler {
	constructor({ code, input, cmd, executionCmd, timeout }) {
		super({
			name: "JAVA",
			cmd: cmd ?? "javac",
			sourceCode: code,
			timeout: timeout,
			programInput: input,
			executionCmd: executionCmd ?? "java",
			sourceFileExtention: "/Main.java",
			outputFileExtention: "/Main.class",
		});
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
				"-d",
				`${this.tempPath}/${this.tempFileName}`,
			]);
			// child -> gcc ./temp/GCC_123456789/Main.java -o temp/GCC_123456789/Main.class

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
			const outputFilePath = `./${this.tempPath}/${this.tempFileName}`;
			const runProcess = spawnSync(
				this.executionCmd,
				["-cp", outputFilePath, "Main"],
				{
					input: this.programInput,
					timeout: this.timeout,
				}
			);
			// child -> temp/abc.class [runs first]
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

module.exports = { JavaCompiler };
