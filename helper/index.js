const ld = require("lodash");
const fs = require("fs-extra");

module.exports = {
	generalCodeValidation: (code) => {
		if (ld.isEmpty(code)) return false;
		else if (!ld.isString(code)) return false;
		else return true;
	},

	languageValidator: (language) => {
		if (ld.isEmpty(language)) return false;
		else return true;
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
