const assert = require('assert');

const buildFlags = {
    CTE: 'Compilation error',
    RTE: 'Runtime error',
    OK: 'OK',
}

// Factory builder for compiled languages 
// as they share a common build and run steps
class CompilerFactory {
    constructor(CompilerType, options) {
        // TODO: Safety assertions here
        this.compiler = new CompilerType(options)
    }

    async buildAndClean() {
        var progOut = await this.buildAndRun()

        try {
            await this.compiler.cleanup()
        } catch(cleanupError) {
            console.debug(`Cleanup error!\n${cleanupError.message}`)
        }

        return progOut
    }

    async buildAndRun() {
        try {
            await this.compiler.compile()
        }
        catch(compilationError) {
            return {
                status: buildFlags.CTE,
                output: compilationError.message
            }
        }
        
        try {
            const progOutput = await this.compiler.run()
            return {
                status: buildFlags.OK,
                output: progOutput.output
            }
        } catch(runtimeError) {
            return {
                status: buildFlags.RTE, 
                output: runtimeError.message
            }
        }
    }
}

module.exports = CompilerFactory