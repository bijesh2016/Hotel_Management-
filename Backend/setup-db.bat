@echo off
REM Database Setup Script for Hotel Reservation System (Windows)

setlocal enabledelayedexpansion

echo.
echo =====================================
echo 🏨 Hotel Reservation System Setup
echo =====================================
echo.

REM Database connection details
set DB_USER=postgres
set DB_PASSWORD=root
set DB_HOST=localhost
set DB_PORT=5432
set DB_NAME=hotel_reservation

echo Connection Details:
echo   Host: %DB_HOST%
echo   Port: %DB_PORT%
echo   User: %DB_USER%
echo   Database: %DB_NAME%
echo.

REM Check if psql is available
where psql >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ PostgreSQL is not installed or psql is not in PATH
    echo Please install PostgreSQL from: https://www.postgresql.org/download/
    echo.
    pause
    exit /b 1
)

echo ✅ PostgreSQL is available
echo.

REM Create database
echo 📝 Creating database '%DB_NAME%'...
set PGPASSWORD=%DB_PASSWORD%
psql -h %DB_HOST% -U %DB_USER% -p %DB_PORT% -c "CREATE DATABASE %DB_NAME%;" 2>nul

if %ERRORLEVEL% EQU 0 (
    echo ✅ Database created successfully
) else (
    echo ⚠️  Database may already exist (that's okay)
)

REM Run schema file
echo.
echo 📊 Creating tables...
psql -h %DB_HOST% -U %DB_USER% -p %DB_PORT% -d %DB_NAME% -f ./src/database/schema.sql

if %ERRORLEVEL% EQU 0 (
    echo ✅ Schema created successfully
) else (
    echo ❌ Failed to create schema
    echo Please check your database connection settings
    pause
    exit /b 1
)

echo.
echo =====================================
echo ✅ Database setup completed!
echo =====================================
echo.
echo Test User Accounts:
echo ─────────────────────
echo Admin Account:
echo   Email: admin@example.com
echo   Password: admin123
echo.
echo Customer Account:
echo   Email: customer@example.com
echo   Password: customer123
echo.
echo =====================================
echo.
echo Next Steps:
echo 1. Start Backend: npm run watch
echo 2. Start Frontend: npm run dev (in Frontend folder)
echo 3. Access Frontend: http://localhost:5173
echo 4. Access API Docs: http://localhost:5000/api-docs
echo.
pause
