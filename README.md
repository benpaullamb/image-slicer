# Image Slicer

## Installation & Usage

1. `git clone`
2. `npm install`
3. Create an "input" folder inside the cloned repo
4. Place your image inside this "input" folder
5. Adjust the config in `config.json`. The measurements in this config are in cm.
6. `npm run slice`
7. View your sliced image in the "output" folder

You can update the image sources in `index.html` to visualize the input/output

### Other Scripts

- `npm run clear` deletes all files inside both the "input" and "output" folders
- `npm run clear-input` deletes all files inside the "input" folder
- `npm run clear-output` deletes all files inside the "output" folder
