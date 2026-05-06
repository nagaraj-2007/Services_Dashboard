Write-Host "Installing Frontend Dependencies..." -ForegroundColor Cyan
npm install jspdf jspdf-autotable socket.io-client axios

Write-Host "Installing Backend Dependencies..." -ForegroundColor Cyan
cd backend
npm install socket.io

Write-Host "All dependencies installed! Please restart your 'npm run dev' command." -ForegroundColor Green
Pause
