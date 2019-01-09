let request = require('request');
let rp = require('request-promise');
let lodash = require('lodash');
const settings = require('./config');
const uuidv1 = require('uuid/v1');

// process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

console.log('start test...', settings.config);
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
  console.log('======login test====', res.body);
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
  let username = gameInfo.data.username;
  let userBonus = gameInfo.data.userBonus;
  let issueNo = gameInfo.data.current.lotteryNums.issueno;
  console.log('=======111=====token_tz:', token_tz);
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
      'danZhuJinEDanWei': 100,  //100 --2 fen
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
    console.log('=========check history bingo error======', history.issueno, record['rank' + position].issueNo);
    throw 'error occured when check history bingo';
  }

  let recordNums = lodash.split(lodash.trimEnd(lodash.trimStart(record['rank' + position].bettingNums, '|'), '|'), ',');
  let historyNums = lodash.split(history.nums, ' ');

  let isBingo = lodash.intersection(recordNums, historyNums).length > 0 ? true : false;
  return isBingo;
}

async function betting7(cookie, bettingParaObj, bettingNum, position, history, nextBettingTokenStr) {
  // start betting
  if (globalRecord['rank' + position].issueNo == bettingParaObj.issueNo){
    console.log('=========betting7===position already betted:', position, globalRecord['rank' + position].issueNo);
    return;
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
    if (globalRecord['rank' + position].times < globalMultiple.length) {
      bettingParaObj.touZhuHaoMa[0].touZhuBeiShu = globalMultiple[globalRecord['rank' + position].times];
      tmpTimes = globalRecord['rank' + position].times + 1;
    } else {
      bettingParaObj.touZhuHaoMa[0].touZhuBeiShu = globalMultiple[0];
      tmpTimes = 0;
    }
  } else {
    bettingParaObj.touZhuHaoMa[0].touZhuBeiShu = globalMultiple[0];
    tmpTimes = 0;
  }

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

  let res = await requestPromise(opts);
  let bodyStr = res.body;
  if (bodyStr && JSON.parse(bodyStr).code == 200) {
    globalRecord['rank' + position].times = tmpTimes;
    globalRecord['rank' + position].issueNo = bettingParaObj.issueNo;
    globalRecord['rank' + position].bettingNums = bettingNum;
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
const globalMultiple = [1, 4, 18, 81, 365];
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

let allNum = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10'];
let bettingNum1 = '01,02,03,04,05,06,07';//'01,02,03,04,05,06,07,08,09,10';
let bettingNum2 = '03,04,05,06,07,08,09';
let bettingNum3 = '03,04,05,06,07,08,09';
let bettingNum4 = '01,04,05,06,07,08,09';
let bettingNum5 = '01,02,05,06,07,08,09';
let bettingNum6 = '03,04,05,06,07,08,09';
let bettingNum7 = '01,02,05,06,07,08,09';
let bettingNum8 = '03,04,05,06,07,08,10';
let bettingNum9 = '01,04,05,06,07,08,10';
let bettingNum10 = '01,02,05,06,07,09,10';

//// global 
let globalCookie = ''
let currentGameNo = '';
let serviceStatus = 'stop'; // stop - running - normal - forceStop
const stopRunningVal = settings.config.maxLostVal || 50; // forceStop when lost reach stopRunningval
let currentLotteryVal = 0;
////

async function start() {
  try {
    globalCookie = await pcIndex();
    console.log('1======cookie:', globalCookie);
    await safeAfterlogin(globalCookie);
    globalCookie = await login();
    console.log('2======cookie:', globalCookie);
    setInterval(intervalBetting, 2 * 1000);
  } catch (err) {
    console.log('error occured when starting:', err);
  }
}

async function start1() {
  let globalCookie = await login();
  console.log('======cookie:', globalCookie);

  let userInfo = await getUserInfo(globalCookie);
  console.log('======userInfo:', userInfo.body);

  let initGameRes = await initPk10(globalCookie);
  console.log('======initGameRes:', initGameRes.body);

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
    console.log('======bettingObj:', bettingObj);
    position = position + 1;
    if (bodyStr && JSON.parse(bodyStr).code !== 200) {
      position = position + 10;
      console.log('11======bodyStr:', bodyStr);
    }
    await sleep(3);
  }

}

function test(){
  let recordNums = lodash.split(lodash.trimEnd(lodash.trimStart('01,02,03,04,05,06,07|||||||||', '|'), '|'), ',');
  let historyNums = lodash.split('01 04 02 05 06 03 08 09 07 10', ' ');
  console.log('=========ttttttttttt==========', recordNums);
  console.log('=========ttttttttttt==========', historyNums );
  console.log('=========ttttttttttt==========', lodash.intersection(recordNums, historyNums).length );
}


let closetime = 0;
async function intervalBetting() {
  try {
    //globalCookie = await login();
    const cookie = globalCookie;
    let userInfoRes = await getUserInfo(cookie);
    let userInfoBody = JSON.parse(userInfoRes.body);
    let currentTime = new Date().getTime();

    if (serviceStatus == 'running') {
      console.log(' service is running');
      return;
    }

    if (serviceStatus == 'forceStop') {
      console.log(' service is forceStop');
      return;
    }

    // if (closetime && currentTime < closetime) {
    //   console.log(' waitting for next round current and closetime:', currentTime,
    //     closetime, 'ext: ' + (closetime - currentTime) / 1000 + 's');
    //   if (!userInfoBody || userInfoBody.code !== 200) {
    //     console.log('balance: ' + userInfoBody.data.lotteryBal);
    //   }
    //   return;
    // }

    serviceStatus = 'running';

    if (userInfoBody.code !== 200) {
      console.log('get error response userInfo======userInfoBody:', userInfoBody);
      serviceStatus = 'normal';
      return;
    }

    console.log('userInfo======lotteryBal:', userInfoBody.data.lotteryBal);
    if (currentLotteryVal == 0) {
      currentLotteryVal = userInfoBody.data.lotteryBal;
    }

    let forceStopVal = currentLotteryVal - stopRunningVal;
    if (userInfoBody.data.lotteryBal < forceStopVal) {
      serviceStatus = 'forceStop';
      console.log('Warning !!! reach force stop value:', userInfoBody.data.lotteryBal);
      return;
    }

    console.log('====================11111111=====');

    let initGameRes = await initPk10(cookie);
    let gameBody = JSON.parse(initGameRes.body);

    let currentNo = gameBody.data.current.lotteryNums.issueno;
    // closetime = gameBody.data.current.lotteryNums.closetime;
    let history = gameBody.data.history[gameBody.data.history.length - 1];
    console.log('previous result======res:', gameBody.data.history.length, history);
    if (parseInt(currentNo) !== (parseInt(history.issueno) + 1)) {
      console.log('data not refresh check next round======currentNo, historyIssuno:', currentNo, history.issueno);
      serviceStatus = 'normal';
      return;
    }

    closetime = (new Date(gameBody.data.current.closeTime)).getTime();
    let isclose = gameBody.data.current.isclose;

    // TODO: add checking time

    if (isclose) {
      console.log('already close======currentGameNo:', currentGameNo);
      serviceStatus = 'normal';
      return;
    }

    console.log('======initGameRes currentNo:', currentNo);
    if (!currentGameNo && currentGameNo == currentNo) {
      console.log('already betting======currentGameNo:', currentGameNo);
      serviceStatus = 'normal';
      return;
    } else {
      currentGameNo = currentNo;
    }
    
    let bettingObj = buildBettingPara(initGameRes, '');
    // ==== start betting 10 section
    let betRes;
    let bodyStr;
    let betNums = '';
    let digits = '';
    let positionArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    for (let position of positionArray) {
      let seperaters = ['|', '|', '|', '|', '|', '|', '|', '|', '|', '|'];
      let randomNum = lodash.shuffle(allNum).slice(0, 7);
      betNums = randomNum; // bettingArray[position][0];
      seperaters[position] = betNums;
      betNums = seperaters.join('');
      if (position === 0) {
        digits = position.toString();
        betRes = await betting7(globalCookie, bettingObj, betNums, digits, history);
      } else {
        bodyStr = betRes.body;
        digits = position.toString();
        betRes = await betting7(globalCookie, bettingObj, betNums, digits, history, bodyStr);
      }
      console.log('finish this section:', betRes.body);
      await sleep(3);
    }
    console.log('finish this round record:', globalRecord);
  } catch (err) {
    if (err.code && err.code == 'ESOCKETTIMEDOUT'){
      currentGameNo = '';
    }
    console.log('======err:', err);
    // await logout(globalCookie);
    serviceStatus = 'normal';
  }

  serviceStatus = 'normal';
  console.log('betting7======serviceStatus:', serviceStatus);
}

start();
// test();
