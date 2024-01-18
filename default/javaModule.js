const { spawnSync } = require("node:child_process");
const fs = require("fs-extra");
const { createFile } = require("../utils");

module.exports = {
	compileJava: async ({ code, cmd }) => {
		try {
			const fileExt = "\\Main.java";
			const fd = await createFile({ data: code, ext: fileExt });

			// Compile the Java file using javac
			const compileProcess = spawnSync(cmd, [
				fd.path + fileExt,
				"-d",
				fd.path,
			]);
			await fs.remove(fd.path + ".java");

			if (compileProcess.error || compileProcess.stderr.length) {
				throw new Error(
					compileProcess.stderr + compileProcess.stderr.toString()
				);
			} else {
				return {
					status: true,
					file: fd.path,
				};
			}
		} catch (error) {
			throw new Error(error);
		}
	},

	executeJavaWithInput: async ({ file, input, cmd }) => {
		try {
			// Execute Java.class file
			const runProcess = spawnSync(cmd, ["-cp", "./" + file, "Main"], {
				input,
			});

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
