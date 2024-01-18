const { GppCompiler } = require("../compiler/GppCompiler");
const FCompiler = require("../compiler/CompilerFactory");

const compileCpp = async (standard, code, input) => {
	const compiler = new FCompiler(GppCompiler, {standard, code, input});

    return await compiler.buildAndClean()
}

module.exports = { compileCpp }
