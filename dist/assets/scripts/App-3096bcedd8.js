!function(e){function n(a){if(t[a])return t[a].exports;var r=t[a]={exports:{},id:a,loaded:!1};return e[a].call(r.exports,r,r.exports,n),r.loaded=!0,r.exports}var t={};n.m=e,n.c=t,n.p="",n(0)}([function(e,n){"use strict";function t(){function e(e){var a=(e.target.value,e.target.nodeName);if("INPUT"===a||"SELECT"===a){var r=e.target.value;console.log(r);for(var i="",s=0;t>s;s++)r==n[s].Zone&&(l.innerHTML=r,i+='<li class="travelCard">\n                        <span class="travelCard__header" style="background-image: url('+n[s].Picture1+')">\n                            <span class="travelCard__title">\n                                <h3>'+n[s].Name+'</h3>\n                            </span>\n                <span class="travelCard__secTitle">\n                                <h3>'+n[s].Zone+'</h3>\n                            </span>\n                </span>\n                <ul class="travelCard__content">\n                    <li class="clock">'+n[s].Opentime+'</li>\n                    <li class="pin">'+n[s].Add+'</li>\n                    <li class="phone">'+n[s].Tel+'</li>\n                </ul>\n                <div class="tag">'+n[s].Ticketinfo+"</div>\n                </li>");o.innerHTML=i}}var n=r.result.records,t=n.length,a=document.getElementById("areaId"),o=document.querySelector(".list"),l=document.querySelector(".listTitle"),i=document.querySelector(".large-hero__pop4");a.addEventListener("change",e,!1),i.addEventListener("click",e,!1);var s=[],c=void 0;!function(){for(var e=0;e<t;e++)s.push(n[e].Zone);c=s.filter(function(e,n,t){return t.indexOf(e)===n})}();for(var d="",u=0;u<c.length;u++)d+="<option>"+c[u]+"</option>",a.innerHTML="<option>--請選擇行政區--</option>"+d}var a="http://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97",r="";!function(){var e=new XMLHttpRequest;e.open("GET",a,!0),e.onreadystatechange=function(){4==e.readyState&&(r=JSON.parse(e.responseText),t())},e.send()}()}]);