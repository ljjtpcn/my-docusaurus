---
title: MySql函数
date: 2021-12-30
tags: [mysql, 数据库]
---

[官网地址](https://dev.mysql.com/doc/refman/8.0/en/functions.html)

### 1、常用函数

数学运算

```sql
SELECT RAND() --返回0~1之间的随机数
```

字符串

```sql
SELECT CHAR_LENGTH('这是一串文本') --返回字符串长度
SELECT CONCAT('JAVA','是世界上最好用的语言') --拼接字符串
SELECT LOWER('LJJ') --到小写
SELECT UPPER('ljj') --到大写
```

时间日期

```sql
SELECT CURRENT_DATE() --获取当前日期
SELECT CURDATE() --获取当前时间 与上面等价
SELECT NOW() --获取当前时间
SELECT LOCALTIME() --本地时间
SELECT SYSDATE() --系统时间
```

系统

```
SELECT SYSTEM_USER() -- 获取当前用户
SELECT USER() -- 获取当前用户  root@localhost
SELECT VERSION() --获取当前版本  8.0.21
```

### 2、聚合函数

| 函数名    | 描述     |
| --------- | -------- |
| **COUNT** | **计数** |
| SUM       | 求和     |
| AVG       | 平均值   |
| MAX       | 最大值   |
| MIN       | 最小值   |
| …         | …        |

COUNT(列) —指定列，当值为 Null 不计数

COUNT(\*) —获取全部计数结果，不会忽略 NULL 值

COUNT(1) —忽略所有列，用 1 代表代码行，不会忽略 NULL 值

执行效率上：
列名为主键，count(列名)会比 count(1)快
列名不为主键，count(1)会比 count(列名)快
如果表多个列并且没有主键，则 count（1） 的执行效率优于 count(\*)
如果有主键，则 select count（主键）的执行效率是最优的
如果表只有一个字段，则 select count(\*)最优。
`使用聚合函数，常常与分组 GROUP BY 和 HAVING 结合使用。`

> 参考链接 [count(1)、count(\*)与 count(列名)的执行区别](https://www.cnblogs.com/Memories-off/p/10435558.html)

