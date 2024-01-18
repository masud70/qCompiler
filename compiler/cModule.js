const { spawnSync } = require("node:child_process");
const fs = require("fs-extra");
const { createFile } = require("../helper");

module.exports = {
	compileC: async ({ code, cmd }) => {
		try {
			const fileExt = ".c";
			const fd = await createFile({ data: code, ext: fileExt });

			// Compile the C file using gcc
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

	executeCWithInput: async ({ file, input }) => {
		try {
			// Execute C file
			console.log(file);
			const runProcess = spawnSync(".\\" + file, { input });

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