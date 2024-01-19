const assert = require("assert");

const buildFlags = {
	CTE: "Compilation error",
	RTE: "Runtime error",
	CLE: "Cleanup error",
	OK: "OK",
};

// Factory builder for compiled languages
// as they share a common build and run steps
class CompilerFactory {
	constructor(CompilerType, options) {
		// TODO: Safety assertions here
		this.compiler = new CompilerType(options);
	}

	async buildRunAndClean() {
		const progOut = await this.buildAndRun();
		try {
			await this.compiler.cleanup();
		} catch (error) {
			return {
				status: buildFlags.CLE,
				error: error.message,
			};
		}
		return progOut;
	}

	async runAndClean() {
		const progOutput = await this.runProgram();
		try {
			await this.compiler.cleanup();
		} catch (error) {
			return {
				status: buildFlags.CLE,
				error: error.message,
			};
		}
		return progOutput;
	}

	async buildAndRun() {
		try {
			await this.compiler.compile();
		} catch (compilationError) {
			return {
				status: buildFlags.CTE,
				error: compilationError.message,
			};
		}

		return this.runProgram();
	}

	async runProgram() {
		try {
			const progOutput = await this.compiler.run();
			return {
				status: buildFlags.OK,
				output: progOutput.output,
			};
		} catch (runtimeError) {
			return {
				status: buildFlags.RTE,
				error: runtimeError.message,
			};
		}
	}
}

module.exports = CompilerFactory;
