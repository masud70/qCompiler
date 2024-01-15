const { spawnSync } = require("node:child_process");
const fs = require("fs-extra");
const { createFile } = require("../helper");

module.exports = {
	runPython: async ({ code, cmd, input }) => {
		try {
			const fileExt = ".py";
			const fd = await createFile({ data: code, ext: fileExt });

			// Compile the Python file
			const compileProcess = spawnSync(cmd, [fd.path + fileExt], {
				input,
			});
			await fs.remove(fd.path + fileExt);

			console.log(
				"Run: ",
				compileProcess.stderr.toString(),
				compileProcess.stdout.toString()
			);

			if (compileProcess.error || compileProcess.stderr.length) {
				throw new Error(
					compileProcess.stderr + compileProcess.stderr.toString()
				);
			} else {
				return {
					status: true,
					output: compileProcess.stdout.toString(),
				};
			}
		} catch (error) {
			throw new Error(error);
		}
	},

	runPythonWithInput: async ({ file, input }) => {
		try {
			// Execute C++ file
			const runProcess = spawnSync(cmd, [file], { input });

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
