const { GccCompiler } = require("../helper/GccCompiler");

const compileC = async (standard, code, input) => {
    const compiler = new GccCompiler(standard, code, input);
    await compiler.compile()

    const {status, output} = await compiler.run();
    await compiler.cleanup();

    return output
}

module.exports = { compileC }