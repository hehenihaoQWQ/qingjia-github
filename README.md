## 易请销假 - Vue 练手版

> 注：本程序目的仅为交流学习，如有其他人用于其他用途，与开发者本人无关

- 本项目的前端采用  Vue.js 框架，京东的 NutUI 进行开发，旨在熟悉 Vue 的 component 以及 router 的用法。而后端使用 Node.js 进行简易的接口开发，配合前端发送 get 请求获取相应的数据，有很多不足之处，在今后的开发中或许会修复改正，或直接弃坑，doge。

- 使用 Java 的 QQMirai 机器人框架进行了一个简易的管理程序的开发。

  指令合集

  | 指令     | 说明                                              |
  | -------- | ------------------------------------------------- |
  | 获取密码 | 获取当前页面应用的管理员密码，只存在五分钟有效期  |
  | 紧急状态 | 切换紧急状态，无法获取管理员密码，无法进入Profile |
  | 正常状态 | 从紧急状态切换回正常状态，一切都可正常使用        |

- 使用 MySQL 数据库进行数据的存储

  建表语句

  ``` sql
  create database yibanleave;
  use yibanleave;
  //用户数据表
  create table usrdata
  (
  	  name char(10) not null,   
      id char(14) not null primary key,  
      clg char(15) not null,   
      mjcls char(30) not null,  
      tcr char(10) not null,    
      type char(10) not null, 
      leaveS bool not null,
      leaveB bool not null, 
      way char(30) not null,    
      route char(30),  
      rsn char(30),   
      begin char(20) not null,
      end char(20) not null,
      apply char(20) not null,
      stel char(14) not null,   
      ptel char(14) not null 
      
  );
  //动态密码表
  create table dynamicpsw
  (
  	  psw char(8) not null,
      time datetime not null
  );
  ```

  