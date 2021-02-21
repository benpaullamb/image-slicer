# Image Slicer

## Installation & Usage

1. `git clone`
2. `npm install`
3. Create an "input" folder inside the cloned repo
4. Place your image inside this "input" folder
5. Adjust the config in `config.json`
6. `npm run slice`
7. View your sliced image in the "output" folder

## TODO

- Add canvas and spacing size to config in cm
- Calculate the total ratio of the canvas with spaces
- Scale the image to that ratio before slicing
- Calculate the spacing in px from the config