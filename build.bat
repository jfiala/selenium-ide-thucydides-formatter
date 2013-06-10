@echo off
 
setlocal
 
set APP_NAME="selenium-ide-thucydides-formatter"
set CHROME_PROVIDERS="content"
 
set ZIP_APP="c:\program files (x86)\7-zip\7z.exe"

set ROOT_DIR=%CD%
set TMP_DIR="build"
 
rem remove any left-over files from previous build
del /Q %APP_NAME%.xpi
del /S /Q %TMP_DIR%
 
mkdir %TMP_DIR%\chrome\content
 
robocopy chrome\content %TMP_DIR%\chrome\content /E
copy install.rdf %TMP_DIR%
copy chrome.manifest %TMP_DIR%\chrome.manifest
 
rem generate the XPI file
cd %TMP_DIR%
echo "Generating %APP_NAME%.xpi..."
 
%ZIP_APP% a -r -y -tzip %APP_NAME%.zip *
 
rename %APP_NAME%.zip %APP_NAME%.xpi
 
endlocal