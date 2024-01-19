const { performance } = require("node:perf_hooks");
const Compiler = require("./Compiler");
const { spawnSync } = require("node:child_process");

class PythonCompiler extends Compiler {
	constructor({ code, input, cmd, timeout }) {
		super({
			name: "PYTHON",
			cmd: cmd ?? "python",
			sourceCode: code,
			timeout: timeout,
			programInput: input,
			sourceFileExtention: ".py",
		});
	}

	// Override
	async run() {
		try {
			// Create a temporary source file
			const fd = await this.createSourceFile();
			const filePath = fd.path;

			// Compile the Python file using python
			// fork() -> spawnSync()
			// exec(cmd, args[]) -> spawnSync(cmd, [])
			const startTime = performance.now();
			const runProcess = spawnSync(this.cmd, [filePath], {
				input: this.programInput,
				timeout: this.timeout,
			});
			const endTime = performance.now();

			// Save execution time
			this.executionTime = Math.round(endTime - startTime);

			if (runProcess.error || runProcess.stderr.length) {
				throw new Error(
					runProcess.stderr + runProcess.stderr.toString()
				);
			} else {
				return {
					status: true,
					output: runProcess.stdout.toString(),
					executionTime: this.executionTime,
				};
			}

			// remove the temporary source file
			// await fs.remove(filePath);
		} catch (error) {
			throw new Error(error.message);
		}
	}

	async compile() {
		return await this.run();
	}
}

module.exports = { PythonCompiler };
