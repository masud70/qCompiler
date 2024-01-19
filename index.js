const { compileC } = require("./default/cModule");
const { compileCpp } = require("./default/cppModule");
const { compileJava } = require("./default/javaModule");
const { compilePython } = require("./default/pyModule");

module.exports = {
	// Compile C code
	// defaults:
	// 		standard -> C11
	// 		cmd -> gcc
	// 		timeout -> 1000 ms
	compileC: async ({ standard, code, input, cmd, timeout }) => {
		return await compileC({ standard, code, input, cmd, timeout });
	},

	// Compile CPP code
	// defaults:
	// 		standard -> C++17
	// 		cmd -> g++
	// 		timeout -> 1000 ms
	compileCPP: async ({ standard, code, input, cmd, timeout }) => {
		return await compileCpp({ standard, code, input, cmd, timeout });
	},

	// Compile JAVA code
	// defaults:
	// 		cmd -> javac
	// 		executionCmd -> java
	// 		timeout -> 1000 ms
	compileJava: async ({ code, input, cmd, exectionCmd, timeout }) => {
		return await compileJava({ code, input, cmd, exectionCmd, timeout });
	},

	// Compile PYTHON code
	// defaults:
	// 		cmd -> python
	// 		timeout -> 1000 ms
	compilePython: async ({ code, input, cmd, timeout }) => {
		return await compilePython({ code, input, cmd, timeout });
	},
};
