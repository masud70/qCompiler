const CompilerFactory = require("../compiler/CompilerFactory");
const { GccCompiler } = require("../compiler/GccCompiler");

const compileC = async ({ standard, code, input, cmd, timeout }) => {
	const compiler = new CompilerFactory(GccCompiler, {
		standard,
		code,
		input,
		cmd,
		timeout,
	});

	return await compiler.buildRunAndClean();
};

module.exports = { compileC };
