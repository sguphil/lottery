const { app, BrowserWindow } = require('electron');
let pk10 = require('./rp');
let serviceResult = pk10.results;
let settings = pk10.settings;
let exceptionMsg = pk10.exceptionMsg;
let gBettingInfoShow = pk10.gBettingInfoShow;
let gBettingIssueInfo = pk10.gBettingIssueInfo;


//主进程
const ipc = require('electron').ipcMain;

let win;
function createWindow() {
    win = new BrowserWindow({ width: 1000, height: 800 });
    win.loadFile('index.html');

    //win.webContents.openDevTools();
    console.log('==========create window=============');
    win.on('close', () => {
        win = null;
    });

    refreshResult();
}

function refreshResult(){
    setInterval(sendMsgToUpdate, 5 * 1000);
}

function sendMsgToUpdate(){
    let issueInof = gBettingIssueInfo.join('\n');
    let bettinginfo = gBettingInfoShow.join('\n');
    console.log('======dddd========ddddddd====', bettinginfo);
    let msg = issueInof + '\n' + bettinginfo + '\n' + serviceResult.join('');
    console.log('======eeeeee========exceptionMsg====', exceptionMsg);
    if (exceptionMsg.length != 0){
        msg = exceptionMsg.join('');
    }
    win.webContents.send('ttt', {msg:msg});
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
});


ipc.on('pk10-start', function (e, arg) {
    // do something
});

ipc.on('pk10-stop', function (e, arg) {
    // do something
});


ipc.on('configTest', function (e, args) {
    /**
     * {
      bettou: inputbettou.value,
      dizhu: inputdizhu.value,
      danwei: danwei,
      maxWin: maxWin.value,
      maxLost: maxLost.value,
      username: username.value,
      password: password.value,
    });
     */
    // console.log('ttttttt=========', args);
    if (args.bettou == ''){
        e.sender.send('error', {msg:'parameter error:bettou!!'});
    }else if (args.dizhu == ''){
        e.sender.send('error', {msg:'parameter error:dizhu!!'});
    }else if (args.danwei == 0){
        e.sender.send('error', {msg:'parameter error:danwei!!'});
    }else if (args.betStategy == 0){
        e.sender.send('error', {msg:'parameter error:betStategy!!'});
    }else if (args.maxWin == ''){
        e.sender.send('error', {msg:'parameter error:maxWin!!'});
    }else if (args.maxLost == ''){
        e.sender.send('error', {msg:'parameter error:maxLost!!'});
    }else if (args.username == ''){
        e.sender.send('error', {msg:'parameter error:username!!'});
    }else if (args.password == ''){
        e.sender.send('error', {msg:'parameter error:password!!'});
    }else{
        settings.config.userName = args.username;
        settings.config.password = args.password;
        settings.config.multiple = args.bettou.split(',').map(Number) ;
        settings.config.bettingUnit = args.danwei;
        settings.config.maxWinVal = args.maxWin;
        settings.config.maxLostVal = args.maxLost;
        settings.config.antiesMultiple = args.dizhu;
        settings.config.betStategy = args.betStategy;
        
        pk10.start();
    }
})
