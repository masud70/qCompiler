const { generalCodeValidation, languageValidator } = require("./helper");
const {
	compileCPP,
	executeCPP,
	executeCPPWithInput,
} = require("./compiler/cppModule");

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
			} else if (language == "PYTHON") {
				data = {
					status: true,
					message: "Python file compiled",
				};
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
