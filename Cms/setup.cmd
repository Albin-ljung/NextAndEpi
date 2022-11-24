@ECHO OFF
SETLOCAL

SET BASE=.\App_Data

ECHO Removed all files from the App_Data folder
IF EXIST %BASE%\blobs\ RMDIR %BASE%\blobs\ /S/Q || EXIT /B 1
IF EXIST %BASE%\nextandepi.mdf DEL %BASE%\nextandepi.mdf /F/Q || EXIT /B 1
IF EXIST %BASE%\nextandepi.ldf DEL %BASE%\nextandepi.ldf /F/Q || EXIT /B 1

ECHO Created new database
XCOPY %BASE%\db.mdf %BASE%\nextandepi.mdf* /Y/C || EXIT /B 1

EXIT /B %ERRORLEVEL%
