import { execSync } from 'child_process';
import fs from 'fs';

const UNIX_COMMAND = 'ps -A -o %cpu,%mem,comm | sort -nr | head -n 1';
const WIN_COMMAND = `powershell "Get-Process | Sort-Object CPU -Descending | Select-Object -Property Name, CPU, WorkingSet -First 1 | ForEach-Object { $_.Name + ' ' + $_.CPU + ' ' + $_.WorkingSet }"`;

function runSystemCommand() {
  if (process.platform === 'win32') {
    return execSync(WIN_COMMAND).toString();
  } else {
    return execSync(UNIX_COMMAND).toString();
  }
}

function appendToLogFile(data) {
  const timestamp = Math.floor(new Date() / 1000);
  const logMessage = `${timestamp} : ${data}\n`;

  try {
    fs.appendFileSync('activityMonitor.log', logMessage);
  } catch (err) {
    console.error('Error appending to log file:', err);
  }
}

function refresh() {
  const processInfo = runSystemCommand();
  process.stdout.write(`\r\x1b[K${processInfo}`); 
  appendToLogFile(processInfo);
  setTimeout(refresh, 100); 
}

fs.writeFileSync('activityMonitor.log', ''); 
refresh();
