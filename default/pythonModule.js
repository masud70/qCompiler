const { spawnSync } = require("node:child_process");
const fs = require("fs-extra");
const { createFile } = require("../utils");

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
};
