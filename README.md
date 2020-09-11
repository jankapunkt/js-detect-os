# Detect OS in Javascript

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Project Status: Active – The project has reached a stable, usable state and is being actively developed.](https://www.repostatus.org/badges/latest/active.svg)](https://www.repostatus.org/#active)
![GitHub](https://img.shields.io/github/license/jankapunkt/js-detect-os)


Detect current running OS including version and arch, if possible. 
No dependencies. All code < 300 lines.

This is just a minimal, simple and incomplete package to detect the following:

* os - Android, Windows, OSX, Linux etc. or undefined for unknown
* isMobile - true if a mobile OS, otherwise false
* name - For example "Ubuntu" when OS is "Linux" or undefined
* arch - 32, 64 or undefined
* ram - if `navigator.deviceMemory` is available or undefined

Uses mainly `navigator.platform` and `navigator.userAgent` as second guess for detection.

No legacy support yet, no support for OS-minorites yet. **Feel free to contribute!**

## License

MIT, see [license](./LICENSE)
