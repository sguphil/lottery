let request = require('request');
const uuidv1 = require('uuid/v1');

//登陆post地址
let url = 'https://123.jn700.com/login/login.mvc?username=kgcphy00&password=1038463vWx&_BrowserInfo=firefox/66.0';

//设置头部
let headers = {
    // 'User-Agent': `Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:66.0) Gecko/20100101 Firefox/66.0`,
    Accept: '*/*',
};

let opts = {
    url: url,
    method: 'POST',
    headers: headers,
};

console.log('start test...');
//模拟登陆
request(opts, (e, r, b) => {
    console.log('=====1', e);
    let setCookie = r.headers['set-cookie'];
    console.log(setCookie);
    //登陆后访问首页
    let opts = {
        url: "https://123.jn700.com/userInfo/simple-info.mvc",
        headers: {
            // 'User-Agent': `Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:66.0) Gecko/20100101 Firefox/66.0`,
            Cookie: setCookie, //这里是登陆后得到的cookie,(重点)
            Accept: '*/*'
        },
        method: 'POST'
    };
    request(opts, (e, r, b) => {
        console.log('=====2', e);
        console.log(setCookie);
        console.log(r.headers['set-cookie']);
        console.log('是否login成功：e', e);
        console.log('是否login成功：b', b);
        // init pk10
        let opts = {
            url: "https://123.jn700.com/gameType/initGame.mvc?gameID=19",
            headers: {
                // 'User-Agent': `Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:66.0) Gecko/20100101 Firefox/66.0`,
                Cookie: setCookie,
                Accept: '*/*',
            },
            method: 'POST'
        };

        request(opts, (e, r, b) => {
            console.log('=====3', e);
            console.log(setCookie);
            console.log(r.headers['set-cookie']);
            console.log('是否init成功：e', e);
            console.log('是否init成功：b', b);
            let body = JSON.parse(b);
            let token_tz = body.data.token_tz;
            let username = body.data.username;
            let userBonus = body.data.userBonus;
            let issueNo = body.data.current.lotteryNums.issueno;
            let bettingNum1 = "03,04,05,06,07,08,09|||||||||";
            let bettingNum2 = "|03,04,05,06,07,08,09||||||||";
            let bettingNum3 = "||03,04,05,06,07,08,09|||||||";
            let bettingNum4 = "|||01,04,05,06,07,08,09||||||";
            let bettingNum5 = "||||01,02,05,06,07,08,09|||||";
            let bettingNum6 = "|||||03,04,05,06,07,08,09||||";
            let bettingNum7 = "||||||01,02,05,06,07,08,09|||";
            let bettingNum8 = "|||||||03,04,05,06,07,08,10||";
            let bettingNum9 = "||||||||01,04,05,06,07,08,10|";
            let bettingNum10 = "|||||||||01,02,05,06,07,09,10";

            let token = uuidv1();

            let bettingParaObj = { "gameId": 19, 
            "token": token_tz, 
            "issueNo": issueNo, 
            "zhuiHaoQiHao": [], 
            "tingZhiZhuiHao": "false", 
            "touZhuHaoMa": [{
                 "wanFaID": 1840, 
                 "touZhuHaoMa": bettingNum3, 
                 "touZhuBeiShu": 1, 
                 "danZhuJinEDanWei": 100,  //100 --2 fen
                 "yongHuSuoTiaoFanDian": 0, 
                 "digit": "0", 
                 "bouse": userBonus,
                 "zhuShu": 7 }] };
            
            // start call 
            let opts = {
                url: "https://123.jn700.com/cathectic/cathectic.mvc",
                headers: {
                    // 'User-Agent': `Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:66.0) Gecko/20100101 Firefox/66.0`,
                    Cookie: setCookie,
                    Accept: '*/*',
                },
                method: 'POST',
                //json:true,
                //body:bettingParaObj
                form:{json: JSON.stringify(bettingParaObj)},
            };

            console.log('==========k:', bettingParaObj);
            request(opts, (e, r, b) => {
                console.log('=====4', e);
                console.log(setCookie);
                console.log(r.headers['set-cookie']);
                console.log('是否betting成功：e', e);
                console.log('是否betting成功：b', b);
            });
        });
    });
});

