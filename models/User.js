'use strict'

class User {
    constructor(firstName, lastName,userName,password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.userName = userName;
        this.password = password;
    }
};

class Task {
    constructor(task,owner,isDone) {
        this.owner = owner;
        this.task = task;
        this.isDone = isDone;
    }
};

class Setting{
    constructor(user,newsNum,category) {
        this.user = user;
        this.newsNum = newsNum;
        this.category = category;
    }
}