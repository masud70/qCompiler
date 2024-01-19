const PlatformInfo = require("../utils/PlatformInfo");
const fs = require("fs-extra");

const assert = require("assert");
const ld = require("lodash");

module.exports = class Compiler {
	constructor({
		name,
		cmd,
		timeout,
		sourceCode,
		programInput,
		executionCmd,
		sourceFileExtention,
		outputFileExtention,
	}) {
		const pltInfo = new PlatformInfo();

		assert(pltInfo.isSupported, "Unsupported platform.");

		assert(
			ld.isString(cmd) && !ld.isEmpty(cmd),
			"Compiler > Assertion failed! Command name expected."
		);

		assert(
			ld.isString(executionCmd) || ld.isNil(executionCmd),
			"Compiler > Assertion failed! Execution command name has to be string or empty(null)."
		);

		assert(
			ld.isString(sourceCode) && !ld.isEmpty(sourceCode),
			"Compiler > Assertion failed! Given source code has to be non-empty text."
		);

		assert(
			ld.isInteger(timeout) || ld.isNil(timeout),
			"Compiler > Assertion failed! Timeout has to be an integer or empty(null)."
		);

		assert(
			ld.isNil(programInput) || ld.isString(programInput),
			"Compiler > Assertion failed! Given program input has to be string or empty(null)."
		);

		assert(
			ld.isString(sourceFileExtention) &&
				!ld.isEmpty(sourceFileExtention),
			"Compiler > Assertion failed! Source code file extension cannot be empty."
		);

		this.name = name;
		this.cmd = cmd;
		this.tempPath = "temp";
		this.executionTime = 0;
		this.sourceCode = sourceCode;
		this.timeout = timeout ?? 1000;
		this.executionCmd = executionCmd;
		this.programInput = programInput ?? "";
		this.tempFileName = this.name.concat(`_${Date.now()}`);
		this.sourceFileExtention = sourceFileExtention;
		this.outputFileExtention =
			outputFileExtention ?? pltInfo.binayExtention;
	}

	async compile() {
		throw new Error("Compiler > compile() > Unimplemented method.");
	}
	async run() {
		throw new Error("Compiler > run() > Unimplemented method.");
	}

	// Create source file to compile or execute
	async createSourceFile() {
		try {
			const filePath = `${this.tempPath}/${this.tempFileName}${this.sourceFileExtention}`;

			await fs.ensureDir(this.tempPath);
			await fs.outputFile(filePath, this.sourceCode);

			return {
				status: true,
				path: filePath,
			};
		} catch (error) {
			throw new Error(error.message);
		}
	}

	async cleanup() {
		try {
			const inputFile = `${this.tempPath}/${this.tempFileName}${this.sourceFileExtention}`;
			const outputFile = `${this.tempPath}/${this.tempFileName}${this.outputFileExtention}`;

			const inputFilePath = `${this.tempPath}/${this.tempFileName}`;
			const outputFilePath = `${this.tempPath}/${this.tempFileName}`;

			await fs.remove(inputFile);
			await fs.remove(outputFile);

			await fs.remove(inputFilePath);
			await fs.remove(outputFilePath);
			return {
				status: true,
				message: "Cleanup successful.",
			};
		} catch (error) {
			throw new Error(error.message);
		}
	}
};
