---
title: MySQL索引
date: 2021-12-30
tags: [mysql, 数据库]
---

:::info
索引（Index）是帮助 MySQL 高效获取数据的数据结构。

提取句子主干，就可也得到索引的本质：索引是数据结构
:::

### 1、索引分类

一个表中，主键索引只能有一个，唯一索引可以有多个

- 主键索引（PRIMARY KEY）

  - 唯一的标识，主键不可重复，只能有一个列作为主键

- 唯一索引（UNIQUE KEY）

  - 避免重复的列出现，唯一索引可以重复，多个列，都可以标识为 唯一索引

- 常规索引（KEY/INDEX）

  - 默认的，index，key 关键字来设置

- 全文索引 （FULLTEXT）
  - 在特定的数据库引擎下才有

### 2、索引的使用

```sql
-- 显示所有的索引信息
SHOW INDEX FROM 表名

-- 添加一个全文索引 索引名 字段名
ALTER TABLE 表名 ADD FULLTEXT INDEX 索引名(字段名)

-- EXPLAIN 分析sql执行的状况
EXPLAIN SELECT * FROM student; -- 非全文索引

```

### 3、测试索引

插入 100 万数据，编写 mysql 函数

不过 mysql 的默认是不允许创建函数

在此之前需要执行一下 SET GLOBAL log_bin_trust_function_creators = 1;

```sql
DELIMITER $$ 
CREATE FUNCTION mock_data()
RETURNS INT
BEGIN
	DECLARE num INT DEFAULT 1000;
	DECLARE i INT DEFAULT 0;

	WHILE i<num DO
	INSERT INTO big(`name`,`age`,`phone`) VALUES (CONCAT('用户',i),FLOOR(RAND()*100),CONCAT('15',FLOOR(RAND()*((99999999-100000000)+100000000))));
		SET i = i+1;
	END WHILE;
	RETURN i;
END;

SELECT mock_data(); -- 执行函数
```

```sql
SELECT * FROM big WHERE `name`='用户99999' --此时查询数据近0.257s

-- id_表名_字段名 索引名
-- CREATE INDEX 索引名 ON 表(字段);
CREATE INDEX id_big_name ON big(`name`);

SELECT * FROM big WHERE `name`='用户99999' --此时查询数据0.001s
```

索引在小数据量的时候，用处不大，但在大数据中，能得到一个非常明显的提升

### 4、索引原则

- 索引不是越多越好
- 前期完全没必要加索引，完全可以后面在添加索引
- 索引一般加在用来查询的字段，以提高查询速度

`Btree`：`INNODB` 的默认数据结构

有关索引的一篇文章[MySQL 索引背后的数据结构及算法原理](http://blog.codinglabs.org/articles/theory-of-mysql-index.html)

