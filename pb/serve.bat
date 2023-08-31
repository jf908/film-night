@echo off

:: build if needed
go mod tidy
go build

if not exist %GOPATH%\bin\modd.exe (
  echo go install modd
  go install github.com/cortesi/modd/cmd/modd@latest
)

setlocal
:: load .env
FOR /F "eol=# tokens=*" %%i IN (%~dp0..\.env) DO SET %%i
modd
endlocal