"use strict";

const btnSearch = document.getElementById("btn-submit");
const inputQuery = document.getElementById("input-query");
let currentUser = getFromStorage("current");
const newsContainer = document.getElementById("news-container");
console.log(currentUser);

function renderNews(data) {
  let html = "";
  data
    .map(function (value) {
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
        </div>`;
    })
    .join("");
  newsContainer.innerHTML = html;
}

let checking;
async function searchNews(keyword, apiKey) {
  try {
    const api = await fetch(
      `https://newsapi.org/v2/everything?q=${keyword}&apiKey=${apiKey}`
    );
    checking = api.ok;
    console.log(checking);
    if (!api.ok) console.log(`error : ${api.status}`);

    const searchList = await api.json();
    console.log(searchList);
    const data = await searchList.articles;
    const data1 = await data.slice(0, 5);

    myfunction(5, data, searchList, 1);
    renderNews(data1);
  } catch {
    (err) => console.log(err);
  }
}

function myfunction(pagesize, allnews, data, page) {
  const previous = document.querySelector("#btn-prev");
  const next = document.querySelector("#btn-next");
  const pagenum = document.querySelector("#page-num");
  previous.addEventListener("click", getPrevious);
  next.addEventListener("click", getNext);
  const myItemObjectArray = [];
  let num = pagesize;
  for (let i = 0; i <= allnews.length; i += pagesize) {
    myItemObjectArray.push({ itemId: i / pagesize });
    var currentItemIndex = page;
  }

  //tao ham lui trang
  function getPrevious() {
    currentItemIndex--; // the global variable
    show(currentItemIndex, myItemObjectArray);
    inner();
    num -= pagesize;
    let dat = data.articles.slice(num - pagesize, num);
    renderNews(dat);
  }
  //tao ham next trang
  function getNext() {
    currentItemIndex++; // the global variable
    show(currentItemIndex, myItemObjectArray);
    inner();
    num += pagesize;
    let dat = data.articles.slice(num - pagesize, num);
    renderNews(dat);
  }
  //ham hien so trang
  function show(index, arr) {
    pagenum.innerText = arr[index].itemId;
  }
  //ham hien thi nut previous & next
  function inner() {
    if (currentItemIndex <= 1) {
      previous.style.display = "none";
      next.style.display = "";
    } else if (currentItemIndex >= myItemObjectArray.length - 1) {
      next.style.display = "none";
      previous.style.display = "";
    } else {
      next.style.display = "";
      previous.style.display = "";
    }
  }
  inner();
}

function search() {
  if (inputQuery.value === "") {
    alert("Please input something?");
  } else if (inputQuery.value !== "" && checking === false) {
    alert(`Try another...
            e.g: bitcoin, business, technology,...`);
  } else {
    searchNews(inputQuery.value, "15405aaa88dc494eb4efdc5dd7322644");
  }
  inputQuery.value = "";
}
btnSearch.addEventListener("click", search);
// inputQuery.addEventListener('keydown', function(e){
//     e.preventDefault();
//     if (e.key === 'Enter') { search()}
// });
// $("#input-query").keyup(function (event) {
//   if (event.keyCode == 13) {
//     alert("enter");
//     // btnSearch.addEventListener('click',search);
//   }
// });
