/**
 * 脚本地址: ql raw https://js.dayplus.xyz/https://raw.githubusercontent.com/hualuoyixiao/qinglong/master/khz.js
 
 * 垦荒者
 * 下载地址: http://ken.kenhz.cn/?id=27310807
 * 
 * cron 15 8 * * *  

 * ========= 抓包 =========
 * 抓取域名：http://ken.kenhz.cn
 * 请求头：Authorization的值
 
 * ========= 青龙 =========
 * 变量名: khzToken
 * 变量值：Bearer eyJhbGciOiJIUzUxMiJ9.eyJsxxx........
 * 多个账号用 @分割
 *
 */

const axios = require('axios');
const QS = require('qs');

// 开始执行
console.log("🔔垦荒者V1.0, 开始运行!	By:花落分享");

// 获取环境变量
var khzToken = process.env.khzToken;
var khzs = [];
if(typeof(khzToken) == 'undefined'){
	console.log('\n khzToken 未填写');
}else{
	khzs = khzToken.split("@");
}

console.log('\n ------------- 共'+khzs.length+'个账号 -------------');

// 看广告参数
var adParam = {
	"adType": "10086",
	"checkString": "49378b9159d242a496f4eda24fc277791",
	"type": "2"
}
var idx = 1
for (var i = 0; i < khzs.length; i++) {
	var khz = khzs[i];
	console.log('\n 开始第'+(i+1)+'个账号');
	
	// 获取广告次数
	var adThen = getAdCount(khz);
	
	adThen.then(function (data) {
		var adCount = data.data;
		console.log('\n 已观看：'+adCount+'次广告');
		idx = adCount + 1;
		
		var timer = setInterval(function () {
			if (idx > 6) {
				clearInterval(timer);
				console.log('\n 广告已全部观看，开始领取奖励。。。');
				var powerResult = getPower(khz);
				powerResult.then(function (data) {
					console.log('\n 领取结果：' + data.msg);
				});	
				
			}else{
				console.log('\n 开始第'+(idx)+'轮广告');
				var adResult = sendAd(khz);
				adResult.then(function (data) {
					console.log('\n 观看结果：'+data.msg);
				});
			}
			
			idx++;
		}, 10000);
		
	});
	
	
}


// console.log("\n ------------- 开始登录-------------");



/**
 * 获取用户信息
 */
function getUserInfo(khzTokenOne){
	axios.get('http://ken.kenhz.cn/api/jiadian-user/info/info',{
		headers:{
			'User-Agent':'okhttp/4.9.0',
			'Authorization':khzTokenOne
			
		}
	})
	.then(res => {
	    const { data } = res.data
		console.log("\n 手机号："+data.mobile);
		console.log("\n 注册地："+data.districtName);
	
	})
	.catch(err => {
	    console.log('Error: ', err);
	});
}




/**
 * 获取观看广告次数
 * @param {Object} khzTokenOne
 */
function getAdCount(khzTokenOne){
	return httpGet("http://ken.kenhz.cn/api/jiadian-power/advertise/check_show_advert_count",khzTokenOne);
}

/**
 * 观看广告
 */
function sendAd(khzTokenOne){
	return post("http://ken.kenhz.cn/api/jiadian-power/advertise/confirm_show_advert",adParam,true,khzTokenOne);
}

/**
 * 领取奖励
 */
function getPower(khzTokenOne){
	return post("http://ken.kenhz.cn/api/jiadian-power/power/grant/power",{},true,khzTokenOne);
}
/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 * @param {Boolean} json [true：json格式请求头；false：FormData格式请求头]
 */
function post(url, params = {}, json = false,khzTokenOne) {
  // json格式请求头
  const headerJSON = {
    "Content-Type": "application/json",
	'User-Agent':'okhttp/4.9.0',
	'Authorization':khzTokenOne
  };
  // FormData格式请求头
  const headerFormData = {
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
	'User-Agent':'okhttp/4.9.0',
	'Authorization':khzTokenOne
  };
  return new Promise((resolve, reject) => {
    axios
      .post(url, json ? JSON.stringify(params) : QS.stringify(params), {
        headers: json ? headerJSON : headerFormData
      })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data);
      });
  });
}


/**
 * GET请求
 */
function httpGet(url,khzTokenOne) {
 
  // FormData格式请求头
  const headerFormData = {
	'User-Agent':'okhttp/4.9.0',
	'Authorization':khzTokenOne
  };
  return new Promise((resolve, reject) => {
    axios
      .get(url,{
        headers: headerFormData
      })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data);
      });
  });
}