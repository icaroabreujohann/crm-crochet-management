import { app, BrowserWindow } from 'electron'
import path from 'path'
import { spawn } from 'child_process'
import { ipcMain } from 'electron'

app.commandLine.appendSwitch('no-sandbox')

let processoApi: any

const iniciarApi = () => {
     const nodeExecutable = 'node'

     const caminhoApi = app.isPackaged
          ? path.join(process.resourcesPath, 'api', 'dist', 'app.js')
          : path.join(__dirname, '../../api/dist/app.js')

     processoApi = spawn(nodeExecutable, [caminhoApi], {
          stdio: 'inherit',
          env: {
               ...process.env,
               DATABASE_URL: 'postgres://postgres:admin@localhost:3002/crm-seth-atelie'
          }
     })

     console.log('API Iniciada')
}

const criarJanelaElectron = () => {
     const win = new BrowserWindow({
          width: 1366,
          height: 768,
          frame: false,
          titleBarStyle: 'hidden',
          webPreferences: {
               preload: path.join(__dirname, 'preload.js'),
               contextIsolation: true,
               nodeIntegration: false
          }
     })

     const caminhoClient = app.isPackaged
          ? path.join(process.resourcesPath, 'client', 'dist', 'index.html')
          : path.join(__dirname, '../../client/dist/index.html')

     win.loadFile(caminhoClient)

     if (!app.isPackaged) {
          win.webContents.openDevTools()
     }
}

app.whenReady().then(() => {
     ipcMain.on('window:minimize', () => {
          BrowserWindow.getFocusedWindow()?.minimize()
     })

     ipcMain.on('window:toggle-maximize', () => {
          const win = BrowserWindow.getFocusedWindow()
          if (!win) return

          if (win.isMaximized()) {
               win.unmaximize()
          } else {
               win.maximize()
          }
     })

     ipcMain.on('window:close', () => {
          BrowserWindow.getFocusedWindow()?.close()
     })

     iniciarApi()
     setTimeout(criarJanelaElectron, 2000)
})

app.on('will-quit', () => {
     if (processoApi) processoApi.kill()
})

const gotTheLock = app.requestSingleInstanceLock()

if (!gotTheLock) {
     app.quit()
} else {
     app.on('second-instance', () => {
          const win = BrowserWindow.getAllWindows()[0]
          if (win) {
               if (win.isMinimized()) win.restore()
               win.focus()
          }
     })
}