@echo off
echo Installing project packages from npmjs.org...
npm config set registry https://registry.npmjs.org/
npm install
if errorlevel 1 pause
npm run dev
pause
