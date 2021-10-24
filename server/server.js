/* 引入express框架 */
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const configPath = './config.json';
const app = express();

app.use(cors());

var configStr = fs.readFileSync(configPath);
var config = JSON.parse(configStr);

const mysql = require('mysql');

const mysqlConfig = {
    host     : 'localhost',
    user     : 'root',
    password : 'Hehenihao123!',
    database : 'yibanleave'
}

var pool = mysql.createPool(mysqlConfig)


/* 监听端口 */
app.listen(8088, () => {
    log('-----------service running-----------');
})

app.get('/api/getStatus', (req, res) => {
    res.send(getStatus());
})
app.get('/api/statusExchange', (req, res) => {
    statusExchange(parseInt(req.query.status));
    res.send('change successfully');
})
//检查动态密码
app.get('/api/checkDynamicPswList', (req, res) => {
	pool.getConnection(function(err, conn) {
        var sqlStr = 'select * from dynamicpsw;'
        conn.query(sqlStr, (err, results) => {
            if (err) {
                log('[SElECT ERROR] - ' + err.message);
                res.json({ code: 10001, message: err });
                return;
            }
            log("checking dynamic password list");
            checkDyPsw(results);
        })
        conn.release();
    })
})

//检查动态密码是否存在
app.get('/api/getDynamicPswBool', (req, res) => {
	pool.getConnection(function(err, conn) {
		var sqlStr = 'select * from dynamicpsw;'
		conn.query(sqlStr, (err, results) => {
            if (err) {
                log('[SElECT ERROR] - ' + err.message);
                res.json({ code: 10001, message: err });
                return;
            }

            let flag = false;
            for (let i = 0; i < results.length; i++)
            {
                console.log(results[i].psw + " " + req.query.psw);
                if (results[i].psw == req.query.psw)
                {
                    flag = true;
                    break;
                }
            }
            res.json({ code: 10000, message: flag});
            log("check is dynamic password true");
        })
		conn.release();
	})
})
//保存动态密码
app.get('/api/saveDynamicPsw', (req, res) => {
    pool.getConnection(function(err, conn) {
		var date = new Date();
		date.setHours(date.getHours() + 8);
        var sqlStr = 'insert dynamicpsw set psw = ?, time = ?;';
        var data = [req.query.psw, date];
        conn.query(sqlStr, data, (err, results) => {
            if (err) {
                log('[INSERT ERROR] - ' + err.message);
                res.json({ code: 10001, message: err });
                return;
            }
            res.send("save successfully");
            log("save dynamicpassword " + req.query.psw + " to database");
        })
        conn.release();
    })
})
//编辑
app.get('/api/editUsrData', (req, res) => {
    pool.getConnection(function(err, conn) {
        var sqlStr = 'update usrdata set name = ?, clg = ?, mjcls = ?, tcr = ?, type = ?, leaveS = ?, leaveB = ?, way = ?, route = ?, rsn = ?, stel = ?, ptel = ? where id = ?;';
        var data = [
            req.query.name,
            req.query.clg,
            req.query.mjcls,
            req.query.tcr,
            req.query.type,
            req.query.leaveS,
            req.query.leaveB,
            req.query.way,
            req.query.route,
            req.query.rsn,
            req.query.stel,
            req.query.ptel,
			req.query.id
        ]
        conn.query(sqlStr, data, (err, results) => {
            if(err){
                log('[UPDATE ERROR] - '+ err.message);
                res.json({ code: 10001, message: err })
                return;
            }   
            res.send("update successfully");
            log("Update data to database");
        })
        conn.release();
    })
})
//续期
app.get('/api/addDate', (req, res) => {
    pool.getConnection(function(err, conn){
        var timeObj = getTimeObject(req.query.day);
        var sqlStr = 'update usrdata set begin = ?, end = ?, apply = ? where id = ?;';
        var data = [timeObj.begin, timeObj.end, timeObj.apply, req.query.id];

        conn.query(sqlStr, data, (err, results) => {
            if(err){
                log('[UPDATE ERROR] - '+ err.message);
                res.json({ code: 10001, message: err })
                return;
            }   
            res.send("update successfully");
            log("Update data to database");
			log("Update information: User ID:" + req.query.id + ", updated day: " + req.query.day);
        })
        conn.release();
    });
})

//查询信息
app.get('/api/getUsrDataMysql', (req, res) => {
    pool.getConnection(function(err, conn){
        var sqlStr = 'SELECT * FROM usrdata where id = \'' + req.query.id + '\';';
        conn.query(sqlStr, (err, results) => {
            if(err){
                log('[SELECT ERROR] - '+err.message);
                res.json({ code: 10001, message: err })
                return;
            }
            res.json({ code: 10000, message: results })
            log("Get " + req.query.id + " data from database");
        })
        conn.release();
    });
})
//删除信息
app.get('/api/delUsrDataMysql', (req, res) => {

    pool.getConnection(function(err, conn){
        var sqlStr = 'DELETE FROM usrdata WHERE id = \'' + req.query.id + '\';';
        conn.query(sqlStr, (err, results) => {
            if(err){
                log('[DELETE ERROR] - '+ err.message);
                res.json({ code: 10001, message: err })
                return;
            }
            log("Delete data " + req.query.id + " from database");
            res.send("delete successfully")
        })
        conn.release();
    });
})

//获取已知用户信息
app.get('/api/getUsrList', (req, res) => {
    pool.getConnection(function(err, conn){
        var sqlStr = 'SELECT name, id FROM usrdata;';
        conn.query(sqlStr, (err, results) => {
            if(err){
                log('[SELECT ERROR] - ', err.message);
                res.json({ code: 10001, message: err })
                return;
            }
            res.json({ code: 10000, message: results })
            log("Get user list from database");
        });
        conn.release();
    });
    
})

//增加信息
app.get('/api/saveUsrDataMysql', (req, res) => {
    pool.getConnection(function(err, conn){
        var sqlStr = 'insert into usrdata (name, id, clg, mjcls, tcr, type, leaveS, leaveB, way, route, rsn, begin, end, apply, stel, ptel) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);';
        const usrData = usrDataExchange(req.query);
        var data = [
            usrData.name,
            usrData.id,
            usrData.clg,
            usrData.mjcls,
            usrData.tcr,
            usrData.type,
            usrData.leaveS,
            usrData.leaveB,
            usrData.way,
            usrData.route,
            usrData.rsn,
            usrData.begin,
            usrData.end,
            usrData.apply,
            usrData.stel,
            usrData.ptel
        ]
        conn.query(sqlStr, data, (err, results) => {
            if(err){
                log('[INSERT ERROR] - '+ err.message);
                res.json({ code: 10001, message: err })
                return;
            }   
            res.send("save successfully");
            log("Save data to database");
        })
        conn.release();
    });
})

function checkDyPsw(results)
{
    var toDel = [];
    for (var i = 0; i < results.length; i++)
    {
        var msData = new Date(results[i].time);
        msData.setHours(msData.getHours() - 8);
        var msMid = new Date(msData.getFullYear() + "/" + (msData.getMonth() + 1) + "/" + (msData.getDate()) + " " + msData.getHours() + ":" + msData.getMinutes() + ":" + msData.getSeconds());
        // 如果大于五分钟，进行删除操作
		// console.log(msMid + '\n' + new Date());
        if(new Date().getTime() - msMid.getTime() > 300000)
        {
            toDel.push(results[i].psw);
        }
    }


        // console.log(toDel[i]);
        pool.getConnection(function(err, conn) {
			for (var i = 0; i < toDel.length; i++)
			{
				var del = toDel[i];
				conn.query('delete from dynamicpsw where psw = \'' + del + '\'', (err, res) => {
                if(err) {
                    log('[DELETE ERROR] - ' + err.message);
                    //res.json({ code: 10001, message: error })
                    return;
                }
				//无法正确显示每一个被删除的密码
                log("Delete data " + del + " from database");
				});
			}
            
            conn.release();
        })
    
}
function usrDataExchange(usrData)
{
    var usrDataEx = {
        name: "",   //姓名
        id: "",     //学号
        clg: "",    //学院
        mjcls: "",  //专业班级
        tcr: "",    //辅导员
        type: "",   //请假类型
        leaveS: true,     //是否离开学校
        leaveB: false,     //是否离开保定
        way: "",    //离开方式
        route: "",  //路线
        rsn: "",    //理由
        begin: "",  //开始
        end: "",    //结束
        apply: "",  //申请
        stel: "",   //学生电话
        ptel: ""    //家长电话
    };

    // ?id=2019614270303&name=张光伟&clg=现代科技学院&mjcls=计算机科学与技术1903&tcr=薛冰&type=事假&leaveS=true&leaveB=false&way=公交车&route=学校到家&rsn=回家&day=28&stel=1008611&ptel=10086
    usrDataEx.name = usrData.name;
    usrDataEx.id = usrData.id;
    usrDataEx.clg = usrData.clg;
    usrDataEx.mjcls = usrData.mjcls;
    usrDataEx.tcr = usrData.tcr;
    usrDataEx.type = usrData.type;
    usrDataEx.leaveS = usrData.leaveS;
    usrDataEx.leaveB = usrData.leaveB;
    usrDataEx.way = usrData.way;
    usrDataEx.route = usrData.route;
    usrDataEx.rsn = usrData.rsn;
    var timeObj = getTimeObject(usrData.day);
    usrDataEx.begin = timeObj.begin;
    usrDataEx.end = timeObj.end;
    usrDataEx.apply = timeObj.apply;
    usrDataEx.stel = usrData.stel;
    usrDataEx.ptel = usrData.ptel;
    
    return usrDataEx;
}

//自动获取时间
function getTimeObject(day)
{
    var now = new Date();
    var next = new Date();
    var pre = new Date();
    next.setDate(now.getDate() + parseInt(day));
    pre.setDate(now.getDate() - 1);
    var timeObj = {begin: "", end: "", apply: ""};

    timeObj.begin = now.getFullYear() + "-" + stringfy(now.getMonth() + 1) + "-" + stringfy(now.getDate()) + " " + stringfy(getRndInteger(8, 11)) + ":" + stringfy(getRndInteger(0, 59)) + ":" + stringfy(getRndInteger(0, 59));
    timeObj.end = next.getFullYear() + "-" + stringfy(next.getMonth() + 1) + "-" + stringfy(next.getDate()) + " " + stringfy(getRndInteger(20, 22)) + ":" + stringfy(getRndInteger(0, 15)) + ":" + stringfy(getRndInteger(0, 59));
    timeObj.apply = pre.getFullYear() + "-" + stringfy(pre.getMonth() + 1) + "-" + stringfy(pre.getDate()) + " " + stringfy(getRndInteger(8, 11)) + ":" + stringfy(getRndInteger(0, 59)) + ":" + stringfy(getRndInteger(0, 59));
    return timeObj;
}

//获取随机数
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

//字符串格式化
function stringfyU(ph, digit, str) {
    var ans = "";
    var n = digit - str.toString().length;
    for (var i = 0; i < n; i++)
    {
        ans += ph;
    }
    ans += str;
    return ans;
}
function stringfy(str) {
    const ph = '0';
    const digit = 2;
    var ans = "";
    var n = digit - str.toString().length;
    for (var i = 0; i < n; i++)
    {
        ans += ph;
    }
    ans += str;
    return ans;
}

function getCurrentTime() {
    var date = new Date();
    return "[" + stringfyU("0", 4, date.getFullYear()) + "-" + stringfy(date.getMonth() + 1) + "-" + stringfy(date.getDate()) + " " + stringfy(date.getHours()) + ":" + stringfy(date.getMinutes()) + ":" + stringfy(date.getSeconds()) + "]";
}

function log(str) {
    console.log(getCurrentTime() + " " + str);
}

function getStatus() {
    log('readData');
    var readData = fs.readFileSync(configPath, 'utf-8');
    jsonData = JSON.parse(readData);
    log('read:' + jsonData.status);
    return jsonData.status;
}

function statusExchange(status) {
    try {
        var data = JSON.stringify({
            status: status // 0为正常状态，1为紧急状态
        });
        fs.writeFileSync(configPath, data, 'utf-8');
    }
    catch (e) {
        console.warn('ERROR ' + e);
    }
}