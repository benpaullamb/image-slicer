const fs = require('fs');
const path = require('path');
const Jimp = require('jimp');
const config = require('./config.json');

const { panelCount } = config;

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
		let image = await Jimp.read(path.join('./input', imageNameWithExt));

		console.log(`Original size: ${image.bitmap.width}x${image.bitmap.height}`);

		image.quality(100);
		image = scaleToAspectRatio(image);

		console.log(`Scaled size: ${image.bitmap.width}x${image.bitmap.height}`);

		const sliceWidth = image.bitmap.width / panelCount;
		const height = image.bitmap.height;
		const gap = pixelsGap(image);
		const halfGap = gap / 2;

		console.log(`A ${config.panelGap}cm gap is ${Math.round(gap)}px`);

		for (let i = 0; i < panelCount; i++) {
			const slice = image.clone();

			if (i === 0) {
				slice.crop(0, 0, sliceWidth - halfGap, height);
			} else if (i === panelCount - 1) {
				slice.crop(i * sliceWidth + halfGap, 0, sliceWidth - halfGap, height);
			} else {
				slice.crop(i * sliceWidth + halfGap, 0, sliceWidth - gap, height);
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

const totalWidthCm = () => {
	return (
		config.panelWidth * config.panelCount +
		config.panelGap * (config.panelCount - 1)
	);
};

const scaleToAspectRatio = (image) => {
	console.log('Resizing to canvas aspect ratio');

	const scaledImage = image.clone();
	// 1 height : x width
	const heightToWidthRatio = totalWidthCm() / config.panelHeight;

	const newWidth = heightToWidthRatio * scaledImage.bitmap.height;

	scaledImage.cover(newWidth, scaledImage.bitmap.height);

	return scaledImage;
};

const pixelsGap = (image) => {
	const pxPerCm = image.bitmap.width / totalWidthCm();

	return config.panelGap * pxPerCm;
};
