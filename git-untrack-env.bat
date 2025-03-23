@echo off
echo Untracking environment files from Git...

REM Untrack .env files
git rm --cached backend/.env
git rm --cached frontend/.env.local

echo Environment files are now untracked. They still exist in your local filesystem.
echo Make sure to add them to .gitignore if they are not already there.
pause 