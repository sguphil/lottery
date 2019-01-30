let lodash = require('lodash');
let random = require('random');

function getBettingNum(pos = undefined){
    let totalLottery = [['01','02','03','04','05','06','07'],
    ['02','03','04','05','06','07','08'],
    ['03','04','05','06','07','08','09'],
    ['04','05','06','07','08','09','10'],
    ['01','02','03','08','09','10','04'],
    ['01','02','03','08','09','10','05'],
    ['01','02','03','08','09','10','06'],
    ['01','02','03','08','09','10','07']
];

    let indexArr = [0, 1, 2, 3, 4, 5, 6, 7];
    let theNumIndex = lodash.shuffle(indexArr)[0];
    theNum = totalLottery[theNumIndex];
    if (pos != undefined){
        theNum = totalLottery[pos];
    }
    
    return theNum;
}



function multipleBetNums(){
    let small = ['01', '02', '03', '04', '05', '06', '07'];
    let big = ['04', '05', '06', '07', '08', '09', '10'];
    let globalAllNum = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10'];
    let i = 0;
    let betNums = getBettingNum(0); //small;
    let continueLost = 0;
    let record = [];
    let lotteryRecord = [];
    let stickTimes = 0;
    let limit = 3;
    while(i < 180){
        let num = random.int(0,9);
        //console.log('index=============', num);
        let lotteryNum = globalAllNum[num]; //lodash.shuffle(globalAllNum)[0]; // get position 1 lottery num
        let isBingo = lodash.intersection([lotteryNum], betNums).length > 0 ? true: false;
        if (isBingo){
            continueLost = 0;
            record = [];
            stickTimes = 0;
        }else{
            record.push(lotteryNum);
            lotteryRecord.push(betNums.join(','));
            continueLost = continueLost + 1;
            if (parseInt(lotteryNum) > 7){
                if (stickTimes > limit) {
                    betNums = getBettingNum(0);
                }else{
                    betNums = getBettingNum(3);
                }
                // betNums = getBettingNum(3);
            }else{
                if (stickTimes > limit) {
                    betNums = getBettingNum(3);
                }else{
                    betNums = getBettingNum(0);
                }
                // betNums = getBettingNum();
            }
            stickTimes = stickTimes +1;
        }
        
        if (continueLost > 4){
            console.log('==================boom!!!====', i , '======bet===', lotteryRecord.length, lotteryRecord, '======record===', record);
            return i;
        }
        
        i = i+1;
    }

    return i;
}

let j = 0;
let result = 0;
let testTimes = 1800;
while(j < testTimes){
   result = result + multipleBetNums();
   j = j+1;
}

console.log('ava=================boom!!!====', result/testTimes);
