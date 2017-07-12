/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';

	// 當有滾動的時候
	window.onscroll = function () {
	    // 移動的距離
	    var scPos = window.pageYOffset;
	    if (scPos > window.innerHeight / 5) {
	        document.querySelector('.gototp').style.display = '';
	    } else {
	        document.querySelector('.gototp').style.display = 'none';
	    }
	};

	document.querySelector('.gototp').addEventListener('click', function (e) {
	    scrollTo(document.body, 0, 1250);
	});

	// 純js scrollTop
	// 參考：https://gist.github.com/andjosh/6764939
	function scrollTo(element, to, duration) {
	    var start = element.scrollTop,
	        change = to - start,
	        currentTime = 0,
	        increment = 20;

	    var animateScroll = function animateScroll() {
	        currentTime += increment;
	        var val = Math.easeInOutQuad(currentTime, start, change, duration);
	        element.scrollTop = val;
	        if (currentTime < duration) {
	            setTimeout(animateScroll, increment);
	        }
	    };
	    animateScroll();
	}

	//t = current time
	//b = start value
	//c = change in value
	//d = duration
	Math.easeInOutQuad = function (t, b, c, d) {
	    t /= d / 2;
	    if (t < 1) return c / 2 * t * t + b;
	    t--;
	    return -c / 2 * (t * (t - 2) - 1) + b;
	};

	var url = 'https://hotman0901.github.io/travel/json/datastore_search.json';
	var myObj = '';
	var data = [];
	var selectItem = [];
	var selectAreaObj = document.querySelector('#areaId');
	var popularList = document.querySelector('.large-hero__pop4');
	var contentTitle = document.querySelector('.listTitle');
	var renderPage = document.querySelector('#render-page');
	var renderContent = document.querySelector('.list');
	var optionData = void 0;
	// console.log(typeof(data));
	// 此次是要撈取全部的地區用
	callAjax(url, 0);
	// status 0=初始畫面觸發，1=從下拉選單觸發，2=從熱門區觸發
	function callAjax(url, status) {
	    var xhr;

	    if (window.XMLHttpRequest) {
	        // Mozilla, Safari, ...
	        xhr = new XMLHttpRequest();
	        if (xhr.overrideMimeType) {
	            xhr.overrideMimeType('text/xml');
	        }
	    } else if (window.ActiveXObject) {
	        // IE
	        try {
	            xhr = new ActiveXObject("Msxml2.XMLHTTP");
	        } catch (e) {
	            try {
	                xhr = new ActiveXObject("Microsoft.XMLHTTP");
	            } catch (e) {}
	        }
	    }

	    if (!xhr) {
	        alert('Giving up :( Cannot create an XMLHTTP instance');
	        return false;
	    }

	    xhr.open('get', url, true);
	    xhr.send(null);

	    xhr.onload = function () {
	        if (xhr.readyState == 4) {
	            if (xhr.status == 200) {
	                var content = JSON.parse(xhr.responseText);
	                // 資料是放在 result.records
	                optionData = content.result.records;
	                // console.log(content);
	                // 若載入的時候已經有產生選單之後就不再做
	                // console.log(selectItem.length);
	                // console.log(typeof(selectItem));
	                if (selectItem.length < 1) {
	                    renderOption(optionData);
	                }
	                // 渲染內容
	                // 當不是第一次載入時不做renderContent = 沒有查詢
	                if (status != 0) {
	                    // 有觸發到下拉選單或熱門區都是第一頁開始
	                    renderContent(1);
	                }
	            } else {
	                alert('There was a problem with the request.');
	            }
	        }
	    };
	}

	// load已確認 data 有資料
	// 渲染下拉選單
	// 判斷有哪些地區，並且重複的地區塞到selectItem內
	function renderOption(option) {

	    for (var i = 0; i < option.length; i++) {
	        // console.log(option[i].Zone);
	        if (selectItem.indexOf(option[i].Zone) == -1) {
	            selectItem.push(option[i].Zone);
	            // console.log(selectItem.length);
	        }
	    }
	    // 將selectItem內的資料渲染到option內
	    for (var _i = 0; _i < selectItem.length; _i++) {
	        // console.log(selectItem[i]);
	        // console.log(typeof(selectAreaObj));
	        // 新增option作法如下
	        var varItem = new Option(selectItem[_i], selectItem[_i]);
	        // console.log(varItem);
	        selectAreaObj.options.add(varItem);
	        // console.log(typeof(selectAreaObj.options));
	    }
	}

	// 目前頁數、總頁數、要前往的頁數、總共幾筆
	var currentPage, totoalPage, totalItem;
	// 一頁10筆資料
	var perPage = 10;

	// 渲染內容(第一次call api跟換頁功能共用方法 )
	function renderContent(goPage) {
	    document.querySelector('.footer').style.display = '';

	    totalItem = data.length;
	    console.log(totalItem);

	    // 當沒有查詢到資料的時候
	    if (totalItem == 0) {
	        contentTitle.textContent = '查無資料';
	        renderContent.innerHTML = '';
	        renderPage.style.display = 'none';
	        return false;
	    }
	    // 有資料的時候只要取第一筆的name即可
	    contentTitle.textContent = data[0].Zone;

	    // 計算總共有幾頁(使用無條件進位)
	    totoalPage = Math.ceil(totalItem / perPage);

	    // 起始資料index,結束資料index
	    var startItem;
	    var endItem;
	    // 如果是最後一頁要判斷抓取幾筆資料， 其餘都一定是10筆
	    if (goPage == totoalPage) {
	        var minusItem = totalItem - totoalPage * perPage;

	        if (minusItem == 0) {
	            //判斷最後一頁是幾筆用 = 0 就是10筆
	            startItem = (totoalPage - 1) * perPage;
	            endItem = totalItem;
	        } else {
	            // 小於10筆
	            startItem = (totoalPage - 1) * perPage;
	            endItem = totalItem;
	        }
	    } else {
	        startItem = perPage * (goPage - 1);
	        endItem = goPage * 10;
	    }

	    var strHtml = '';
	    for (var i = startItem; i < endItem; i++) {
	        var tempHtml = '<div class="col-xs-12 col-sm-6"><a href="{{Website}}" class="thumbnail animated fadeIn" target="_blank"><div class="caption clip" style="background-image: url({{Picture1}})"><div class="content-img-title"><h3>{{Name}}</h3><span>{{Zone}}</span><div class="clearfix"></div></div></div><div class="caption content-info"><span class="content-info-1">{{Opentime}}</span><span class="content-info-2">{{Add}}</span><span class="content-info-3">{{Tel}}</span><span class="content-info-4">{{Ticketinfo}}</span><div class="clearfix"></div></div></a></div>';
	        if (data[i].Ticketinfo == '') {
	            // 沒有資料的時候給空白讓他偏移
	            data[i].Ticketinfo = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
	        }
	        tempHtml = tempHtml.replace('{{Name}}', data[i].Name).replace('{{Picture1}}', data[i].Picture1).replace('{{Ticketinfo}}', data[i].Ticketinfo).replace('{{Zone}}', data[i].Zone).replace('{{Opentime}}', data[i].Opentime).replace('{{Add}}', data[i].Add).replace('{{Tel}}', data[i].Tel).replace('{{Website}}', data[i].Website == '' ? '#' : data[i].Website);

	        strHtml += tempHtml;
	    }

	    renderContent.innerHTML = strHtml;

	    // 紀錄目前頁數用來點選上下頁用
	    currentPage = goPage;

	    // 渲染頁碼
	    renderPage(totoalPage);
	}

	function renderPage() {

	    if (data.length <= 0) {
	        // 沒有資料的時候不顯示筆數
	        renderPage.style.display = 'none';
	    } else {
	        renderPage.style.display = '';

	        // 模板
	        var prevPage = '<a href="#" data-num="-1">< prev</a> &nbsp;';
	        var nexPage = ' &nbsp;<a href="#" data-num="1">next ></a>';
	        if (totoalPage > 0) {
	            var nbrHtml = '';
	            for (var i = 0; i < totoalPage; i++) {
	                var tempNbr = '<a href="#" data-page="' + (i + 1) + '">' + (i + 1) + '</a> ';
	                nbrHtml += tempNbr;
	            }

	            renderPage.innerHTML = prevPage + nbrHtml + nexPage;
	        }
	    }
	}

	// 當下拉選單異動的時候就重新select資料
	// 觸發下拉都是從第一頁開始
	selectAreaObj.addEventListener('change', function (e) {
	    var objValue = e.target.value;
	    // 不是選到請選擇在去做執行
	    if (objValue != "") {
	        // 重串url條件
	        var newurl = url + '&q=' + objValue;
	        // callAjax(newurl, 1);
	        console.log(newurl);
	        queryArea(objValue);
	        // callAjax(newurl, 2);
	        renderContent(1);
	    }
	});

	// 熱門區按鈕做偵聽
	popularList.addEventListener('click', function (e) {
	    e.preventDefault();
	    // 是點選到a標籤
	    if (e.target.nodeName == 'INPUT') {
	        // 重串url條件
	        var newurl = url + '&q=' + e.target.textContent;
	        queryArea(e.target.textContent);
	        // callAjax(newurl, 2);
	        renderContent(1);
	    }
	});

	// 重新將查詢的資料放入到新的物件
	function queryArea(areaName) {
	    // 清空
	    data = [];
	    // queryData
	    for (var i = 0; i < optionData.length; i++) {
	        // console.log(data[i].Zone);
	        if (optionData[i].Zone == areaName) {
	            data.push(optionData[i]);
	        }
	    }
	}

/***/ }
/******/ ]);