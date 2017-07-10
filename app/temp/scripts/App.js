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

	var data = 'http://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97';
	var myObj = '';
	loadData();

	function loadData() {
	    var a = new XMLHttpRequest();
	    a.open('GET', data, true);
	    a.onreadystatechange = function () {
	        if (a.readyState == 4) {
	            myObj = JSON.parse(a.responseText);
	            //console.log(myObj.result.records);
	            buildDATA();
	        }
	    };
	    a.send();
	}

	function buildDATA() {
	    var fetchedData = myObj.result.records;
	    var Len = fetchedData.length;
	    var area = document.getElementById('areaId');
	    var list = document.querySelector('.list');
	    var listTitle = document.querySelector('.listTitle');
	    var btn = document.querySelector('.large-hero__pop4');
	    area.addEventListener('change', updateList, false);
	    btn.addEventListener('click', updateList, false);

	    var allArea = [];
	    var selectArea = void 0;
	    //將allarea的空陣列放入所有地區並排除重複後再放入selectArea中
	    function upadateMenu() {
	        for (var _i = 0; _i < Len; _i++) {
	            allArea.push(fetchedData[_i].Zone);
	        }
	        selectArea = allArea.filter(function (el, i, arr) {
	            return arr.indexOf(el) === i;
	        });
	    }
	    upadateMenu(); //開啟頁面時，更新一次
	    //將selectArea組成字串放入AreaSearch物件中!
	    var selectStr = '';
	    for (var i = 0; i < selectArea.length; i++) {
	        selectStr += '<option>' + selectArea[i] + '</option>';
	        area.innerHTML = '<option>--請選擇行政區--</option>' + selectStr;
	    }

	    function updateList(e) {

	        var searchValue = e.target.value; //獲取點擊的物件的value
	        var searchName = e.target.nodeName; //獲取點擊的物件的節點名稱

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
	                str += '<li class="travelCard">\n                        <span class="travelCard__header" style="background-image: url(' + fetchedData[i].Picture1 + ')">\n                            <span class="travelCard__title">\n                                <h3>' + fetchedData[i].Name + '</h3>\n                            </span>\n                <span class="travelCard__secTitle">\n                                <h3>' + fetchedData[i].Zone + '</h3>\n                            </span>\n                </span>\n                <ul class="travelCard__content">\n                    <li class="clock">' + fetchedData[i].Opentime + '</li>\n                    <li class="pin">' + fetchedData[i].Add + '</li>\n                    <li class="phone">' + fetchedData[i].Tel + '</li>\n                </ul>\n                <div class="tag">' + fetchedData[i].Ticketinfo + '</div>\n                </li>';
	            }
	        }
	        list.innerHTML = str;
	    }
	}

/***/ }
/******/ ]);