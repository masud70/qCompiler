const { spawnSync } = require("node:child_process");
const fs = require("fs-extra");
const { createFile } = require("../helper");

module.exports = {
	compileCPP: async (code) => {
		try {
			const fileExt = ".cpp";
			const fd = await createFile({ data: code, ext: fileExt });

			// Compile the C++ file using g++
			const compileProcess = spawnSync("g++", [
				fd.path + fileExt,
				"-o",
				fd.path,
			]);
			await fs.remove(fd.path + fileExt);

			if (compileProcess.error) {
				throw new Error(compileProcess.stderr);
			} else {
				return {
					status: true,
					file: fd.path + ".exe",
				};
			}
		} catch (error) {
			return {
				status: false,
				error: error,
			};
		}
	},

	executeCPP: async ({ file }) => {
		try {
			// Execute C++ file
			const runProcess = spawnSync("./" + file);
			await fs.remove(file);

			if (runProcess.error) {
				throw new Error(runProcess.stderr);
			} else {
				return {
					status: true,
					output: runProcess.stdout.toString(),
				};
			}
		} catch (error) {
			return {
				status: false,
				error: error,
			};
		}
	},

	executeCPPWithInput: async ({ file, input }) => {
		try {
			// Execute C++ file
			const runProcess = spawnSync("./" + file, { input });

			await fs.remove(file);

			if (runProcess.error) {
				throw new Error(runProcess.stderr);
			} else {
				return {
					status: true,
					output: runProcess.stdout.toString(),
				};
			}
		} catch (error) {
			return {
				status: false,
				error: error,
			};
		}
	},
};
