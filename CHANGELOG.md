# react-icon-ether

## 1.0.2

### Patch Changes

- 3ad35b8: update readme

## 1.0.0

### Major Changes

- 6010a85: IconEther 1.0

  Comes with a default set of visual settings out of the box, just specify an array of valid simpleicons names.
  Can be customized in the following ways using props
  Props:

  - renderImages flag: Whether or not to render icons
  - renderDots flag: Whether or not to render dots
  - height and width: Can be either a pixel value number, or valid css string value, defaults to "100%"
  - fullscreen flag: True will absolutely position with z-index -100, false will relatively position with default height and width
  - backgroundColor: Accepts hex string, must include "#"
  - particleColor: Sets the color of dots and monochrome icons, accepts hex string, must include "#"
  - dotSize: Set dot particle size, defualt is 2
  - icons: Accpets array of icon names to display, must provide valid simpleicons names!

  There's a dev env if you want to play around with the parameters and preview changes with a GUI control panel, just clone the git repo and run yarn dev.

### Patch Changes

- 6333b47: init
- 1932419: bugfix: canvas not resizing correctly
  better file structure
  demo vids
- provide readme
