---
title: MySql笔记
date: 2020-12-30
tags: [mysql, 数据库]
---



# DDL

## C(Create):创建数据库

```sql
CREATE DATABASE DB3;
```


+ 当要创建的数据库不确定是否存在时

```sql
CREATE DATABASE IF NOT EXISTS DB3; -- 创建DB3前先判断是否存在,不存在则创建
```

+ 指定数据库字符集

```sql
CREATE DATABASE DB4 CHARACTER SET GBK; -- 为新创建的数据库DB4指定字符集为GBK
```

+  将以上两个语法综合使用即为

```sql
CREATE DATABASE IF NOT EXISTS DB3 CHARACTER SET GBK; -- 创建DB4前先判断是否存在,不存在则创建数据库且指定字符集为GBK
```

## R(Retrieve):查询数据库

```sql
SHOW DATABASES;
```

+ 查询某个数据库的默认字符集;查询某个数据库的创建语句

```sql
SHOW CREATE DATABASE DB2;
```

## U(Update):修改数据库

```sql
ALTER DATABASE DB4 CHARACTER SET utf8; -- 修改数据库DB4的字符集为utf8
```

## D(Delete):删除数据库

```sql
DROP DATABASE DB4; -- 删除数据库DB4
```

+ 判断数据库是否存在,存在再删除

```sql
DROP DATABASE IF EXISTS DB4; -- 判断数据库DB4是否存在,存在再删除 注意没有NOT
```

+ 查询当前正在使用的数据库名称

```sql
SELECT DATABASE(); -- NULL表示没有使用数据库
```

+ 使用数据库

```sql
USE DB1; -- 使用数据库DB1
```

---

# MySQL数据类型

## 1、数值

| 类型      | 描述                | 所占字节     | 用途                            |
| --------- | ------------------- | ------------ | ------------------------------- |
| tinyint   | 十分小的数据        | 1 个字节     | 一般用来当布尔值用              |
| smallint  | 较小的数据          | 2 个字节     | 少用                            |
| mediumint | 中等的数据          | 3 个字节     | 少用                            |
| **int**   | **标准整数**        | **4 个字节** | **常用**                        |
| bigint    | 较大的整数          | 8 个字节     | 少用                            |
| float     | 单浮点数/单精度小数 | 4 个字节     | 少用                            |
| double    | 双浮点数/双精度小数 | 4 个字节     | 少用 有精度问题                 |
| decimal   | 字符串形式的浮点数  | 不一定       | 精度要求高用 decimal (金融计算) |

## 2、字符串

| 类型        | 描述                       | 用途                    |
| ----------- | -------------------------- | ----------------------- |
| char        | 固定大小 0~255，不可变长度 | 存手机号等固定长度      |
| **varchar** | **可变字符串 0~65535**     | **存可变字符串 存变量** |
| tinytext    | 微型文本 2^8-1             | 能用 text 就别用这个    |
| **text**    | **文本串 2^16-1**          | **保存大文本**          |

## 3、时间日期

| 类型         | 描述                                       | 用途                 |
| ------------ | ------------------------------------------ | -------------------- |
| date         | YYYY-MM-DD 日期                            | 存日期               |
| time         | HH:mm:ss 时间                              | 存                   |
| **datetime** | **YYYY-MM-DD HH:mm:ss**                    | **最常用的时间格式** |
| timestamp    | 时间戳形式 1970.1.1 8:00:00 到现在的毫秒数 | 但会有 2038 年问题   |

## 4、NULL

不要用 NULL 进行运算，结果为 NULL

## 5、字段类型

| 字段类似 | 描述                                        | 用途                   |     |
| -------- | ------------------------------------------- | ---------------------- | --- |
| Unsigned | 无符号整数                                  | 该列不能声明为负数     |     |
| zerofill | 用 0 填充                                   | 不足的位数 用 0 来填充 |     |
| 自增     | 自动在上一条记录+1 （默认，可设置自增大小） | 设置唯一的主键 如 id   |     |
| 非空     | not null                                    | 该字段不能为 NULL      |     |
| 默认     | 默认值                                      | 不指定 则默认值        |     |



## C(Create):创建表

```sql
CREATE TABLE 表名(
    列名1 数据类型1,
    列名2 数据类型2,
    ...
    列名n 数据类型n
    );
```

> 常用数据类型
> + 整数类型` int`
> + 小数类型 `double(5, 2)`  -- 表示最长5位,小数点后2位(即最大值为999.99)
> + 日期类型 `date` -- 只包含年月日, `yyyy-MM-dd`
> + 日期类型 `datetime`  -- 只包含年月日时分秒, `yyyy-MM-dd HH:mm:ss`
> + 时间戳类型 `timestamp` --  包含年月日时分秒,  如果将来不给这个字段赋值,或赋值为null,则默认自动使用当前的系统时间
> + 字符串类型 `varchar(10)` -- 表示该字段最大10个字符数
+ 例:

```sql
CREATE TABLE student(
	id int,
    name varchar(32),
    age int,
    score double(4, 1),
    birthday date,
    insert_time timestamp
);
```

## R(Retrieve):查询表

+ 查询某个数据库中所有的表名称(当前使用的数据库为`mysql`)

```sql
SHOW TABLES; -- EMPTY表示当前使用的表为空表
```

+ 查询表结构

```sql
DESC host; -- 查询当前mysql数据库中的表host的结构
```

+ 查询表的字符集

```sql
SHOW CREATE TABLE 表名;
```

## U(Update):修改表

+ 修改表名 

```sql
ALTER TABLE 表名 RENAME TO 新的表名;
-- 例 -- 
ALTER TABLE student TO stu;
```

+ 修改表的字符集

```sql
ALTER TABLE 表名 CHARACTER SET 字符集名称;
```

+ 添加一列

```sql
ALTER TABLE 表名 ADD 列名 数据类型;
-- 例 --
ALTER TABLE stu ADD gender varchar(10); -- 向表 stu 加入新的列 gender 数据类型为 varchar
```

+ 修改列名称类型 


 ```sql
ALTER TABLE 表名 CHANGE 列名 新列名 新数据类型;
ALTER TABLE 表名 MODIFY 列名 新数据类型;
-- 例 --
ALTER TABLE stu CHANGE gender sex varchar(20); -- 将表stu的gender列重命名为sex,数据类型为varchar(20)
 ```

+ 删除列

```sql
ALTER TABLE 表名 DROP 列名;
```

##  D(Delete):删除表

+ 删除

```sql
DROP table 表名; -- 直接删除
```

```sql
DROP table IF EXISTS 表名; -- 先判断是否存在再删除
```

+ 复制表

```sql
CREATE TABLE stu LIKE student; -- 创建一个长得像(LIKE) student 的stu表(即复制了student表)
```



---



# 约束

**对标准的数据进行限定,保证数据的正确性,有效性和完整性。**

## 非空约束

> NOT NULL **某一列的值不能为`NULL`**
+ 在创建表时添加非空约束

```sql
CREATE TABLE stu(
	id INT,
	name VARCHAR(20) NOT NULL -- name为非空
);
```
+ 在表创建完后添加`name`的非空约束

```sql
ALTER TABLE stu MODIFY name VARCHAR(20) NOT NULL;
```
+ 删除`name`的非空约束

```sql
ALTER TABLE stu MODIFY name VARCHAR(20);
```

## 唯一约束(唯一索引)

> UNIQUE **某一列的值不能重复**
+ 在创建表时添加唯一约束

```sql
CREATE TABLE stu(
	id INT,
	phone VARCHAR(20) UNIQUE -- 手机号不能重复
);
```
+ 在表创建完后添加`phone`的唯一约束

```sql
ALTER TABLE stu MODIFY phone VARCHAR(20) UNIQUE;
```
+ 删除`phone`的唯一约束

```sql
-- ALTER TABLE 表名 DROP INDEX 索引名;
ALTER TABLE stu DROP INDEX phone; -- 删除唯一约束(与非空约束删除语法不一样)
```
> 唯一约束可以有`NULL`值, 但是只能有一条记录为`NULL`值
## 主键约束

> PRIMARY KEY **非空且唯一**
+ 在创建表时添加主键约束

```sql
CREATE TABLE stu(
	id INT PRIMARY KEY, -- 给id添加主键约束
	name VARCHAR(20)
);
```

+ 在表创建完后添加`id`的主键约束

```sql
ALTER TABLE stu MODIFY id INT PRIMARY KEY;
```


+ 删除`id`的主键约束

```sql
ALTER TABLE stu DROP PRIMARY KEY;  -- 删除主键约束(与前面约束删除语法不一样)
```

> 1. 一张表中只能有一个字段为主键</br>
2. 主键就是表中记录的唯一标识  

## 自动增长

> 如果某一列是数值类型,使用 `auto_increment` 可以完成自动增长,一般配合主键约束使用
+ 在创建表时添加主键约束,完成自动增长

```sql
CREATE TABLE stu(
	id INT PRIMARY KEY AUTO_INCREMENT, -- 给id添加主键约束,完成自动增长
	NAME VARCHAR(20)
);
```


+ 删除自动增长

```sql
ALTER TABLE stu MODIFY id INT;
```


+ 添加自动增长

```sql
ALTER TABLE stu MODIFY id INT AUTO_INCREMENT;
```

## 外键约束

> FOREIGN KEY 让表与表产生关系, 从而保证数据的正确性
+ 在创建表时添加外键

```sql
CREATE TABLE 表名(
	......
	外键列
	CONSTRAINT 外键名称 FOREIGN KEY (外键列名称) REFERENCES 主表表名(主表列名称);
);
```

+ 在表创建完后添加外键

```sql
ALTER TABLE 表名 ADD CONSTRAINT 外键名称 FOREIGN KEY (外键列名称) REFERENCES 主表表名(主表列名称);
```


+ 删除外键

```sql
ALTER TABLE 表名 DROP FOREIGN KEY 外键名称;
```
+ 例

```sql
CREATE TABLE class(
	id INT PRIMARY KEY AUTO_INCREMENT,
	username VARCHAR(20),
);
CREATE TABLE student(
	id INT PRIMARY KEY AUTO_INCREMENT,
	NAME VARCHAR(20),
	age INT,
	class_id INT, -- 外键对应主表的主键
	CONSTRAINT stu_class_fk FOREIGN KEY (class_id) REFERENCES class(id)
);
```
> `class`表必须先创建, 即被关联的表必须先创建才能被关联
> ~~先有爸爸后有儿子~~,外键可以为`null`但是不能为不存在的值
---

## 级联更新

+ 在表创建完后添加外键,设置级联更新

```sql
ALTER TABLE 表名 ADD CONSTRAINT 外键名称 FOREIGN KEY (外键列名称) REFERENCES 主表表名(主表列名称) ON UPDATE CASCADE;
```

##  级联删除

+ 在表创建完后添加外键,设置级联删除

```sql
ALTER TABLE 表名 ADD CONSTRAINT 外键名称 FOREIGN KEY (外键列名称) REFERENCES 主表表名(主表列名称) ON DELETE CASCADE;
```
> **级联更新**为ON `UPDATE` CASCADE</br>
>    **级联删除**为ON `DELETE` CASCADE
# DML

##  添加数据

```sql
INSERT INTO 表名(列名1, 列名2, ...,列名n) VALUES(值1, 值2, ..., 值n);
-- 例 --
INSERT INTO student(id, name, age) VALUES(1, 'ljj', 21);
---
INSERT INTO student(name) VALUES ('张三'), ('李四'), ('王五');
```

> 列名和值要一一对应
>
> 如果表名后不给定列名, 则默认给所有列添加值
>
> `INSERT INTO 表名 VALUES(值1, 值2, ..., 值n);`
>
> 除了数字类型,其他类型需要使用引号(单双均可)引起来
## 删除数据

```sql
DELETE FROM 表名 [WHERE 条件];
-- 例 --
DELETE FROM student WHERE id = 1; -- 从表student中删除id值为1的数据
```

> 如果不加`WHERE`条件,则删除表中所有数据
>
> 如果要删除所有记录
>
>    + `DELETE FROM 表名;` -- 不推荐使用。有多少条记录就会执行多少次删除操作,效率低
>    + `TRUNCATE TABLE 表名;` -- 推荐使用。先删除表然后再创建一张一模一样的空表，效率高
## 修改数据

```sql
UPDATE 表名 SET 列名1 = 值1, 列名2 = 值2 [WHERE id = 1];
-- 例 --
UPDATE student SET age = 110, score = 100 WHERE id = 1;
```

> 如果不加任何条件, 则会将表中所有记录全部修改
---



# DQL


```sql
SELECT
	字段列表
FROM
	表名列表
WHERE
	条件列表
GROUP BY
	分组列表
HAVING
	分组之后的条件
ORDER BY
	排序
LIMIT
	分页限定
```

##  多个字段的查询

```sql
-- 查询多个字段 --
SELECT name, age FROM student;
-- 也可以查询单个字段 --
SELECT address FROM student;
-- 查询所有字段 --
SELECT * FROM student; -- 工作中一般不让用
```

##  去除重复结果集

上一步我们查询了`address`发现有重复的地址(香港),有没有办法去除呢?~~(我寻思这不是废话吗!当然有)~~

```sql
SELECT DISTINCT address FROM student; -- 这里去除的是address上的重复
SELECT DISTINCT name, address FROM student; -- 这里去除的是name字段和address字段同时相同时的重复
```

##  计算列

```sql
-- 一般可以使用四则运算计算一些列的值(一般只会进行数字型的计算)
/* 计算 math 和 english 之和
   注意 如果有null 参与的运算,那么计算结果都为 null
   IFNULL(english, 0) 表示如果english为null则替换成0进行计算
*/
SELECT name, math, english, math + IFNULL(english, 0) FROM student;
```

##  起别名

~~有没有发现上面计算的`math+english`列很长,很难看~~ ,所以接下来我们可以给该列取个别名

```sql
SELECT name, math, english, math + IFNULL(english, 0) AS 总分 FROM student; -- AS 总分
```

`AS`都可以省略,但是要用**空格**代替

```sql
SELECT name 姓名, math 数学, english 英语, math + IFNULL(english, 0)  总分 FROM student; -- 空格代替AS
```

##  条件查询

```sql
-- 查询年龄在20~30之间的数据
SELECT * FROM student WHERE age < 30 AND age > 20;
SELECT * FROM student WHERE age BETWEEN 20 AND 30;
-- 查询年龄是19或者22或者25的数据
SELECT * FROM student WHERE age = 19 OR age = 22 OR age = 25;
SELECT * FROM student WHERE age IN(19,22,25);
-- 查询english为NULL或者不为NULL的数据
SELECT * FROM student WHERE english = NULL; -- 错误语法
SELECT * FROM student WHERE english IS NULL; -- 正确语法
SELECT * FROM student WHERE english IS NOT NULL; -- 正确语法
```

>  对于`NULL`值的查询不能使用`=`或者`!=`, 而应当使用`IS`或者`IS NOT`
### 模糊查询

`%`: 匹配多个(可以是0个)字符

`_`: 匹配单个字符

```sql
-- 查询姓马的人
SELECT * FROM student WHERE NAME LIKE '马%';
-- 查询姓马且名字为2个字的人
SELECT * FROM student WHERE NAME LIKE '马_';
-- 查询姓名第二个字是化的人
SELECT * FROM student WHERE NAME LIKE '_化%';
-- 查询姓名中包含马的人
SELECT * FROM student WHERE NAME LIKE '%马%';
```

### 排序查询

>  根据某些字段进行升序或降序排列
**语法: ORDER BY 排序字段1, 排序方式1, 排序字段2, 排序方式2, ...;**

```sql
SELECT * FROM student ORDER BY math; -- 默认为ASC升序排序
SELECT * FROM student ORDER BY math DESC; -- DESC降序排序
-- 先按math升序排序,当math一样时,则使用english升序排序
SELECT * FROM student ORDER BY math ASC, english ASC; 
```

### 聚合函数

>  将某一列数据作为一个整体,进行纵向的计算
1. `count`: 计算个数
2. `max(min)`: 取最大(最小)值
3. `sum`: 计算和
4. `avg`: 计算平均值

```sql
SELECT COUNT(NAME) FROM student; -- 一般选择主键进行计算,不推荐使用 count(*)
SELECT MIN(IFNULL(english, 0)) FROM student;
SELECT AVG(IFNULL(english, 0)) FROM student;
```

>  聚合函数的计算排除了`NULL`值,如需加上`NULL`,可使用`IFNULL`语法或选择不包含`NULL`的列进行计算
### 分组查询

>  以某一字段为依据进行分组,再进行各种查询
**语法: GROUP BY 分组字段;**

```sql
--按照性别分组,分别查询男女同学的平均分, 人数
SELECT sex, AVG(IFNULL(english, 0)), COUNT(id) FROM student GROUP BY sex;
-- 以下查询字段中包含了name字段,语法虽然不会报错,但是是无意义的
SELECT name, sex, AVG(IFNULL(english, 0)) FROM student GROUP BY sex;
-- 在分组之前可以添加WHERE条件限制参加分组的数据,如以下是仅数学分数大于70的同学才能参加分组
SELECT sex, AVG(IFNULL(math, 0)), COUNT(id) 人数 FROM student WHERE math > 70 GROUP BY sex;
--按照性别分组,分别查询男女同学的平均分, 人数, 要求:数学大于70分的人才参与分组,分组之后人数应大于2人
SELECT sex, AVG(IFNULL(math, 0)), COUNT(id) 人数 FROM student WHERE math > 70 GROUP BY sex HAVING 人数 > 2;
```

>  1. 分组查询的字段应为分组字段或者聚合函数,不要使用此之外的字段,因为那是毫无意义的</br>
>  1. 在**分组之前**可以使用`WHERE`条件限制参加分组的数据</br>
>  3. 在**分组之后**可以使用`HAVING`条件限制需要查询的分组的数据
`WHERE`和`HAVING`的区别?
1. `WHERE`在分组之前进行限定,如果不满足条件,则不参与分组。`HAVING`在分组之后进行限定,如果不满足结果, 则不会被查询出来
2. `WHERE`后不可以跟聚合函数, `HAVING`可以进行聚合函数的判断


### 分页查询

> 分页显示查询结果
**语法: LIMIT 开始的索引, 每页查询的条数;**

```sql
-- 每页显示3条
SELECT * FROM student LIMIT 0, 3; -- 第一页
SELECT * FROM student LIMIT 3, 3; -- 第二页
-- 公式: 开始的页码 = (当前的页码 - 1) * 每页显示的条数
```
~~或~~
+ SQL查询语句中的 limit 与 offset 的区别

```sql
limit y --分句表示: 读取 y 条数据
limit x, y --分句表示: 跳过 x 条数据，读取 y 条数据
limit y offset x --分句表示: 跳过 x 条数据，读取 y 条数据
limit n  --等价于 limit 0, n
```

> `LIMIT`为MySQL的**方言**
---



# 连接

**<center>镇楼图镇楼图镇楼图镇楼图镇楼图镇楼图镇楼图镇楼图镇楼图</center>**

![](https://hexoljj.oss-cn-shenzhen.aliyuncs.com/img/202112161841839.jpg)

> 准备sql
+ 创建部门表
```sql
CREATE TABLE dept(
	id INT PRIMARY KEY AUTO_INCREMENT,
	NAME VARCHAR(20)
);
INSERT INTO dept (NAME) VALUES ('开发部'),('市场部'),('财务部');
```
+ 创建员工表
```sql
CREATE TABLE emp (
	id INT PRIMARY KEY AUTO_INCREMENT,
	NAME VARCHAR(10),
	gender CHAR(1), -- 性别
	salary DOUBLE, -- 工资
	join_date DATE, -- 入职日期
	dept_id INT,
	FOREIGN KEY (dept_id) REFERENCES dept(id) -- 外键，关联部门表(部门表的主键)
);
INSERT INTO emp(NAME,gender,salary,join_date,dept_id) VALUES('孙悟空','男',7200,'2013-02-24',1);
INSERT INTO emp(NAME,gender,salary,join_date,dept_id) VALUES('猪八戒','男',3600,'2010-12-02',2);
INSERT INTO emp(NAME,gender,salary,join_date,dept_id) VALUES('唐僧','男',9000,'2008-08-08',2);
INSERT INTO emp(NAME,gender,salary,join_date,dept_id) VALUES('白骨精','女',5000,'2015-10-07',3);
INSERT INTO emp(NAME,gender,salary,join_date,dept_id) VALUES('蜘蛛精','女',4500,'2011-03-14',1);
```



+ 笛卡尔积: 有两个集合`A, B`, 取这两个集合的所有组成情况。

> 要完成多表查询, 需要消除无用的数据
## 内连接查询

+ 隐式内连接: 使用where条件消除无用数据

```sql
-- 查询所有员工信息和对应的部门信息
SELECT * FROM emp,dept WHERE emp.`dept_id` = dept.`id`;
-- 查询员工表的姓名，性别。部门表的名称
SELECT emp.name, emp.gender, dept.name FROM emp, dept WHERE emp.`dept_id` = dept.`id`;
--简化(给表起别名) 常用 --
SELECT 
	t1.name, -- 员工表的姓名
	t1.gender,-- 员工表的性别
	t2.name -- 部门表的名称
FROM
	emp t1,
	dept t2
WHERE 
	t1.`dept_id` = t2.`id` ;
```

+ 显式内连接

`SELECT 字段列表 FROM 表名1 [INNER] JOIN 表名2 ON 条件`
```sql
SELECT * FROM emp t1 INNER JOIN dept t2 ON t1.`dept_id` = dept.`id`;
SELECT * FROM emp t1       JOIN dept t2 ON t1.`dept_id` = t2.`id`;
```
> 1. 从哪些表中查询数据
> 2. 条件是什么
> 3. 查询哪些字段
## 外连接查询

+ 左外连接(查询的是左表所有数据以及其交集部分)

`SELECT 字段列表 FROM 表1 LEFT [OUTER] JOIN 表2 ON 条件`
```sql
-- 查询所有员工信息，如果员工有部门，则查询部门名称，没有部门，则不显示部门名称
SELECT t1.*, t2.name FROM emp t1 LEFT JOIN dept t2 ON t1.`dept_id` = t2.`id`;
```

+ 右外连接(查询的是右表所有数据以及其交集部分)

`SELECT 字段列表 FROM 表1 RIGHT [OUTER] JOIN 表2 ON 条件`
```sql
-- 查询所有部门信息，如果部门下有员工，则显示所有员工姓名，如果没有员工，则不显示员工姓名
SELECT t1.name, t2.name FROM emp t1 RIGHT JOIN dept t2 ON t1.`dept_id` = t2.`id`;
```

##  子查询

> 查询中嵌套查询,称嵌套查询为子查询
+ 子查询的结果是单行单列的(使用运算符 `>` `>=` `<` `<=` `=`来判断)

```sql
-- 查询员工工资小于平均工资的人
SELECT * FROM emp WHERE emp.salary < (SELECT AVG(salary) FROM emp);
```

+ 子查询的结果是多行单列的(使用运算符`IN`来判断)

```sql
-- 查询'财务部'和'市场部'所有的员工信息
SELECT id FROM dept WHERE NAME = '财务部' OR NAME = '市场部';
SELECT * FROM emp WHERE dept_id = 3 OR dept_id = 2;
-- 子查询
SELECT * FROM emp WHERE dept_id IN (SELECT id FROM dept WHERE NAME = '财务部' OR NAME = '市场部');
--当然,也可以使用学到的隐式内连接得到同样的效果
SELECT emp.* FROM emp, dept WHERE dept.`NAME` IN( "财务部", "市场部") AND emp.`dept_id` = dept.`id`;
```

+ 子查询的结果是多行多列的(可以作为一张`虚拟表`参与查询)

```sql
-- 查询员工入职日期是2011-11-11日之后的员工信息和部门信息
-- 子查询
SELECT * FROM dept t1 ,(SELECT * FROM emp WHERE emp.`join_date` >'2011-11-11') t2
WHERE t1.id = t2.dept_id;
-- 普通内连接
SELECT * FROM emp t1,dept t2 WHERE t1.`dept_id` = t2.`id` AND t1`join_date` >  '2011-11-11'
```

---

# DCL

**DBA：数据库管理员**

## 管理用户

1. 添加用户

```sql
CREATE USER '用户名'@'主机名' IDENTIFIED BY '密码';
```

2. 删除用户

```sql
DROP USER '用户名'@'主机名';
```

3. 修改用户密码

```sql
---PASSWORD()为加密函数
UPDATE USER SET PASSWORD = PASSWORD('新密码') WHERE USER = '用户名';
--例
UPDATE USER SET PASSWORD = PASSWORD('abcd') WHERE USER = 'lisi';
SET PASSWORD FOR '用户名'@'主机名' = PASSWORD('新密码');
--例
SET PASSWORD FOR 'root'@'localhost' = PASSWORD('123');
```

4. 查询用户

```sql
-- 1. 切换到mysql数据库
USE myql;
-- 2. 查询user表
SELECT * FROM USER;
```
> 通配符： % 表示可以在任意主机使用用户登录数据库
## 权限管理
1. 查询权限

```sql
-- 查询权限
SHOW GRANTS FOR '用户名'@'主机名';
-- 例
SHOW GRANTS FOR 'lisi'@'%';
```
2. 授予权限

```sql
-- 授予权限
GRANT 权限列表 ON 数据库名.表名 TO '用户名'@'主机名';
-- 给张三用户授予查询, 修改权限，在任意数据库任意表上
GRANT SELECT,UPDATE ON *.* TO 'zhangsan'@'localhost';
-- 给张三用户授予创建权限，在任意数据库任意表上（注意授予创建权限时不加 ON！！！）
GRANT CREATE TO 'zhangsan'@'localhost';
-- 给张三用户授予所有权限，在任意数据库任意表上
GRANT ALL ON *.* TO 'zhangsan'@'localhost';
```
3. 撤销权限

```sql
-- 撤销权限
REVOKE 权限列表 ON 数据库名.表名 FROM '用户名'@'主机名';
REVOKE UPDATE ON db3.`account` FROM 'lisi'@'%';
```



#  MySQL 函数

[官网地址](https://dev.mysql.com/doc/refman/8.0/en/functions.html)

## 1、常用函数

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

## 2、聚合函数

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

> 参考链接 [count(1)、count(\*)与 count(列名)的执行区别](https://www.cnblogs.com/Memories-off/p/10435558.html)
使用聚合函数，常常与分组 GROUP BY 和 HAVING 结合使用。

---

# 范式

**设计关系数据库时，遵从不同的规范要求，设计出合理的关系型数据库，这些不同的规范要求被称为不同的范式，各种范式呈递次规范，越高的范式数据库冗余越小。关系数据库有六种范式：第一范式(1NF)、第二范式(2NF)、第三范式(3NF)、巴斯-科德范式(BCNF)、第四范式(4NF)和第五范式(5NF，又称完美范式)。**

> 以下为一张普通表通过遵循前三个范式所得到的最终表的处理过程 
**<center>普通表</center>**

**<center>![](https://hexoljj.oss-cn-shenzhen.aliyuncs.com/img/202112131021566.png)</center>**

## 第一范式(1NF)

> 对于添加的一个规范要求，所有的域都应该是原子性的，即数据库表的每一列都是不可分割的原子数据项，而不能是集合，数组，记录等非原子数据项。
将**系**列拆分成**系名**,**系主任**两列
**<center>遵循第一范式处理后的表</center>**

**<center>![](https://hexoljj.oss-cn-shenzhen.aliyuncs.com/img/202112131023102.png)</center>**

**存在的问题:**</br>

    1. 数据冗余: 姓名,系名,系主任
    2. 数据添加存在问题: 添加新开设的系和系主任时,数据不合法
    3. 数据删除存在问题: 张无忌同学毕业了,删除数据,会将系的数据一起删除

##  第二范式(2NF)

> 在1NF的基础上，非码属性必须完全依赖于候选码（在1NF基础上消除非主属性对主码的部分函数依赖）
消除`(姓名,系名,系主任)`非主属性对码`(学号,课程)`的部分依赖,剩下保留命名为**选课表**,新增**学生表**

+ 函数依赖

    `A --> B`, 如果通过A属性(属性组)的值,可以唯一确定B属性的值。则称B依赖于A
    
    例如:`学号 --> 姓名`  `(学号,课程名称)  --> 分数`

+ 完全函数依赖

    `A --> B`, 如果A是一个属性组,则B属性值的确定需要依赖于A属性组中**所有**的属性值

    例如:`(学号,课程名称)  --> 分数`

+ 部分函数依赖

    `A --> B`, 如果A是一个属性组,则B属性值的确定只需要依赖于A属性组中**某一些**值即可

    例如:`(学号,课程名称)  --> 姓名`

+ 传递函数依赖

    `A --> B, B --> C`, 如果通过A属性(属性组)的值,可以确定唯一B属性的值,再通过B属性(属性组)的值可以唯一确定C属性的值,则称C传递依赖于A

    例如:`(学号 --> 系名, 系名 --> 系主任)`

+ 码

    如果在一张表中,一个属性或属性组,被其他所有属性所完全依赖,则称这个属性(属性组)为该表的码
    
    主属性: 码属性组中的所有属性

    非主属性: 除码属性组的属性

    例如: 该表中码为`(学号,课程名称)`

> 在`1NF`**表**中,分数完全依赖于`(学号,课程)`,故不删除</br>在**学生表**中,`学号`为主属性,`(姓名,系名,系主任)`为非主属性,`(分数,课程名称)`属性可删除
**<center>将表拆分,解决问题1(数据冗余)</center>**

**<center>![](https://hexoljj.oss-cn-shenzhen.aliyuncs.com/img/202112131112617.png)</center>**

## 第三范式(3NF)

> 在2NF基础上，任何非主属性不依赖于其它非主属性（在2NF基础上消除传递依赖）
观察上方`2NF`**学生表**可知,其存在传递依赖`学号 --> 系名, 系名 --> 系主任`,故需消除该传递依赖,将学生表中系主任列删掉,新增**系表**

**<center>解决问题2,3(增删数据)</center>**

![](https://hexoljj.oss-cn-shenzhen.aliyuncs.com/img/202112131126635.png)

~~***至此,3个问题均得到解决***~~





# 事务（Transaction）

## 事务的基本介绍

> 如果一个包含多个步骤的业务操作，被事务管理，那么这些操作要么同时成功，要么同时失败。
+ 操作: 

```sql
1. 开启事务: start transaction;
2. 回滚: rollback; -- 出现异常回滚
3. 提交: commit; -- 正常提交
```
+ 事务提交的两种方式(**MySQL**数据库中事务默认自动提交)
  + 自动提交：

      一条DML(增删改)语句会自动提交一次事务。

  + 手动提交：

      **Oracle** 数据库默认是手动提交事务(需要先开启事务，再提交)

+ 查看事务的默认提交方式

```sql
SELECT @@autocommit; -- 1 代表自动提交  0 代表手动提交
```
 + 修改默认提交方式

```sql
SET @@autocommit = 0; -- 1 代表自动提交  0 代表手动提交 
```

##  事务的四大特征

	原子性（Atomicity）、一致性（Consistency）、隔离性（Isolation）、持久性（Durability）
	1. 原子性：是不可分割的最小操作单位，要么同时成功，要么同时失败。
	2. 一致性：事务操作前后，数据总量不变。
	3. 隔离性：多个事务之间,相互独立。
	4. 持久性：当事务提交或回滚后，数据库会持久化的保存数据。



##  事务的隔离级别

* 概念：多个事务之间隔离的，相互独立的。但是如果多个事务操作同一批数据，则会引发一些问题，设置不同的隔离级别就可以解决这些问题。
	* 存在问题：
		1. 脏读：一个事务，读取到另一个事务中没有提交的数据
		2. 不可重复读(虚读)：在同一个事务中，两次读取到的数据不一样。
		3. 幻读：一个事务操作(DML)数据表中所有记录，另一个事务添加了一条数据，则第一个事务查询不到自己的修改。
	* 隔离级别：
		1. `read uncommitted`：读未提交
			* 产生的问题：脏读、不可重复读、幻读
		2. `read committed`：读已提交 （Oracle）
			* 产生的问题：不可重复读、幻读
		3. `repeatable read`：可重复读 （MySQL默认）
			* 产生的问题：幻读
		4. `serializable`：串行化
			* 可以解决所有的问题

		>隔离级别从小到大安全性越来越高，但是效率越来越低
	* 数据库查询隔离级别：
		`select @@tx_isolation;`
	* 数据库设置隔离级别：
        `set global transaction isolation level  级别字符串;`
# 索引

索引（Index）是帮助 MySQL 高效获取数据的数据结构。

提取句子主干，就可也得到索引的本质：索引是数据结构

## 1、索引分类

一个表中，主键索引只能有一个，唯一索引可以有多个

- 主键索引（PRIMARY KEY）

  - 唯一的标识，主键不可重复，只能有一个列作为主键

- 唯一索引（UNIQUE KEY）

  - 避免重复的列出现，唯一索引可以重复，多个列，都可以标识为 唯一索引

- 常规索引（KEY/INDEX）

  - 默认的，index，key 关键字来设置

- 全文索引 （FULLTEXT）
  - 在特定的数据库引擎下才有

## 2、索引的使用

```
-- 显示所有的索引信息
SHOW INDEX FROM 表名
-- 添加一个全文索引 索引名 字段名
ALTER TABLE 表名 ADD FULLTEXT INDEX 索引名(字段名)
-- EXPLAIN 分析sql执行的状况
EXPLAIN SELECT * FROM student; -- 非全文索引
```

## 3、测试索引

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

## 4、索引原则

- 索引不是越多越好
- 前期完全没必要加索引，完全可以后面在添加索引
- 索引一般加在用来查询的字段，以提高查询速度

`Btree`：`INNODB` 的默认数据结构

有关索引的一篇文章[MySQL 索引背后的数据结构及算法原理](http://blog.codinglabs.org/articles/theory-of-mysql-index.html)