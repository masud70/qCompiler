const FCompiler = require("../compiler/FCompiler");
const { GccCompiler } = require("../compiler/GccCompiler");

const compileC = async (standard, code, input) => {
    const compiler = new FCompiler(GccCompiler, {standard, code, input});

    return await compiler.buildAndRun()
}

module.exports = { compileC }