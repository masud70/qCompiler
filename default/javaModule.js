const CompilerFactory = require("../compiler/CompilerFactory");
const { JavaCompiler } = require("../compiler/javaCompiler");

const compileJava = async ({ code, input, cmd, executionCmd, timeout }) => {
	const compiler = new CompilerFactory(JavaCompiler, {
		code,
		input,
		cmd,
		executionCmd,
		timeout,
	});

	return await compiler.buildRunAndClean();
};

module.exports = { compileJava };
