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
	compile: async ({ code, language, input, systemConfig }) => {
		try {
			if (systemConfig.OS != "windows") {
				throw new Error("Only windows OS is availabe in this version.");
			}
			generalCodeValidation(code);
			languageValidator(language);
			var data = {};

			if (language == "CPP" || language == "C") {
				data = await compileCPP({ code: code, cmd: systemConfig.cmd });
				if (input)
					data = await executeCPPWithInput({
						file: data.file,
						input: input,
					});
				else data = await executeCPP({ file: data.file });
			} else if (language == "JAVA") {
				data = await compileJava({
					code: code,
					cmd: systemConfig.cmdCompile,
				});
				data = await executeJavaWithInput({
					file: data.file,
					input: input,
					cmd: systemConfig.cmdExecute,
				});
			} else if (language == "PYTHON") {
				data = runPython({
					code: code,
					cmd: systemConfig.cmd,
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
