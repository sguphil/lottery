let request = require('request');
let lodash = require('lodash');
const settings = require('./config');
let log4js = require("log4js");
let log4js_config = require("./logconfig.json");
log4js.configure(log4js_config);
let logger = log4js.getLogger("pk10");

logger.info('start test...', settings.config.userName);
async function requestPromise(opts) {
  return new Promise(function (resolve, reject) {
    request(opts, (err, res, body) => {
      if (!err) {
        resolve(res);
      } else {
        reject(err);
      }
    })
  });
}

async function sleep(sec) {
  return new Promise(function (resolve, reject) {
    setTimeout(() => resolve(), sec * 1000);
  });
}

// https://123.jn700.com/pc
async function pcIndex() {
  //登陆post地址
  let url = settings.config.rootUrl + '/pc';

  //设置头部
  let headers = {
    // 'User-Agent': `Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:66.0) Gecko/20100101 Firefox/66.0`,
    Accept: '*/*',
  };

  let opts = {
    url: url,
    method: 'GET',
    headers: headers,
    timeout: 10000,
    'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:66.0) Gecko/20100101 Firefox/66.0',
    'Accept': 'application/json, text/javascript, */*; q=0.01',
    'Accept-Language': 'zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2',

    'Content-Type': 'application/x-www-form-urlencoded',
    'X-Requested-With': 'XMLHttpRequest',
  };
  let res = await requestPromise(opts);
  let setCookie = res.headers['set-cookie'];
  return setCookie;
}
//https://123.jn700.com/login/safe.mvc?
async function safeAfterlogin(cookie) {
  //登陆post地址
  let url = settings.config.rootUrl + '/login/safe.mvc';

  //设置头部
  let headers = {
    // 'User-Agent': `Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:66.0) Gecko/20100101 Firefox/66.0`,
    Accept: '*/*',
    Cookie: cookie,
    'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:66.0) Gecko/20100101 Firefox/66.0',
    'Accept': 'application/json, text/javascript, */*; q=0.01',
    'Accept-Language': 'zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2',

    'Content-Type': 'application/x-www-form-urlencoded',
    'X-Requested-With': 'XMLHttpRequest',
  };

  let opts = {
    url: url,
    method: 'GET',
    headers: headers,
    timeout: 10000,
  };
  let res = await requestPromise(opts);
  let setCookie = res.headers['set-cookie'];
  return setCookie;
}
async function login(cookie) {
  //登陆post地址
  let userName = settings.config.userName;
  let password = settings.config.password;
  let url = settings.config.rootUrl + '/login/login.mvc?username=' +
    userName + '&password=' + password + '&_BrowserInfo=firefox/66.0';

  //设置头部
  let headers = {
    // 'User-Agent': `Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:66.0) Gecko/20100101 Firefox/66.0`,
    Accept: '*/*',
    'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:66.0) Gecko/20100101 Firefox/66.0',
    'Accept': 'application/json, text/javascript, */*; q=0.01',
    'Accept-Language': 'zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2',

    'Content-Type': 'application/x-www-form-urlencoded',
    'X-Requested-With': 'XMLHttpRequest',
  };

  let opts = {
    url: url,
    method: 'POST',
    headers: headers,
    timeout: 10000,
    rejectUnauthorized: false,
  };
  let res = await requestPromise(opts);
  logger.debug('======login body====', res.body);
  if (JSON.parse(res.body).code == 210){
    logger.error('login error, please check:', res.body);
    gExceptionMsg.splice(0,gExceptionMsg.length);  
    gExceptionMsg.push('login error, please check:', res.body);
    process.exit(1);
  }
  let setCookie = res.headers['set-cookie'];
  return setCookie;
}

// https://123.jn700.com/login/loginOut.mvc
async function logout(cookie) {
  //模拟登陆
  //登陆post地址
  let url = settings.config.rootUrl + '/login/loginOut.mvc';

  //设置头部
  let headers = {
    // 'User-Agent': `Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:66.0) Gecko/20100101 Firefox/66.0`,
    Accept: '*/*',
    Cookie: cookie,
    'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:66.0) Gecko/20100101 Firefox/66.0',
    'Accept': 'application/json, text/javascript, */*; q=0.01',
    'Accept-Language': 'zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2',

    'Content-Type': 'application/x-www-form-urlencoded',
    'X-Requested-With': 'XMLHttpRequest',
  };

  let opts = {
    url: url,
    method: 'POST',
    headers: headers,
    timeout: 10000,
  };
  let res = await requestPromise(opts);
  return res;
}

// https://123.jn700.com/betType/lotterTime.mvc?gameType=19
async function getLotterTime(cookie) {
  let url = settings.config.rootUrl + '/betType/lotterTime.mvc?gameType=19';

  //设置头部
  let headers = {
    // 'User-Agent': `Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:66.0) Gecko/20100101 Firefox/66.0`,
    Accept: '*/*',
    Cookie: cookie,
    'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:66.0) Gecko/20100101 Firefox/66.0',
    'Accept': 'application/json, text/javascript, */*; q=0.01',
    'Accept-Language': 'zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2',

    'Content-Type': 'application/x-www-form-urlencoded',
    'X-Requested-With': 'XMLHttpRequest',
  };

  let opts = {
    url: url,
    method: 'POST',
    headers: headers,
    timeout: 10000,
  };
  let res = await requestPromise(opts);
  return res;
}

async function getUserInfo(cookie) {
  let opts = {
    url: settings.config.rootUrl + '/userInfo/simple-info.mvc',
    headers: {
      // 'User-Agent': `Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:66.0) Gecko/20100101 Firefox/66.0`,
      Cookie: cookie, //这里是登陆后得到的cookie,(重点)
      Accept: '*/*',
      'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:66.0) Gecko/20100101 Firefox/66.0',
      'Accept': 'application/json, text/javascript, */*; q=0.01',
      'Accept-Language': 'zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2',

      'Content-Type': 'application/x-www-form-urlencoded',
      'X-Requested-With': 'XMLHttpRequest',
    },
    method: 'POST',
    timeout: 10000,
  };

  let res = await requestPromise(opts);
  return res;
}

async function initPk10(cookie) {
  // init pk10
  let opts = {
    url: settings.config.rootUrl + '/gameType/initGame.mvc?gameID=19',
    headers: {
      // 'User-Agent': `Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:66.0) Gecko/20100101 Firefox/66.0`,
      Cookie: cookie,
      Accept: '*/*',
      'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:66.0) Gecko/20100101 Firefox/66.0',
      'Accept': 'application/json, text/javascript, */*; q=0.01',
      'Accept-Language': 'zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2',

      'Content-Type': 'application/x-www-form-urlencoded',
      'X-Requested-With': 'XMLHttpRequest',
    },
    method: 'POST',
    timeout: 10000,
  };

  let res = await requestPromise(opts);
  return res;
}

function buildBettingPara(pk10Gameinfo, bettingNum) {
  let gameInfo = JSON.parse(pk10Gameinfo.body);
  let token_tz = gameInfo.data.token_tz;
  let danwei = settings.config.bettingUnit;
  let userBonus = gameInfo.data.userBonus;
  let issueNo = gameInfo.data.current.lotteryNums.issueno;
  logger.debug('=======111=====token_tz, danwei:', token_tz, danwei);
  let bettingParaObj = {
    'gameId': 19,
    'token': token_tz,
    'issueNo': issueNo,
    'zhuiHaoQiHao': [],
    'tingZhiZhuiHao': 'false',
    'touZhuHaoMa': [{
      'wanFaID': 1840,
      'touZhuHaoMa': bettingNum,
      'touZhuBeiShu': 1,
      'danZhuJinEDanWei': danwei,  //100 --2 fen
      'yongHuSuoTiaoFanDian': 0,
      'digit': '0',
      'bouse': userBonus,
      'zhuShu': 7
    }]
  };

  return bettingParaObj;
}

/***
 * let record = {
  rank0:{
    issueNo: '',
    bettingNums:'',
    result:false,
    times: 0,
  },
 */
function isBingo(position, record, history) {
  if (!record['rank' + position].issueNo) {
    return true;
  }

  if (history.issueno != record['rank' + position].issueNo) {
    logger.error('=========check history bingo error, issueNo is not match, multiple it======', history.issueno, record['rank' + position].issueNo);
    return false;
    //throw { code: 'error occured when check history bingo' };
  }

  let recordNums = lodash.split(lodash.trimEnd(lodash.trimStart(record['rank' + position].bettingNums, '|'), '|'), ',');
  let historyNums = lodash.split(history.nums, ' ');
  logger.debug('#############=========check history======position,recordNums, historyNums,[historyNums[parseInt(position)]]):',
    position, recordNums, historyNums, [historyNums[parseInt(position)]]);
  let isBingo = lodash.intersection(recordNums, [historyNums[parseInt(position)]]).length > 0 ? true : false;
  return isBingo;
}

function getHistoryNum(position, record, history){
    if (!record['rank' + position].issueNo) {
    return 1;
  }

  if (history.issueno != record['rank' + position].issueNo) {
    logger.error('=========check history bingo error, issueNo is not match, multiple it======', history.issueno, record['rank' + position].issueNo);
    return 1;
    //throw { code: 'error occured when check history bingo' };
  }
  
  let historyNums = lodash.split(history.nums, ' ');
  return parseInt(historyNums[parseInt(position)]);
}

// gRuningResult
function updateRunningStatus(bingo, position, record){
  logger.debug('rrrrrrrrrrrrrrrrrrrrrrrrrrrr', position);
  if (!record['rank' + position].issueNo) {
    gRuningResult[parseInt(position)] = '';
    return;
  }else{
    if (bingo){
      gRuningResult[parseInt(position)] = 'issueNo:'+record['rank' 
        + position].issueNo +';' + record['rank' + position].bettingNums + ',T\n' ;
    }else{
      gRuningResult[parseInt(position)] = 'issueNo:'+record['rank' 
        + position].issueNo +';' + record['rank' + position].bettingNums + ',F\n' ;
    }
  }
}

function checkAllBetting(record, targetNo){
    let i = 0;
    for (i = 0; i< 10; i++){
        if (record['rank' + i].issueNo != targetNo){
            return false;
        }
    }
    
    return true;
}

async function betting7(cookie, bettingParaObj, bettingNum, seperaters, position, history, nextBettingTokenStr) {
  // start betting
  if (globalRecord['rank' + position].issueNo == bettingParaObj.issueNo) {
    logger.info('=========betting7===position already betted:', position, globalRecord['rank' + position].issueNo);
    let token = nextBettingTokenStr ? JSON.parse(nextBettingTokenStr).data.token_tz : bettingParaObj.token;
    return { body: '{"msg":"Already betted","code":202,"data":{"MESSAGE":"Already betted","STATUS":100,"token_tz":"' + token + '"}}' };
  }

  if (nextBettingTokenStr) {
    let tokenObj = JSON.parse(nextBettingTokenStr);
    bettingParaObj.token = tokenObj.data.token_tz;
    bettingParaObj.touZhuHaoMa[0].touZhuHaoMa = bettingNum;
  }

  bettingParaObj.touZhuHaoMa[0].touZhuHaoMa = bettingNum;
  bettingParaObj.touZhuHaoMa[0].digit = position;

  let tmpTimes = 0;
  if (!isBingo(position, globalRecord, history)) { // should double
    let small = ['01', '02', '03', '04', '05', '06', '07'];
    let big = ['04', '05', '06', '07', '08', '09', '10'];
    let random = Math.floor(Math.random() * 2);
    if (settings.config.betStategy == 2){
      random = 0;
    }
    if (random == 0){
        if (getHistoryNum(position, globalRecord, history) > 7){
            seperaters[parseInt(position)] = big;
        }else{
            seperaters[parseInt(position)] = small;
        }
    }else{
        seperaters[parseInt(position)] = big;
    }
    //seperaters[parseInt(position)] = ['01', '02', '03', '04', '05', '06', '07'];
    bettingNum = seperaters.join('');
    bettingParaObj.touZhuHaoMa[0].touZhuHaoMa = bettingNum;
    if (globalRecord['rank' + position].times < globalMultiple.length-1) {
      bettingParaObj.touZhuHaoMa[0].touZhuBeiShu = globalMultiple[globalRecord['rank' + position].times + 1];
      tmpTimes = globalRecord['rank' + position].times + 1;
    } else if (globalRecord['rank' + position].times == globalMultiple.length-1) {
      // Double shotDouble loss
      bettingParaObj.touZhuHaoMa[0].touZhuBeiShu = globalMultiple[globalRecord['rank' + position].times -1];
      tmpTimes =0;
    } else {
      bettingParaObj.touZhuHaoMa[0].touZhuBeiShu = globalMultiple[0];
      tmpTimes = 0;
    }
    if(position){
      updateRunningStatus(false, position, globalRecord);
    }
  } else {
    bettingParaObj.touZhuHaoMa[0].touZhuBeiShu = globalMultiple[0];
    tmpTimes = 0;
    if(position){
      updateRunningStatus(true, position, globalRecord);
    }
  }
  logger.info('$$$$$$$$$$$$$$$$$$$$=======position betted:position, tmpTimes, globalRecord[rank + position].times, bettingParaObj.touZhuHaoMa[0].touZhuBeiShu',
    position, tmpTimes, globalRecord['rank' + position].times, bettingParaObj.touZhuHaoMa[0].touZhuBeiShu);
  // start call 
  let opts = {
    url: settings.config.rootUrl + '/cathectic/cathectic.mvc',
    headers: {
      // 'User-Agent': `Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:66.0) Gecko/20100101 Firefox/66.0`,
      Cookie: cookie,
      Accept: '*/*',
      'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:66.0) Gecko/20100101 Firefox/66.0',
      'Accept': 'application/json, text/javascript, */*; q=0.01',
      'Accept-Language': 'zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2',
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-Requested-With': 'XMLHttpRequest',
    },
    method: 'POST',
    timeout: 10000,
    form: { json: JSON.stringify(bettingParaObj) },
  };

  let res;
  try {
    res = await requestPromise(opts);
    let bodyStr = res.body;
    if (bodyStr && JSON.parse(bodyStr).code == 200) {
      globalRecord['rank' + position].times = tmpTimes;
      globalRecord['rank' + position].issueNo = bettingParaObj.issueNo;
      globalRecord['rank' + position].bettingNums = bettingNum;
      logger.info('============kkkkkk=====kkk ========' + gBettingInfo.join('\n'));
      gBettingInfo.push('issueno:'+bettingParaObj.issueNo + '-bettingNum:'+bettingNum + '-times:'
        + globalMultiple[tmpTimes] + '-BALANCE:' + JSON.parse(bodyStr).data.BALANCE);
        
    // TODO:余额不足情况 code = 202
    }else if (bodyStr && JSON.parse(bodyStr).data.STATUS == 1002) {
      logger.error('============error occured when betted===bodyStr:', bodyStr);
	  throw {code: 'RESEND'};
    } else {
      globalBettingFinish = false;
    }
  } catch (err) {
    globalBettingFinish = false;
    throw err;
  }
  return res;
}

// ==========================================================
let bettingArray = [
  ['03,04,05,06,07,08,09'],
  ['03,04,05,06,07,08,09'],
  ['03,04,05,06,07,08,10'],
  ['01,04,05,06,07,08,09'],
  ['01,02,05,06,07,08,09'],
  ['03,04,05,06,07,08,09'],
  ['01,02,05,06,07,08,09'],
  ['03,02,05,06,07,08,10'],
  ['01,04,05,06,07,08,10'],
  ['01,02,05,06,07,09,10']
];

/**
 * record the betting numbers
 */
const globalMultiple =  settings.config.multiple || [1, 4, 18, 81, 365];
let globalRecord = {
  rank0: {
    issueNo: '',
    bettingNums: '',
    result: false,
    times: 0,
  },
  rank1: {
    issueNo: '',
    bettingNums: '',
    result: false,
    times: 0,
  },
  rank2: {
    issueNo: '',
    bettingNums: '',
    result: false,
    times: 0,
  },
  rank3: {
    issueNo: '',
    bettingNums: '',
    result: false,
    times: 0,
  },
  rank4: {
    issueNo: '',
    bettingNums: '',
    result: false,
    times: 0,
  },
  rank5: {
    issueNo: '',
    bettingNums: '',
    result: false,
    times: 0,
  },
  rank6: {
    issueNo: '',
    bettingNums: '',
    result: false,
    times: 0,
  },
  rank7: {
    issueNo: '',
    bettingNums: '',
    result: false,
    times: 0,
  },
  rank8: {
    issueNo: '',
    bettingNums: '',
    result: false,
    times: 0,
  },
  rank9: {
    issueNo: '',
    bettingNums: '',
    result: false,
    times: 0,
  },
}


//// global 
const globalAllNum = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10'];
let globalCookie = ''
let globalCurrentGameNo = '';
let gServiceStatus = 'stop'; // stop - running - normal - forceStop
const gStopRunningLostVal = settings.config.maxLostVal || 50; // forceStop when lost reach stopRunningLostVal
const gStopRunningWinVal = settings.config.maxWinVal || 100; // forceStop when lost reach stopRunningWinVal
let gCurrentLotteryVal = 0;
let globalBettingFinish = 'unknown'; // unknown finished retry
let gRuningResult = [];
let gExceptionMsg = [];
let gBettingInfo = [];
let gBettingInfoShow = [];
let gBettingIssueInfo = [];
////

async function start() {
  try {
    // gExceptionMsg.push('kkkkkkkkkkkkkk');
    // logger.info('===========111ggggggg=======eeeeee===', settings.config);
    globalCookie = await pcIndex();
    logger.debug('1======cookie:', globalCookie);
    await safeAfterlogin(globalCookie);
    globalCookie = await login();
    logger.info('2======cookie:', globalCookie);
    setInterval(intervalBetting, 2 * 1000);
    
  } catch (err) {
    logger.error('error occured when starting:', err);
    gExceptionMsg.splice(0,gExceptionMsg.length);  
    gExceptionMsg.push('error occured when starting, please try to restart');
    logger.info('===========222ggggggg=======eeeeee===' + gExceptionMsg);
  }
}

async function start1() {
  let globalCookie = await login();
  logger.debug('======cookie:', globalCookie);

  let userInfo = await getUserInfo(globalCookie);
  logger.debug('======userInfo:', userInfo.body);

  let initGameRes = await initPk10(globalCookie);
  logger.debug('======initGameRes:', initGameRes.body);

  let bettingObj = buildBettingPara(initGameRes, '');

  // ==== start betting 10 section
  let position = 0;
  let betRes;
  let bodyStr;
  while (position < 10) {
    if (position === 0) {
      betRes = await betting7(globalCookie, bettingObj, bettingArray[position][0]);
    } else {
      bodyStr = betRes.body;
      betRes = await betting7(globalCookie, bettingObj, bettingArray[position][0], bodyStr);
    }
    logger.debug('======bettingObj:', bettingObj);
    position = position + 1;
    if (bodyStr && JSON.parse(bodyStr).code !== 200) {
      position = position + 10;
      logger.debug('11======bodyStr:', bodyStr);
    }
    await sleep(3);
  }

}

function test() {
  let position = 0;
  let recordNums = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10'];
  let historyNums = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10'];
  logger.debug('#############=========check history======position,recordNums, historyNums,[historyNums[parseInt(position)]]):',
    position, recordNums, historyNums, [historyNums[parseInt(position)]]);
  let isBingo = lodash.intersection(recordNums, [historyNums[parseInt(position)]]).length > 0 ? true : false;

  // let token = 'kkkkkkk';
  // let res = { body: '{"msg":"Already betted","code":201,"data":{"MESSAGE":"Already betted","STATUS":100,"token_tz":"' + token + '"}}' };
  // let nextBettingTokenStr = res.body;
  // let tokenN = nextBettingTokenStr ? JSON.parse(nextBettingTokenStr).data.token_tz : 'bettingParaObj.token';
  logger.debug('=========ttttttttttt==========', isBingo);
}


function copyArr(srcArr, targetArr) {
    targetArr.splice(0, targetArr.length);
    for (let i = 0; i < srcArr.length; i++) {
        targetArr.push(srcArr[i]);
    } 
    return targetArr; 
}

function getBettingNum(){
    let totalLottery = ['01,02,03,04,05,06,07',
        '02,03,04,05,06,07,08',
        '03,04,05,06,07,08,09',
        '04,05,06,07,08,09,10',
        '01,02,03,08,09,10,04',
        '01,02,03,08,09,10,05',
        '01,02,03,08,09,10,06',
        '01,02,03,08,09,10,07'];
    let indexArr = [0, 1, 2, 3, 4, 5, 6, 7];
    let theNumIndex = lodash.shuffle(indexArr)[0];
    let theNum = totalLottery[0];
    if (settings.config.betStategy == 1){
      theNum = totalLottery[theNumIndex];
    }
    
    return theNum;
}

let closetime = 0;
async function intervalBetting() {
    //logger.debug('test=========end');
    //return;
  try {
    //globalCookie = await login();
    const cookie = globalCookie;
    let userInfoRes = await getUserInfo(cookie);
    let userInfoBody = JSON.parse(userInfoRes.body);
    let currentTime = new Date().getTime();

    if (gServiceStatus == 'running') {
      logger.debug(' service is running');
      return;
    }

    if (gServiceStatus == 'forceStop') {
      logger.debug(' service is forceStop');
      return;
    }

    // if (closetime && currentTime < closetime) {
    //   logger.debug(' waitting for next round current and closetime:', currentTime,
    //     closetime, 'ext: ' + (closetime - currentTime) / 1000 + 's');
    //   if (!userInfoBody || userInfoBody.code !== 200) {
    //     logger.debug('balance: ' + userInfoBody.data.lotteryBal);
    //   }
    //   return;
    // }

    gServiceStatus = 'running';
    
    

    if (userInfoBody.code !== 200) {
      logger.error('get error response userInfo======userInfoBody:', userInfoBody);
      gExceptionMsg.splice(0,gExceptionMsg.length);  
      gExceptionMsg.push('get error response userInfo======userInfoBody:', userInfoBody);
      gServiceStatus = 'normal';
      return;
    }

    logger.info('userInfo======lotteryBal:', userInfoBody.data.lotteryBal);
    if (gCurrentLotteryVal == 0) {
      gCurrentLotteryVal = userInfoBody.data.lotteryBal;
    }

    let forceStopLostVal = gCurrentLotteryVal - gStopRunningLostVal;
    if (userInfoBody.data.lotteryBal < forceStopLostVal) {
      gServiceStatus = 'forceStop';
      logger.warn('Warning !!! reach force stop lost value:', userInfoBody.data.lotteryBal, forceStopLostVal);
      return;
    }

    let forceStopWinVal = gCurrentLotteryVal + gStopRunningWinVal;
    if (userInfoBody.data.lotteryBal >= forceStopWinVal) {
      gServiceStatus = 'forceStop';
      logger.warn('Warning !!! reach force stop win value:', userInfoBody.data.lotteryBal, forceStopWinVal);
      return;
    }

    let initGameRes = await initPk10(cookie);
    let gameBody = JSON.parse(initGameRes.body);

    if (gBettingInfo.length > 0){
      copyArr(gBettingInfo, gBettingInfoShow);
    }
    let currentNo = gameBody.data.current.lotteryNums.issueno;
    // closetime = gameBody.data.current.lotteryNums.closetime;
    let history = gameBody.data.history[gameBody.data.history.length - 1];
    logger.debug('previous result======res:', gameBody.data.history.length, history);
    
    gBettingIssueInfo[0] = 'current issueNo:' + currentNo + ' refresh Time:' + new Date();
    gBettingIssueInfo[1] = 'previous issueNo info:' + history.issueno + ' result:' + history.nums;
    if (parseInt(currentNo) !== (parseInt(history.issueno) + 1)) {
      logger.info('waitting...data not refresh check next round======currentNo, historyIssuno:', currentNo, history.issueno);
      gServiceStatus = 'normal';
      return;
    }
    
    if (checkAllBetting(globalRecord, currentNo)){
      gBettingInfo.splice(0, gBettingInfo.length);
    }

    closetime = (new Date(gameBody.data.current.closeTime)).getTime();
    let isclose = gameBody.data.current.isclose;

    // TODO: add checking time

    if (isclose) {
      logger.info('already close======currentGameNo:', globalCurrentGameNo);
      gServiceStatus = 'normal';
      return;
    }

    logger.info('======initGameRes currentNo, globalCurrentGameNo:', currentNo, globalCurrentGameNo);
    if ((globalCurrentGameNo != '' && globalCurrentGameNo == currentNo) && globalBettingFinish) {
      logger.debug('already betting======currentGameNo:', globalCurrentGameNo);
      gServiceStatus = 'normal';
      return;
    } else {
      globalCurrentGameNo = currentNo;
    }

    let bettingObj = buildBettingPara(initGameRes, '');
    // ==== start betting 10 section
    let betRes;
    let bodyStr;
    let betNums = '';
    let digits = '';
    let positionArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    globalBettingFinish = true; // set expect value
    for (let position of positionArray) {
      let seperaters = ['|', '|', '|', '|', '|', '|', '|', '|', '|', '|'];
      let randomNum = lodash.shuffle(globalAllNum).slice(0, 7);
      betNums = getBettingNum(); //randomNum; // bettingArray[position][0];
      seperaters[position] = betNums;
      betNums = seperaters.join('');
      if (position === 0) {
        digits = position.toString();
        betRes = await betting7(globalCookie, bettingObj, betNums, seperaters, digits, history);
      } else {
        bodyStr = betRes.body;
        digits = position.toString();
        betRes = await betting7(globalCookie, bettingObj, betNums, seperaters, digits, history, bodyStr);
      }
      logger.info('finish this section:', betRes.body);
      if (betRes && betRes.body && JSON.parse(betRes.body).code == 202) {
        logger.debug('bbbbbbbbbetting not success, do not sleep');
      } else {
        await sleep(3);
      }
       logger.info('====00000000=======0000000', gBettingInfo.length);
      if (gBettingInfo.length > 0){
        copyArr(gBettingInfo, gBettingInfoShow);
        logger.info('====00000000=======00000001111111', gBettingInfoShow);
      }
    }
    logger.info('finish this round record:', currentNo, globalRecord);
    if (gBettingInfo.length > 0){
      copyArr(gBettingInfo, gBettingInfoShow);
    }
  } catch (err) {
    if (err.code && ((err.code == 'ESOCKETTIMEDOUT' && !globalBettingFinish) || err.code == 'RESEND')) {
      globalCurrentGameNo = '';
    }
    logger.error('======err:', err);
    // await logout(globalCookie);
    gServiceStatus = 'normal';
  }
  
  gServiceStatus = 'normal';
  logger.debug('betting7======serviceStatus:', gServiceStatus);
  if (gBettingInfo.length > 0){
      copyArr(gBettingInfo, gBettingInfoShow);
  }
}

// start();
//test();
exports.start = start;
exports.settings = settings;
exports.results = gRuningResult;
exports.exceptionMsg = gExceptionMsg;
exports.gBettingInfo = gBettingInfo;
exports.gBettingInfoShow = gBettingInfoShow;
exports.gBettingIssueInfo = gBettingIssueInfo;
