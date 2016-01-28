# Media-Electron
A new experimental UI platform
[![Build status](https://ci.appveyor.com/api/projects/status/ajmcj49jiddxg3jn/branch/master?svg=true)](https://ci.appveyor.com/project/tevert/media-electron/branch/master)


## Building a Release Instructions
1. Update the version number in \<projectdir\>/app/package.json
2. Execute `npm run-script release` in \<projectdir\>
3. Upload the output files (should be 5) from \<projectdir\>/release to mediacomplete.github.io/download
4. Every user should automatically receive the update on their next run.
