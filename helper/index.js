const ld = require("lodash");
const fs = require("fs-extra");

module.exports = {
	generalCodeValidation: (code) => {
		try {
			if (ld.isEmpty(code)) throw new Error("Code length cannot be empty.")
			if (!ld.isString(code)) throw new Error("Invalid code format.")

			return true;
		} catch (error) {
			throw new Error(error)
		}
	},

	languageValidator: (language) => {
		try {
			if (ld.isEmpty(language)) throw new Error("Language cannot be empty.")
			return true;
		} catch (error) {
			throw new Error(error)
		}
	},

	createFile: async ({ data, ext }) => {
		try {
			const path = "temp";
			const filePathName = path + "/" + Date.now();

			await fs.ensureDir(path);
			await fs.outputFile(filePathName + ext, data);

			return {
				status: true,
				path: filePathName,
			};
		} catch (error) {
			throw new Error(error);
		}
	},
};
