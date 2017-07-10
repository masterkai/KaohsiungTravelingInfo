let data = 'http://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97';
let myObj = '';
loadData();


function loadData() {
    let a = new XMLHttpRequest();
    a.open('GET', data, true);
    a.onreadystatechange = function () {
        if (a.readyState == 4) {
            myObj = JSON.parse(a.responseText);
            //console.log(myObj.result.records);
            buildDATA();
        }
    }
    a.send();
}

function buildDATA() {
    let fetchedData = myObj.result.records;
    let Len = fetchedData.length;
    let area = document.getElementById('areaId');
    let list = document.querySelector('.list');
    let listTitle = document.querySelector('.listTitle');
    let btn = document.querySelector('.large-hero__pop4');
    area.addEventListener('change', updateList, false);
    btn.addEventListener('click', updateList, false);

    let allArea = [];
    let selectArea;
    //將allarea的空陣列放入所有地區並排除重複後再放入selectArea中
    function upadateMenu() {
        for (let i = 0; i < Len; i++) {
            allArea.push(fetchedData[i].Zone);
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

        let select = e.target.value;

        console.log(select);
        var str = '';
        for (var i = 0; Len > i; i++) {
            if (select == fetchedData[i].Zone) {
                listTitle.innerHTML = select;
                // console.log(fetchedData[i].Zone);
                str += `<li class="travelCard">
                        <span class="travelCard__header" style="background-image: url(${fetchedData[i].Picture1})">
                            <span class="travelCard__title">
                                <h3>${fetchedData[i].Name}</h3>
                            </span>
                <span class="travelCard__secTitle">
                                <h3>${fetchedData[i].Zone}</h3>
                            </span>
                </span>
                <ul class="travelCard__content">
                    <li class="clock">${fetchedData[i].Opentime}</li>
                    <li class="pin">${fetchedData[i].Add}</li>
                    <li class="phone">${fetchedData[i].Tel}</li>
                </ul>
                <div class="tag">${fetchedData[i].Ticketinfo}</div>
                </li>`;
            }

        }
        list.innerHTML = str;
    }

}
