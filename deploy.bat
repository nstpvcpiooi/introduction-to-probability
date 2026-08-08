@echo off
chcp 65001 >nul
echo =========================================
echo BAT DAU CAP NHAT GITHUB PAGES
echo =========================================
echo.

echo [1/2] Dang xay dung (build) du an...
call pnpm run build
if %errorlevel% neq 0 (
    echo.
    echo [Loi] Qua trinh build that bai! Vui long kiem tra lai loi tren man hinh.
    pause
    exit /b %errorlevel%
)

echo.
echo [2/2] Dang day code len GitHub Pages (deploy)...
call pnpm run deploy
if %errorlevel% neq 0 (
    echo.
    echo [Loi] Qua trinh deploy that bai!
    pause
    exit /b %errorlevel%
)

echo.
echo =========================================
echo [THANH CONG] Da cap nhat web thanh cong! 
echo =========================================
echo Vui long cho 1-2 phut va F5 lai trang web de thay thay doi.
echo.
pause
