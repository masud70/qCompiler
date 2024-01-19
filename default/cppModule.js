const { CppCompiler } = require("../compiler/CppCompiler");
const CompilerFactory = require("../compiler/CompilerFactory");

const compileCpp = async ({ standard, code, input, cmd, timeout }) => {
	const compiler = new CompilerFactory(CppCompiler, {
		standard,
		code,
		input,
		cmd,
		timeout,
	});

	return await compiler.buildRunAndClean();
};

module.exports = { compileCpp };
