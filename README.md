# Detect OS in Javascript

Detect current running OS including version and arch, if possible.

This is just a minimal, simple and incomplete package to detect the following:

* os - Android, Windows, OSX, Linux etc. or undefined for unknown
* isMobile - true if a mobile OS, otherwise false
* name - For example "Ubuntu" when OS is "Linux" or undefined
* arch - 32, 64 or undefined
* ram - if `navigator.deviceMemory` is available or undefined

Uses mainly `navigator.platform` and `navigator.userAgent` as second guess for detection.

No legacy support yet, no support for OS-minorites yet. Feel free to contrube.

