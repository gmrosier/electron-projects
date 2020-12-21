const fs = require('fs');
const { 
  app,
  Menu,
  shell,
  ipcMain,
  BrowserWindow,
  globalShortcut,
  dialog
} = require('electron');


app.on('ready', () => {
  globalShortcut.register('CommandOrControl+S', () => {
    console.log('Saving the file');
    const window = BrowserWindow.getFocusedWindow();
    window.webContents.send('editor-event', 'save');
  });
})

ipcMain.on('editor-reply', (event, arg) => {
  console.log(`Received reply from web page: ${arg}`);
});

ipcMain.on('save', (event, arg) => {
  console.log('Saving content of the file');
  console.log(arg);

  const window = BrowserWindow.getFocusedWindow();
  const options = {
    title: 'Save Markdown File'
  };
  
  dialog.showSaveDialog(null, options).then(result => {
    if (!result.canceled) {
      filename = result.filePath
      console.log(filename);
      fs.writeFileSync(filename, arg);
    }
  }); 
});

const template = [
  {
    label: 'Format',
    submenu: [
      {
        label: 'Toggle Bold',
        click()  {
          const window = BrowserWindow.getFocusedWindow();
          window.webContents.send('editor-event', 'toggle-bold');
        }
      }
    ]
  },
  {
    role: 'help',
    submenu: [
      {
        label: 'About Editor Component',
        click() {
          shell.openExternal('https://simplemde.com/');
        }
      }
    ]
  }
];

if (process.env.DEBUG) {
  template.push({
    label: 'Debugging',
    submenu: [
      {
        label: "Dev Tools",
        role: 'toggleDevTools'
      },
      { type: 'separator' },
      { role: 'reload' }
    ]
  });
}
const menu = Menu.buildFromTemplate(template);
module.exports = menu;
