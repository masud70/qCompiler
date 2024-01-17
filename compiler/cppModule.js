const { spawnSync } = require("node:child_process");
const fs = require("fs-extra");
const { createFile } = require("../helper");

module.exports = {
	compileCPP: async ({ code, cmd }) => {
		try {
			const fileExt = ".cpp";
			const fd = await createFile({ data: code, ext: fileExt });

			// Compile the C++ file using g++
			const compileProcess = spawnSync(cmd, [
				fd.path + fileExt,
				"-o",
				fd.path,
			]);
			await fs.remove(fd.path + fileExt);

			if (compileProcess.error || compileProcess.stderr.length) {
				throw new Error(
					compileProcess.stderr + compileProcess.stderr.toString()
				);
			} else {
				return {
					status: true,
					file: fd.path + ".exe",
				};
			}
		} catch (error) {
			throw new Error(error);
		}
	},

	executeCPP: async ({ file, timeout }) => {
		try {
			// Execute C++ file
			const runProcess = spawnSync("./" + file, { timeout });
			await fs.remove(file);

			if (runProcess.error || runProcess.stderr.length) {
				throw new Error(
					runProcess.stderr + runProcess.stderr.toString()
				);
			} else {
				return {
					status: true,
					output: runProcess.stdout.toString(),
				};
			}
		} catch (error) {
			throw new Error(error);
		}
	},

	executeCPPWithInput: async ({ file, input, timeout }) => {
		try {
			// Execute C++ file
			const runProcess = spawnSync(".\\" + file, { input, timeout });

			await fs.remove(file);

			if (runProcess.error || runProcess.stderr.length) {
				throw new Error(
					runProcess.stderr + runProcess.stderr.toString()
				);
			} else {
				return {
					status: true,
					output: runProcess.stdout.toString(),
				};
			}
		} catch (error) {
			throw new Error(error);
		}
	},
};
