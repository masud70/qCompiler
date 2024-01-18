const { compileCpp } = require('../default/cppModule')
const { gnuCppStandards } = require('../compiler/GppCompiler')
const fs = require('fs-extra')
const path = require('path')

const testCode = async (srcDir, srcFilename) => {
    const codePath = path.join(__dirname, `./${srcDir}/${srcFilename}`)
    
    console.debug('Testing file:', codePath);
    const codeBuffer = fs.readFileSync(codePath, { encoding: 'utf8' })
    
    const code = codeBuffer.toString()
    const progOut = await compileCpp(gnuCppStandards.Cpp2a, code, "5 100")

    console.debug('Status:', progOut.status)
    console.debug('Compiler/Program output:', progOut.output)
    console.debug()
}

const main = async () => {
    // Dynamically load code instead of this hardcoded shite
    const sourceCodes = [
        'correct_program_test.cpp',
        'runtime_error_test.cpp',
        'syntax_error_test.cpp',
    ]

    const srcDir = 'cpp'
    
    for(var idx in sourceCodes) {
        const src = sourceCodes[idx]
        await testCode(srcDir, src)
    }
}

main()