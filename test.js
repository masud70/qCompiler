
const fs = require('fs')
const path = require('path')
const { compileC } = require('./compiler/cModule')
const { gccCStandards } = require('./helper/GccCompiler')

const main = async () => {
    const code = 
    `
    #include <stdio.h>

    int main() {
        int a, b, c;
        scanf("%d%d%d", &a, &b, &c);
        printf("%d", a + b + c);
        return 0;
    }
    `

    const output = await compileC(gccCStandards.C17, code, "1 2 3")

    console.log(output)
}

main()