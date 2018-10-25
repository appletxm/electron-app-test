// import {app, BrowserWindow} from 'electron'
// import {Menu, MenuItem, dialog, ipcMain} from 'electron'
// import {appMenuTemplate} from './app-menu.js'
const electron = require('electron')
const {
  app,
  Menu,
  MenuItem,
  BrowserWindow
} = electron

let win = null
const template = [{
    label: 'App-Edit',
    submenu: [{
        role: 'undo'
      },
      {
        role: 'redo'
      },
      {
        type: 'separator'
      },
      {
        role: 'cut'
      },
      {
        role: 'copy'
      },
      {
        role: 'paste'
      },
      {
        role: 'pasteandmatchstyle'
      },
      {
        role: 'delete'
      },
      {
        role: 'selectall'
      }
    ]
  },
  {
    label: 'View',
    submenu: [{
        role: 'reload'
      },
      {
        role: 'forcereload'
      },
      {
        role: 'toggledevtools'
      },
      {
        type: 'separator'
      },
      {
        role: 'resetzoom'
      },
      {
        role: 'zoomin'
      },
      {
        role: 'zoomout'
      },
      {
        type: 'separator'
      },
      {
        role: 'togglefullscreen'
      }
    ]
  },
  {
    role: 'window',
    submenu: [{
        role: 'minimize'
      },
      {
        role: 'close'
      }
    ]
  },
  {
    role: 'help',
    submenu: [{
      label: 'Learn More',
      click() {
        require('electron').shell.openExternal('https://electronjs.org')
      }
    }]
  }
]

function createWindow() {
  // alert(name)

  win = new BrowserWindow({
    width: 800,
    height: 600
  })
  win.loadFile('src/index.html')
  win.webContents.openDevTools()
  win.on('close', () => {
    win = null
  })
}

function addMenu() {
  console.info(app.getName(), process.platform)
  if (process.platform === 'darwin') {
    template.unshift({
      label: app.getName(),
      submenu: [{
          role: 'about'
        },
        {
          type: 'separator'
        },
        {
          role: 'services',
          submenu: []
        },
        {
          type: 'separator'
        },
        {
          role: 'hide'
        },
        {
          role: 'hideothers'
        },
        {
          role: 'unhide'
        },
        {
          type: 'separator'
        },
        {
          role: 'quit'
        }
      ]
    })

    // Edit menu
    template[1].submenu.push({
      type: 'separator'
    }, {
      label: 'Speech',
      submenu: [{
          role: 'startspeaking'
        },
        {
          role: 'stopspeaking'
        }
      ]
    })

    // Window menu
    template[3].submenu = [{
        role: 'close'
      },
      {
        role: 'minimize'
      },
      {
        role: 'zoom'
      },
      {
        type: 'separator'
      },
      {
        role: 'front'
      }
    ]
  }

  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
}


app.on('ready', () => {
  createWindow()
  addMenu()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
