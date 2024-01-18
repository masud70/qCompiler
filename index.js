const { generalCodeValidation, languageValidator } = require("./utils");
const {
	compileCPP,
	executeCPP,
	executeCPPWithInput,
} = require("./default/cppModule");
const { runPython } = require("./default/pythonModule");
const { compileJava, executeJavaWithInput } = require("./default/javaModule");

// @depricated
// I suggest a distributed structure with a set of presets(default).
// Refer to ../defaults/readme for more information
module.exports = {
	compile: async ({ code, language, input, config }) => {
		try {
			if (config.OS != "windows") {
				throw new Error("Only windows OS is availabe in this version.");
			}
			generalCodeValidation(code);
			languageValidator(language);
			if (!config.timeout) config.timeout = 1000;
			var data = {};

			if (language == "C") {
				data = await compileC({ code: code, cmd: config.cmd });
				data = await executeCWithInput({
					file: data.file,
					input: input,
				});
			} else if (language == "CPP") {
				data = await compileCPP({ code: code, cmd: config.cmd });
				if (input)
					data = await executeCPPWithInput({
						file: data.file,
						input: input,
						timeout: config.timeout,
					});
				else data = await executeCPP({ file: data.file });
			} else if (language == "JAVA") {
				data = await compileJava({
					code: code,
					cmd: config.cmdCompile,
				});
				console.log("File: ", data);
				data = await executeJavaWithInput({
					file: data.file,
					input: input,
					cmd: config.cmdExecute,
				});
			} else if (language == "PYTHON") {
				data = runPython({
					code: code,
					cmd: config.cmd,
					input: input,
				});
			} else {
				throw new Error("Invalid language");
			}

			return data;
		} catch (error) {
			return {
				status: false,
				error: error.message,
			};
		}
	},
};
