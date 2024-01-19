const os = require("os");

module.exports = class PlatformInfo {
	constructor() {
		this.platform = os.platform();
		switch (this.platform) {
			case "linux":
				this.binayExtention = ".out";
				this.isSupported = true;
				break;
			case "win32":
				this.binayExtention = ".exe";
				this.isSupported = true;
				break;
			default:
				this.isSupported = false;
				break;
		}
	}
};
