const fs = require('fs');
const path = require('path');
const Jimp = require('jimp');
const config = require('./config.json');

const { sliceCount, sliceGap } = config;
const halfSliceGap = sliceGap / 2;

(async () => {
	console.log('Starting Image Slicer');

	const files = fs.readdirSync('./input');

	if (!files) {
		console.warn('No images in the input folder');
		return;
	}

	const imageNameWithExt = files[0];
	const imageName = files[0].split('.')[0];

	console.log(`Slicing: ${imageNameWithExt}`);

	try {
		const image = await Jimp.read(path.join('./input', imageNameWithExt));
		image.quality(100);
		const sliceWidth = image.bitmap.width / sliceCount;
		const height = image.bitmap.height;

		for (let i = 0; i < sliceCount; i++) {
			const slice = image.clone();

			if (i === 0) {
				slice.crop(i * sliceWidth, 0, sliceWidth - halfSliceGap, height);
			} else if (i === sliceCount - 1) {
				slice.crop(
					i * sliceWidth + halfSliceGap,
					0,
					sliceWidth - halfSliceGap,
					height
				);
			} else {
				slice.crop(
					i * sliceWidth + halfSliceGap,
					0,
					sliceWidth - sliceGap,
					height
				);
			}

			const sliceName = `${imageName}-${i + 1}.${image.getExtension()}`;
			await slice.writeAsync(path.join('./output', sliceName));

			console.log(
				`${sliceName} created (${slice.bitmap.width}x${slice.bitmap.height})`
			);
		}
	} catch (err) {
		console.error(err);
	}

	console.log('Slicing complete.');
})();
