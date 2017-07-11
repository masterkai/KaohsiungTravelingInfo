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
	// let url =
	// 'http://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97';
	var myObj = '';
	var data = [];

	loadData();

	function loadData() {
	    var a = new XMLHttpRequest();
	    a.open('GET', url, true);
	    a.onreadystatechange = function () {
	        if (a.readyState == 4) {
	            myObj = JSON.parse(a.responseText);
	            //console.log(myObj.result.records);
	            buildDATA(0);
	        }
	    };
	    a.send();
	}

	function buildDATA(pg) {

	    var fetchedData = myObj.result.records;
	    var Len = fetchedData.length;
	    var area = document.getElementById('areaId');
	    var list = document.querySelector('.list');
	    var listTitle = document.querySelector('.listTitle');
	    var btn = document.querySelector('.large-hero__pop4');
	    var RenderPage = document.querySelector('#render-page');
	    area.addEventListener('change', updateList, false);
	    btn.addEventListener('click', updateList, false);

	    var allArea = [];
	    var selectArea = void 0;
	    //將 allArea 的空陣列放入所有地區並排除重複後再放入selectArea中
	    function upadateMenu() {
	        for (var i = 0; i < Len; i++) {
	            // console.log('fetchedData[i].Zone: ' +
	            // fetchedData[i].Zone);
	            allArea.push(fetchedData[i].Zone);
	            // console.log('allArea: '+ allArea);
	        }
	        selectArea = allArea.filter(function (el, i, arr) {
	            return arr.indexOf(el) === i;
	        });
	    }
	    upadateMenu(); //開啟頁面時，更新一次
	    //將 selectArea 組成字串放入 area 物件中!
	    var selectStr = '';
	    for (var i = 0; i < selectArea.length; i++) {
	        // console.log('selectArea: '+ selectArea);
	        selectStr += '<option>' + selectArea[i] + '</option>';
	        area.innerHTML = '<option>--請選擇行政區--</option>' + selectStr;
	    }

	    // 目前頁數、總頁數、要前往的頁數、總共幾筆
	    var currentPage = void 0,
	        totoalPage = void 0,
	        totalItem = void 0;
	    // 一頁10筆資料
	    var perPage = 10;

	    // 渲染內容
	    function updateList(e) {
	        totalItem = data.length;
	        console.log('totalItem: ' + totalItem);

	        var searchValue = e.target.value; //獲取點擊的物件的value
	        var searchName = e.target.nodeName; //獲取點擊的物件的節點名稱
	        console.log('searchValue: ', searchValue);
	        console.log('searchName: ', searchName);

	        if (searchName !== 'INPUT' && searchName !== 'SELECT') {
	            return;
	        }

	        var select = e.target.value;

	        console.log(select);
	        var str = '';
	        for (var i = 0; Len > i; i++) {

	            if (select == fetchedData[i].Zone) {
	                listTitle.innerHTML = select;
	                // console.log(fetchedData[i].Zone);
	                str += '<li class="travelCard animated fadeIn"><a href="' + fetchedData[i].Website + '" target="_blank">\n                        <span class="travelCard__header" style="background-image: url(' + fetchedData[i].Picture1 + ')">\n                            <span class="travelCard__title">\n                                <h3>' + fetchedData[i].Name + '</h3>\n                            </span>\n                <span class="travelCard__secTitle">\n                                <h3>' + fetchedData[i].Zone + '</h3>\n                            </span>\n                </span>\n                <ul class="travelCard__content">\n                    <li class="clock">' + fetchedData[i].Opentime + '</li>\n                    <li class="pin">' + fetchedData[i].Add + '</li>\n                    <li class="phone">' + fetchedData[i].Tel + '</li>\n                </ul>\n                <div class="tag">' + fetchedData[i].Ticketinfo + '</div>\n                </a>\n                </li>';
	            }
	        }
	        list.innerHTML = str;
	    }

	    // 重新將查詢的資料放入到新的物件
	    function queryArea(areaName) {
	        // 清空
	        data = [];
	        // queryData
	        for (var i = 0; i < fetchedData.length; i++) {
	            // console.log(data[i].Zone);
	            if (fetchedData[i].Zone == areaName) {
	                data.push(fetchedData[i]);
	            }
	        }
	    }
	}

/***/ }
/******/ ]);