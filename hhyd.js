/**
 * By：花落分享
 * 
 * 脚本一天执行一次就好
 * 
 * cron 25 9 * * *
 *
 * 注册地址：
 * http://wanmei.rrsee.cn/ringlike/ringlike/ringlike/ringlikecode/wsCTeDZa
 * 
 * ========= 抓包 =========
 * 抓取域名：http://wanmei.rrsee.cn
 * 请求体：user_id=888888&mobile=18888888888&token=xxxxxxxxxx
 
 * ========= 青龙 =========
 * 变量名: wmsjToken
 * 变量值：user_id=888888&mobile=18888888888&token=xxxxxxxxxx
 * 多个账号用 @分割
 */
const jsname = '花花阅读'
const $ = new Env(jsname);

// 是否打印日志
const logs = 0;

const axios = require('axios');
const QS = require('qs');


// 开始执行
$.log("🔔花花阅读V1.0	By:花落分享🔔");


// 获取环境变量
let userCookie = process.env.hhydToken || '';

// ck集合
let userList = []

let userCount = 0

let sleep = 6000;

// console.log('\n ------------- 共'+tlms.length+'个账号 -------------');

!(async () => {
    if(!(await checkEnv())) return;

    for (let i = 0; i < userList.length; i++) {
        let user = userList[i];
        
        console.log('\n 开始第'+(i+1)+'个账号');
        
        // 查询个人信息
        let result = await getUserInfo(user);
        if (result.read >= result.max) {
            console.log('\n 今日阅读完成，脚本结束...');
        }else{
            // console.log(`\n ${sleepM}秒后开始领取灵石...`);
            await $.wait(sleep);
            // 开始阅读
            await readd(user);
            
            await $.wait(sleep);
            await getMsg(user);
            
            await $.wait(sleep);
            await statAccess(user);
            
            await $.wait(sleep);
            await submitt(user);
        }
    }
})()
    .catch((e) => $.logErr(e))
.finally(() => $.done())


/**
 * 校验CK
 */
async function checkEnv() {
    if(userCookie) {
        for(let userCookies of userCookie.split('@')) {
            if(userCookies) userList.push(userCookies)
        }
        userCount = userList.length
    } else {
        console.log('\n 未找到CK')
        return;
    }

    console.log(`\n ------------- 共${userCount}个账号 -------------`)
    return true
}

/**
 * 获取用户信息
 */
async function getUserInfo(token) {
    var tokens = token.split('&');
    var param = {
        'un':tokens[0],
        'token':tokens[1],
        'pageSize':20
    }
    return new Promise((resolve) => {

        let nm = {
            url: `http://u.wyexin.cn/api/user/info`,
            body: JSON.stringify(param),
            headers: {
                'User-Agent':'Mozilla/5.0 (Linux; Android 10; MI 10 Build/QKQ1.190716.003; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/86.0.4240.99 XWEB/4255 MMWEBSDK/20220402 Mobile Safari/537.36 MMWEBID/9132 MicroMessenger/8.0.22.2140(0x28001637) WeChat/arm64 Weixin NetType/WIFI Language/zh_CN ABI/arm64',
                'Content-Type': 'application/json; charset=utf-8',
                'Host':'u.wyexin.cn'
            },
            rejectUnauthorized:false
        }
        $.post(nm, async (error, response, data) => {
            //console.log(`${JSON.stringify(nm)}`)
            try {
                const resultData = JSON.parse(data)
                
                var result = resultData.result;
                console.log(`\n 今日已阅读：${result.read}次`);
                console.log(`\n 最大可阅读：${result.max}次`);
                
                resolve(result);

            } catch (e) {
                $.logErr(e, response);
            } finally {
                resolve();
            }
        })
    })
}


/**
 * 添加阅读记录
 */
async function readd(token) {
    console.log('\n ------------- 开始阅读 -------------');
    var tokens = token.split('&');
    var param = {
        'code':'xpz11',
        'un':tokens[0],
        'token':tokens[1],
        'pageSize':20
    }
    return new Promise((resolve) => {

        let nm = {
            url: `http://u.wyexin.cn/api/user/readd`,
            body: JSON.stringify(param),
            headers: {
                'User-Agent':'Mozilla/5.0 (Linux; Android 10; MI 10 Build/QKQ1.190716.003; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/86.0.4240.99 XWEB/4255 MMWEBSDK/20220402 Mobile Safari/537.36 MMWEBID/9132 MicroMessenger/8.0.22.2140(0x28001637) WeChat/arm64 Weixin NetType/WIFI Language/zh_CN ABI/arm64',
                'Content-Type': 'application/json; charset=utf-8',
                'Host':'u.wyexin.cn'
            },
            rejectUnauthorized:false
        }
        $.post(nm, async (error, response, data) => {
            //console.log(`${JSON.stringify(nm)}`)
            try {
                const result = JSON.parse(data)
                if (logs) $.log(data)
                
            } catch (e) {
                $.logErr(e, response);
            } finally {
                resolve();
            }
        })
    })
}



/**
 * 添加阅读记录
 */
async function getMsg(token) {
    console.log('\n 阅读中...');
    var tokens = token.split('&');
    var param = {
        'un':tokens[0],
        'token':tokens[1],
        'pageSize':20
    }
    return new Promise((resolve) => {

        let nm = {
            url: `http://u.wyexin.cn/api/user/getMsg`,
            body: JSON.stringify(param),
            headers: {
                'User-Agent':'Mozilla/5.0 (Linux; Android 10; MI 10 Build/QKQ1.190716.003; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/86.0.4240.99 XWEB/4255 MMWEBSDK/20220402 Mobile Safari/537.36 MMWEBID/9132 MicroMessenger/8.0.22.2140(0x28001637) WeChat/arm64 Weixin NetType/WIFI Language/zh_CN ABI/arm64',
                'Content-Type': 'application/json; charset=utf-8',
                'Host':'u.wyexin.cn'
            },
            rejectUnauthorized:false
        }
        $.post(nm, async (error, response, data) => {
            //console.log(`${JSON.stringify(nm)}`)
            try {
                const result = JSON.parse(data)
                if (logs) $.log(data)
                
            } catch (e) {
                $.logErr(e, response);
            } finally {
                resolve();
            }
        })
    })
}


/**
 * 添加阅读记录
 */
async function statAccess(token) {
    console.log('\n 阅读中...');
    var tokens = token.split('&');
    var param = {
        'un':tokens[0],
        'token':tokens[1],
        'pageSize':20
    }
    return new Promise((resolve) => {

        let nm = {
            url: `http://u.wyexin.cn/api/user/statAccess`,
            body: JSON.stringify(param),
            headers: {
                'User-Agent':'Mozilla/5.0 (Linux; Android 10; MI 10 Build/QKQ1.190716.003; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/86.0.4240.99 XWEB/4255 MMWEBSDK/20220402 Mobile Safari/537.36 MMWEBID/9132 MicroMessenger/8.0.22.2140(0x28001637) WeChat/arm64 Weixin NetType/WIFI Language/zh_CN ABI/arm64',
                'Content-Type': 'application/json; charset=utf-8',
                'Host':'u.wyexin.cn'
            },
            rejectUnauthorized:false
        }
        $.post(nm, async (error, response, data) => {
            //console.log(`${JSON.stringify(nm)}`)
            try {
                const result = JSON.parse(data)
                if (logs) $.log(data)
                
            } catch (e) {
                $.logErr(e, response);
            } finally {
                resolve();
            }
        })
    })
}



/**
 * 添加阅读记录
 */
async function submitt(token) {
    console.log('\n 阅读中...');
    var tokens = token.split('&');
    var param = {
        'code':'xpz22',
        'un':tokens[0],
        'token':tokens[1],
        'pageSize':20
    }
    return new Promise((resolve) => {

        let nm = {
            url: `http://u.wyexin.cn/api/user/submitt`,
            body: JSON.stringify(param),
            headers: {
                'User-Agent':'Mozilla/5.0 (Linux; Android 10; MI 10 Build/QKQ1.190716.003; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/86.0.4240.99 XWEB/4255 MMWEBSDK/20220402 Mobile Safari/537.36 MMWEBID/9132 MicroMessenger/8.0.22.2140(0x28001637) WeChat/arm64 Weixin NetType/WIFI Language/zh_CN ABI/arm64',
                'Content-Type': 'application/json; charset=utf-8',
                'Host':'u.wyexin.cn'
            },
            rejectUnauthorized:false
        }
        $.post(nm, async (error, response, data) => {
            //console.log(`${JSON.stringify(nm)}`)
            try {
                const result = JSON.parse(data)
                if (logs) $.log(data)
                console.log("\n 阅读成功");
                
            } catch (e) {
                $.logErr(e, response);
            } finally {
                resolve();
            }
        })
    })
}


function Env(t, e) {
    class s {
        constructor(t) {
            this.env = t
        }

        send(t, e = "GET") {
            t = "string" == typeof t ? {url: t} : t;
            let s = this.get;
            return "POST" === e && (s = this.post), new Promise((e, i) => {
                s.call(this, t, (t, s, r) => {
                    t ? i(t) : e(s)
                })
            })
        }

        get(t) {
            return this.send.call(this.env, t)
        }

        post(t) {
            return this.send.call(this.env, t, "POST")
        }
    }

    return new class {
        constructor(t, e) {
            this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `\ud83d\udd14${this.name}, \u5f00\u59cb!`)
        }

        isNode() {
            return "undefined" != typeof module && !!module.exports
        }

        isQuanX() {
            return "undefined" != typeof $task
        }

        isSurge() {
            return "undefined" != typeof $httpClient && "undefined" == typeof $loon
        }

        isLoon() {
            return "undefined" != typeof $loon
        }

        toObj(t, e = null) {
            try {
                return JSON.parse(t)
            } catch {
                return e
            }
        }

        toStr(t, e = null) {
            try {
                return JSON.stringify(t)
            } catch {
                return e
            }
        }

        getjson(t, e) {
            let s = e;
            const i = this.getdata(t);
            if (i) try {
                s = JSON.parse(this.getdata(t))
            } catch {
            }
            return s
        }

        setjson(t, e) {
            try {
                return this.setdata(JSON.stringify(t), e)
            } catch {
                return !1
            }
        }

        getScript(t) {
            return new Promise(e => {
                this.get({url: t}, (t, s, i) => e(i))
            })
        }

        runScript(t, e) {
            return new Promise(s => {
                let i = this.getdata("@chavy_boxjs_userCfgs.httpapi");
                i = i ? i.replace(/\n/g, "").trim() : i;
                let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");
                r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r;
                const [o, h] = i.split("@"), a = {
                    url: `http://${h}/v1/scripting/evaluate`,
                    body: {script_text: t, mock_type: "cron", timeout: r},
                    headers: {"X-Key": o, Accept: "*/*"}
                };
                this.post(a, (t, e, i) => s(i))
            }).catch(t => this.logErr(t))
        }

        loaddata() {
            if (!this.isNode()) return {};
            {
                this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path");
                const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile),
                    s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e);
                if (!s && !i) return {};
                {
                    const i = s ? t : e;
                    try {
                        return JSON.parse(this.fs.readFileSync(i))
                    } catch (t) {
                        return {}
                    }
                }
            }
        }

        writedata() {
            if (this.isNode()) {
                this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path");
                const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile),
                    s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data);
                s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r)
            }
        }

        lodash_get(t, e, s) {
            const i = e.replace(/\[(\d+)\]/g, ".$1").split(".");
            let r = t;
            for (const t of i) if (r = Object(r)[t], void 0 === r) return s;
            return r
        }

        lodash_set(t, e, s) {
            return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t)
        }

        getdata(t) {
            let e = this.getval(t);
            if (/^@/.test(t)) {
                const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : "";
                if (r) try {
                    const t = JSON.parse(r);
                    e = t ? this.lodash_get(t, i, "") : e
                } catch (t) {
                    e = ""
                }
            }
            return e
        }

        setdata(t, e) {
            let s = !1;
            if (/^@/.test(e)) {
                const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i),
                    h = i ? "null" === o ? null : o || "{}" : "{}";
                try {
                    const e = JSON.parse(h);
                    this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i)
                } catch (e) {
                    const o = {};
                    this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i)
                }
            } else s = this.setval(t, e);
            return s
        }

        getval(t) {
            return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null
        }

        setval(t, e) {
            return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null
        }

        initGotEnv(t) {
            this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar))
        }

        get(t, e = (() => {
        })) {
            t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {"X-Surge-Skip-Scripting": !1})), $httpClient.get(t, (t, s, i) => {
                !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i)
            })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {hints: !1})), $task.fetch(t).then(t => {
                const {statusCode: s, statusCode: i, headers: r, body: o} = t;
                e(null, {status: s, statusCode: i, headers: r, body: o}, o)
            }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => {
                try {
                    if (t.headers["set-cookie"]) {
                        const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();
                        s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar
                    }
                } catch (t) {
                    this.logErr(t)
                }
            }).then(t => {
                const {statusCode: s, statusCode: i, headers: r, body: o} = t;
                e(null, {status: s, statusCode: i, headers: r, body: o}, o)
            }, t => {
                const {message: s, response: i} = t;
                e(s, i, i && i.body)
            }))
        }

        post(t, e = (() => {
        })) {
            if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {"X-Surge-Skip-Scripting": !1})), $httpClient.post(t, (t, s, i) => {
                !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i)
            }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {hints: !1})), $task.fetch(t).then(t => {
                const {statusCode: s, statusCode: i, headers: r, body: o} = t;
                e(null, {status: s, statusCode: i, headers: r, body: o}, o)
            }, t => e(t)); else if (this.isNode()) {
                this.initGotEnv(t);
                const {url: s, ...i} = t;
                this.got.post(s, i).then(t => {
                    const {statusCode: s, statusCode: i, headers: r, body: o} = t;
                    e(null, {status: s, statusCode: i, headers: r, body: o}, o)
                }, t => {
                    const {message: s, response: i} = t;
                    e(s, i, i && i.body)
                })
            }
        }

        time(t) {
            let e = {
                "M+": (new Date).getMonth() + 1,
                "d+": (new Date).getDate(),
                "H+": (new Date).getHours(),
                "m+": (new Date).getMinutes(),
                "s+": (new Date).getSeconds(),
                "q+": Math.floor(((new Date).getMonth() + 3) / 3),
                S: (new Date).getMilliseconds()
            };
            /(y+)/.test(t) && (t = t.replace(RegExp.$1, ((new Date).getFullYear() + "").substr(4 - RegExp.$1.length)));
            for (let s in e) new RegExp("(" + s + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? e[s] : ("00" + e[s]).substr(("" + e[s]).length)));
            return t
        }

        msg(e = t, s = "", i = "", r) {
            const o = t => {
                if (!t) return t;
                if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? {"open-url": t} : this.isSurge() ? {url: t} : void 0;
                if ("object" == typeof t) {
                    if (this.isLoon()) {
                        let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"];
                        return {openUrl: e, mediaUrl: s}
                    }
                    if (this.isQuanX()) {
                        let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl;
                        return {"open-url": e, "media-url": s}
                    }
                    if (this.isSurge()) {
                        let e = t.url || t.openUrl || t["open-url"];
                        return {url: e}
                    }
                }
            };
            if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) {
                let t = ["", "==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];
                t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t)
            }
        }

        log(...t) {
            t.length > 0 && (this.logs = [...this.logs, ...t]), console.log('\n '+ t.join(this.logSeparator))
        }

        logErr(t, e) {
            const s = !this.isSurge() && !this.isQuanX() && !this.isLoon();
            s ? this.log("", `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t.stack) : this.log("", `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t)
        }

        wait(t) {
            return new Promise(e => setTimeout(e, t))
        }

        done(t = {}) {
            const e = (new Date).getTime(), s = (e - this.startTime) / 1e3;
            this.log("", `\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t)
        }
    }(t, e)
}