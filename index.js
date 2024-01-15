const { generalCodeValidation, languageValidator } = require("./helper");
const {
	compileCPP,
	executeCPP,
	executeCPPWithInput,
} = require("./compiler/cppModule");

module.exports = {
	compile: async ({ code, language, input }) => {
		if (!generalCodeValidation(code) || !languageValidator(language)) {
			return {
				status: false,
				message: "Invalid code or language",
			};
		} else {
			var data = {};

			if (language == "CPP") {
				data = await compileCPP(code);
				if (data.status) {
					if (input)
						data = await executeCPPWithInput({
							file: data.file,
							input: input,
						});
					else data = await executeCPP(data.file);
				}
			} else if (language == "PYTHON") {
				data = {
					status: true,
					message: "Python file compiled",
				};
			} else {
				data = {
					status: false,
					message: "Invalid language",
				};
			}

			return data;
		}
	},
};
