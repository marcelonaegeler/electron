const { app, BrowserWindow, remote } = require( 'electron' )
const https = require( 'https' )

const Clients = require( './models/Clients' );

let win;

var createWindow = function createWindow () {
  // Create the browser window.
  win = new BrowserWindow( { width: 950, height: 750 } );

  global.getAddress = getAddress;
  global.Clients = Clients;

  // and load the index.html of the app.
  win.loadURL( `file://${__dirname}/views/index.html` );

  // Open the DevTools.
  // win.webContents.openDevTools();

  // Emitted when the window is closed.
  win.on( 'closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  });
};

var getAddress = function ( cep, callback ) {
  var url = `https://maps.googleapis.com/maps/api/geocode/json?address=${cep}`;
  https.get( url, function ( res ) {
    var body = '';

    res.on( 'data', function  ( chunk ) {
      body += chunk;
    });

    res.on( 'end', function () {
      callback( JSON.parse( body ) );
    });

  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on( 'ready', createWindow );

// Quit when all windows are closed.
app.on( 'window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if ( process.platform !== 'darwin' ) {
    app.quit();
  }
});

app.on( 'activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if ( win === null ) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
