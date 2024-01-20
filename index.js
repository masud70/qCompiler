const { compileC } = require("./default/cModule");
const { compileCpp } = require("./default/cppModule");
const { compileJava } = require("./default/javaModule");
const { compilePython } = require("./default/pyModule");

module.exports = class qCompiler {
	constructor({ standard, cmd, exectionCmd, timeout }) {
		this.cmd = cmd;
		this.timeout = timeout;
		this.standard = standard;
		this.exectionCmd = exectionCmd;
	}

	// Compile C code
	// defaults:
	// 		standard -> C11
	// 		cmd -> gcc
	// 		timeout -> 1000 ms
	async compileC(code, input) {
		return await compileC({
			code: code,
			input: input,
			cmd: this.cmd,
			timeout: this.timeout,
			standard: this.standard,
		});
	}

	// Compile CPP code
	// defaults:
	// 		standard -> C++17
	// 		cmd -> g++
	// 		timeout -> 1000 ms
	async compileCpp(code, input) {
		return await compileCpp({
			code: code,
			input: input,
			cmd: this.cmd,
			timeout: this.timeout,
			standard: this.standard,
		});
	}

	// Compile JAVA code
	// defaults:
	// 		cmd -> javac
	// 		executionCmd -> java
	// 		timeout -> 1000 ms
	async compileJava(code, input) {
		return await compileJava({
			code: code,
			input: input,
			cmd: this.cmd,
			timeout: this.timeout,
			exectionCmd: this.exectionCmd,
		});
	}

	// Compile PYTHON code
	// defaults:
	// 		cmd -> python
	// 		timeout -> 1000 ms
	async compilePython(code, input) {
		return await compilePython({
			code: code,
			input: input,
			cmd: this.cmd,
			timeout: this.timeout,
		});
	}
};
