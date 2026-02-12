import { app, BrowserWindow } from 'electron'
import path from 'path'
import { spawn } from 'child_process'

let processoApi: any

const iniciarApi = () => {
     const caminhoApi = app.isPackaged
          ? path.join(process.resourcesPath, 'api', 'dist', 'app.js')
          : path.join(__dirname, '../../api/dist/app.js')

     processoApi = spawn(process.execPath, [caminhoApi], {
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
          height: 768
     })

     const caminhoClient = app.isPackaged
          ? path.join(process.resourcesPath, 'client', 'dist', 'index.html')
          : path.join(__dirname, '../../client/dist/index.html')

     win.loadFile(caminhoClient)
}

app.whenReady().then(() => {
     iniciarApi()
     setTimeout(criarJanelaElectron, 2000)
})

app.on('will-quit', () => {
     if (processoApi) processoApi.kill()
})