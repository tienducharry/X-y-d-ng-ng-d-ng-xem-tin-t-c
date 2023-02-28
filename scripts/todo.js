'use strict'
//element
const todoList = document.getElementById('todo-list');
const btnAdd = document.querySelector('#btn-add');

//lay du lieu tu storage
let currentUser = getFromStorage('current');
let allTask = getFromStorage('task') || [];
let users = getFromStorage('users') || [];

//ham luu tru task
const storeTask = (x) => saveToStorage("task", x);

let indexA = 0;
let checkedArr = [];

//lay ra todoArr
let todoArr =  [];

//neu user la moi va chua co todo list thi tao moi
if(users.length > allTask.length){
    allTask.push([]);
    indexA = (allTask.length-1);
    newTask();
};
// tao list task theo current user
for (let i1 = 0; i1 < allTask.length; i1++) {
    if(currentUser[0].userName === allTask[i1].owner){
        indexA = i1;
        renderTodo(allTask[i1].task);
        myfunction(i1);
        todoArr = allTask[indexA].task;
    }
};

//ham lay du lieu task checked
function getCheck(){
    const liArr = document.querySelectorAll('.example');
    for (let i0 = 0; i0 < liArr.length; i0++) {
        if(liArr[i0].classList.contains('checked')){
            checkedArr[i0] = true;
        } else {
            checkedArr[i0] = false;
        };
    };
};

//ham render task
function renderTodo(todoArr) {
    todoList.innerHTML = '';
    let liEl = '';
    for (let i = 0; i < todoArr.length; i++) {
       liEl = `<li class="example">${todoArr[i]}<span class="close" onclick="deleteBtn(${i})">x</span></li>`;
        todoList.insertAdjacentHTML('beforeend',liEl);
    };
};
//

//ham xoa task
function deleteBtn(i) {
    todoArr.splice(i,1);
    checkedArr.splice(i,1);
    renderTodo(todoArr);
    myfunction(indexA);
    getCheck();
    newTask();   
};

//bat su kien toggle cho task
todoList.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
    getCheck();
    newTask();
  }
}, false);

//bat su kien add 
btnAdd.addEventListener('click', function(){
    let inputTask = document.getElementById('input-task').value;
    if (todoArr.includes(inputTask)) {
       alert('This task already exist')
    } else if (inputTask === ''){
        alert('Please input something!?');
    } else {
        todoArr.push(inputTask);
        checkedArr.push(false);
        newTask();
        myfunction(indexA);
        getCheck(); 
    };
    document.getElementById('input-task').value = ''; //reset form

});

//ham add/update task
function newTask(){
    const task = new Task(
        todoArr, currentUser[0].userName, checkedArr
    );
    if (allTask.length === 0) {
        allTask.push(task);
        storeTask(allTask);
    } else{
        allTask[indexA] = task;
        storeTask(allTask);
    }};    

//ham bo sung check cho task list    
function myfunction(i1){
    renderTodo(allTask[i1].task);
    const liArr = document.querySelectorAll('.example');
    for (let i2 = 0; i2 < allTask[i1].isDone.length; i2++) {
        if(allTask[i1].isDone[i2]){
            liArr[i2].classList.add('checked');
        };            
    }};

