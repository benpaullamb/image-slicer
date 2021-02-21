const fs = require('fs');
const path = require('path');

const clear = (folder) => {
	const dir = path.join(__dirname, folder);
	console.log(`Emptying ${dir}`);
	fs.rmSync(dir, { recursive: true });
	fs.mkdirSync(dir);
};

(() => {
	if (process.argv.length <= 2) {
		clear('../input');
		clear('../output');
	} else if (process.argv.length >= 3) {
		if (process.argv[2] === 'input') {
			clear('../input');
		} else if (process.argv[2] === 'output') {
			clear('../output');
		}
	}
})();
