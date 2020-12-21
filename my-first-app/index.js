// import electrion
const { app, BrowserWindow } = require('electron');

// global window variable
let window;

// wait till application started
app.on('ready', () => {
  // create window
  window = new BrowserWindow({
    width:  800,
    height: 600,
    webPreferences: {
      nodeIntegration:  true
    }
  });

  // load window
  window.loadFile('index.html');
});
