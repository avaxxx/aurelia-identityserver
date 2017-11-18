# aurelia-identityserver

# Kendo issues
1. Run npm install aurelia-kendoui-bridge --save
2. Run yarn install
3. Run yarn upgrade
4. Run yarn webpack:dev
5. Run dotnet run


# Common issues 
Error - Unhandled rejection TypeError: __WEBPACK_IMPORTED_MODULE_0_aurelia_pal__.a.injectStyles
solution - run npm dedupe

# run cake
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass

 .\build.ps1 -configuration Release

 ./build.ps1 -configuration Debug -Target Publish
 ./build.ps1 -configuration Release -Target Publish