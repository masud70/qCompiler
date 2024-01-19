const CompilerFactory = require("../compiler/CompilerFactory");
const { PythonCompiler } = require("../compiler/pythonCompiler");

const compilePython = async ({ code, input, cmd, timeout }) => {
	const compiler = new CompilerFactory(PythonCompiler, {
		code,
		input,
		cmd,
		timeout,
	});

	return await compiler.runAndClean();
};

module.exports = { compilePython };
