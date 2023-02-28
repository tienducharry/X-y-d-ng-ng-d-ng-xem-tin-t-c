'use strict'

const newsContainer = document.getElementById('news-container');
//lay thong tin current user
let currentUser = getFromStorage('current');
let setArr = getFromStorage('settings') || [];
let currentSettings ={
    newsNum: 5,
    category: 'business',
};
for (let i = 0; i < setArr.length; i++) {
    if(currentUser[0].userName === setArr[i].user)
       currentSettings = setArr[i];
   };


//category: business, entertainment, health, science, sports, technology
//kiem tra neu da dang nhap thi tao tin tuc
if(currentUser.length > 0) {

//ham render tin tuc
function renderNews(data){
    let html = '';
    data.map(function(value) {
        html += `<div style="border: 1px solid #D3D3D3 ; padding:0; border-radius: 5px; margin-bottom: 20px;"
        width ="100%">
            <div style="display: flex; margin-left: auto;margin-right: auto">
                <div>
                    <img src="${value["urlToImage"]}" width="500px" height="300px" alt="">
                </div>
                <div style ="padding-left: 20px">
                    <h5>${value["title"]}</h5>
                    <p>${value["description"]}</p>
                    <button type="button" class="btn btn-primary" onclick="window.location.href='${value["url"]}'">view</button>
                </div>
            </div>
        </div>`
    }).join('');
    newsContainer.innerHTML= html;
};

//lay du lieu tu api
async function getNews (country,category,pageSize, page, apiKey){
    try {
    //lay du lieu tu api
    const api = await fetch(`https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}`);
        //neu k load dc thi bao loi ra console
     if(!api.ok) console.log(`error : ${api.status}`);

    const listNews = await api.json();
    const data = await listNews.articles.slice(0 ,pageSize);
    const data1 = await listNews.articles.slice(0 ,currentSettings.newsNum)
     myfunction(currentSettings.newsNum,listNews.articles, listNews,page);
     renderNews(data1);
    }
    catch {
        err => console.log(err);
    }
}

// ///////////////////////////////////
//ham tach trang
function myfunction(pagesize,allnews,data,page){
    const previous = document.querySelector('#btn-prev');
    const next = document.querySelector('#btn-next');
    const pagenum = document.querySelector('#page-num');
    previous.addEventListener('click',getPrevious);
    next.addEventListener('click',getNext);
    const myItemObjectArray = [];
    let num = pagesize;
    for (let i=0 ; i <= allnews.length; i += pagesize)
    {
        myItemObjectArray.push( {itemId: i/pagesize} );
        var currentItemIndex = page;
    };

    //tao ham lui trang
    function getPrevious() {
        currentItemIndex--; // the global variable
        show(currentItemIndex, myItemObjectArray);
        inner();
        num-=pagesize;
        let dat = data.articles.slice(num - pagesize,num);
        renderNews(dat);
    };
    //tao ham next trang
    function getNext() {
        currentItemIndex++; // the global variable
        show(currentItemIndex, myItemObjectArray);
        inner();
        num += pagesize;
        let dat = data.articles.slice(num - pagesize,num);
        renderNews(dat);
    };
    //ham hien so trang
    function show(index, arr) {
        pagenum.innerText = arr[index].itemId;
        };
    //ham hien thi nut previous & next 
    function inner(){
    if(currentItemIndex <= 1){
    previous.style.display = 'none';
    next.style.display = '';
    }
    else if(currentItemIndex >= myItemObjectArray.length - 1){
    next.style.display = 'none';
    previous.style.display = '';
    }
    else{
    next.style.display = '';
    previous.style.display = '';
    }
    }
    inner();
    };

getNews('us', currentSettings.category , 20, 1 ,'15405aaa88dc494eb4efdc5dd7322644');
}