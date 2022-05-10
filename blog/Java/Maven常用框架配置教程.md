---
title: Maven常用框架配置教程
date: 2022-05-10
authors: ljj
tags: [maven, mybatis, logback, log4j]
---
<!-- truncate -->

:::info
文章将贴出几种`pom.xml`,`mybatis-config.xml` `db.properties`, `log4j.properties`   `logback.xml`配置文件。
:::

## 介绍

既然你点开了这篇文章，说明你至少了解了`Maven`的作用,但苦于不知道如何配置`pom`等文件，所有这里默认你的`Java`工程是由`Maven`构建管理的,如果不是，请点击[maven教程](https://www.liaoxuefeng.com/wiki/1252599548343744/1309301146648610) 了解后再来。

演示项目树结构如下图：

![](https://hexoljj.oss-cn-shenzhen.aliyuncs.com/img/202205101928135.png)

## 配置1

:::tip
如果你想使用`log4j`作为日志文件框架，以下为对应的一套配置文件
:::

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="pom" label="pom.xml">

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>{自定义}</groupId>
    <artifactId>{自定义}</artifactId>
    <version>1.0-SNAPSHOT</version> <!-- 版本号，默认即可 -->

    <dependencies>
        <!--打印日志文件,方便调试-->
        <dependency>
            <groupId>log4j</groupId>
            <artifactId>log4j</artifactId>
            <version>1.2.17</version>
        </dependency>
        
        <!-- https://mvnrepository.com/artifact/org.projectlombok/lombok -->
        <!-- 注解开发 -->
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <version>1.18.24</version>
        </dependency>
        
        <dependency>
            <groupId>org.mybatis</groupId>
            <artifactId>mybatis</artifactId>
            <version>3.5.9</version>
        </dependency>

        <!--mysql连接数据库-->
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
            <version>8.0.28</version>
        </dependency>

        <!--单元测试-->
        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
            <version>4.13.2</version>
            <scope>test</scope>
        </dependency>

    </dependencies>


    <properties>
        <maven.compiler.source>17</maven.compiler.source>
        <maven.compiler.target>17</maven.compiler.target>
    </properties>

</project>
```

</TabItem>
<TabItem value="mybatis" label="mybatis-config.xml">

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
        PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
    <!--引入database.properties文件中的信息-->
    <properties resource="db.properties"/>

    <settings>
        <!--选择log4j日志存储文件-->
        <setting name="logImpl" value="LOG4J"/>
    </settings>

    <typeAliases>
        <!--(name记得改成你自己项目对应路径）-->
        <package name="cn.twopair.pojo"/>
    </typeAliases>

    <!--    配置多个数据库环境信息， 通过default切换环境-->
    <environments default="development">
        <environment id="development">
            <transactionManager type="JDBC"/>
            <dataSource type="POOLED">
                <property name="driver" value="${jdbc.driver}"/>
                <property name="url" value="${jdbc.url}"/>
                <property name="username" value="${jdbc.userName}"/>
                <property name="password" value="${jdbc.passWorld}"/>
            </dataSource>
        </environment>
    </environments>


    <mappers>
        <!--加载sql映射文件-->
        <!--<mapper resource="cn/twopair/mappers/UserMapper.xml"/>-->

        <!--或使用包扫描(推荐)-->
        <!--Mapper代理方式(包扫描， name记得改成你自己项目对应路径）-->
        <package name="cn.twopair.mappers"/>
    </mappers>
</configuration>

```

</TabItem>
<TabItem value="db" label="db.properties">

```markdown
jdbc.driver=com.mysql.cj.jdbc.Driver
jdbc.url=
jdbc.userName=
jdbc.passWorld=
```

</TabItem>

<TabItem value="log4j" label="log4j.properties">

```markdown
log4j.rootLogger=DEBUG,CONSOLE,file
log4j.logger.cn.smbms.dao=debug
log4j.logger.com.ibatis=debug
log4j.logger.com.ibatis.common.jdbc.SimpleDataSource=debug
log4j.logger.com.ibatis.common.jdbc.ScriptRunner=debug
log4j.logger.com.ibatis.sqlmap.engine.impl.SqlMapClientDelegate=debug
log4j.logger.java.sql.Connection=debug
log4j.logger.java.sql.Statement=debug
log4j.logger.java.sql.PreparedStatement=debug
log4j.logger.java.sql.ResultSet=debug
log4j.logger.org.tuckey.web.filters.urlrewrite.UrlRewriteFilter=debug
log4j.appender.CONSOLE=org.apache.log4j.ConsoleAppender
log4j.appender.Threshold=error
log4j.appender.CONSOLE.Target=System.out
log4j.appender.CONSOLE.layout=org.apache.log4j.PatternLayout
log4j.appender.CONSOLE.layout.ConversionPattern= [%p] %d %c - %m%n
log4j.appender.file=org.apache.log4j.DailyRollingFileAppender
log4j.appender.file.DatePattern=yyyy-MM-dd
log4j.appender.file.File=log.log
log4j.appender.file.Append=true
log4j.appender.file.Threshold=error
log4j.appender.file.layout=org.apache.log4j.PatternLayout
log4j.appender.file.layout.ConversionPattern=%d{yyyy-M-d HH:mm:ss}%x[%5p](%F:%L) %m%n
log4j.logger.com.opensymphony.xwork2=error
log4j.logger.org.mybatis.example.BlogMapper=TRACE
```

</TabItem>

</Tabs>


## 配置2

:::tip
如果你想使用`logback`作为日志文件框架，以下为对应的一套配置文件
:::


<Tabs>
<TabItem value="pom" label="pom.xml">

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>{自定义}</groupId>
    <artifactId>{自定义}</artifactId>
    <version>1.0-SNAPSHOT</version> <!-- 版本号，默认即可 -->

    <dependencies>
        <!--打印日志文件,方便调试-->
        <dependency>
            <groupId>org.slf4j</groupId>
            <artifactId>slf4j-api</artifactId>
            <version>1.7.36</version>
            <scope>compile</scope>
        </dependency>
        <dependency>
            <groupId>ch.qos.logback</groupId>
            <artifactId>logback-core</artifactId>
            <version>1.2.11</version>
        </dependency>
        <dependency>
            <groupId>ch.qos.logback</groupId>
            <artifactId>logback-classic</artifactId>
            <version>1.2.11</version>
        </dependency>
        
        <!-- https://mvnrepository.com/artifact/org.projectlombok/lombok -->
        <!-- 注解开发 -->
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <version>1.18.24</version>
        </dependency>
        
        <dependency>
            <groupId>org.mybatis</groupId>
            <artifactId>mybatis</artifactId>
            <version>3.5.9</version>
        </dependency>

        <!--mysql连接数据库-->
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
            <version>8.0.28</version>
        </dependency>

        <!--单元测试-->
        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
            <version>4.13.2</version>
            <scope>test</scope>
        </dependency>

    </dependencies>


    <properties>
        <maven.compiler.source>17</maven.compiler.source>
        <maven.compiler.target>17</maven.compiler.target>
    </properties>

</project>
```

</TabItem>
<TabItem value="mybatis" label="mybatis-config.xml">

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
        PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
    <!--引入database.properties文件中的信息-->
    <properties resource="db.properties"/>

    <settings>
        <!--选择logback日志存储文件（记得修改value值！！！）-->
        <setting name="logPrefix" value="cn.twopair.mappers."/>
    </settings>

    <typeAliases>
        <!--(name记得改成你自己项目对应路径）-->
        <package name="cn.twopair.pojo"/>
    </typeAliases>

    <!--    配置多个数据库环境信息， 通过default切换环境-->
    <environments default="development">
        <environment id="development">
            <transactionManager type="JDBC"/>
            <dataSource type="POOLED">
                <property name="driver" value="${jdbc.driver}"/>
                <property name="url" value="${jdbc.url}"/>
                <property name="username" value="${jdbc.userName}"/>
                <property name="password" value="${jdbc.passWorld}"/>
            </dataSource>
        </environment>
    </environments>


    <mappers>
        <!--加载sql映射文件-->
        <!--<mapper resource="cn/twopair/mappers/UserMapper.xml"/>-->

        <!--或使用包扫描(推荐)-->
        <!--Mapper代理方式(包扫描， name记得改成你自己项目对应路径）-->
        <package name="cn.twopair.mappers"/>
    </mappers>
</configuration>

```

</TabItem>
<TabItem value="db" label="db.properties">

```markdown
jdbc.driver=com.mysql.cj.jdbc.Driver
jdbc.url=
jdbc.userName=
jdbc.passWorld=
```

</TabItem>

<TabItem value="logback" label="logback.xml">

```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
    <!--
        CONSOLE ：表示当前的日志信息是可以输出到控制台的。
    -->
    <appender name="Console" class="ch.qos.logback.core.ConsoleAppender">
        <encoder>
            <pattern>[%level] %blue(%d{HH:mm:ss.SSS}) %cyan([%thread]) %boldGreen(%logger{15}) - %msg %n</pattern>
        </encoder>
    </appender>

    <logger name="cn.twopair.mappers" level="DEBUG" additivity="false">
        <appender-ref ref="Console"/>
    </logger>

    <!--
      level:用来设置打印级别，大小写无关：TRACE, DEBUG, INFO, WARN, ERROR, ALL 和 OFF
     ， 默认debug
      <root>可以包含零个或多个<appender-ref>元素，标识这个输出位置将会被本日志级别控制。
      -->
    <root level="DEBUG">
        <appender-ref ref="Console"/>
    </root>
</configuration>

```

</TabItem>

</Tabs>

## 配置3

:::tip
当然， 如果你两个日志框架都不需要，那么你可以选择这项配置即可
:::

<Tabs>
<TabItem value="pom" label="pom.xml">

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>{自定义}</groupId>
    <artifactId>{自定义}</artifactId>
    <version>1.0-SNAPSHOT</version> <!-- 版本号，默认即可 -->

    <dependencies>
        <!-- https://mvnrepository.com/artifact/org.projectlombok/lombok -->
        <!-- 注解开发 -->
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <version>1.18.24</version>
        </dependency>
        
        <dependency>
            <groupId>org.mybatis</groupId>
            <artifactId>mybatis</artifactId>
            <version>3.5.9</version>
        </dependency>

        <!--mysql连接数据库-->
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
            <version>8.0.28</version>
        </dependency>

        <!--单元测试-->
        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
            <version>4.13.2</version>
            <scope>test</scope>
        </dependency>

    </dependencies>

    <properties>
        <maven.compiler.source>17</maven.compiler.source>
        <maven.compiler.target>17</maven.compiler.target>
    </properties>

</project>
```

</TabItem>
<TabItem value="mybatis" label="mybatis-config.xml">

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
        PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
    <!--引入database.properties文件中的信息-->
    <properties resource="db.properties"/>

    <typeAliases>
        <!--(name记得改成你自己项目对应路径）-->
        <package name="cn.twopair.pojo"/>
    </typeAliases>

    <!--    配置多个数据库环境信息， 通过default切换环境-->
    <environments default="development">
        <environment id="development">
            <transactionManager type="JDBC"/>
            <dataSource type="POOLED">
                <property name="driver" value="${jdbc.driver}"/>
                <property name="url" value="${jdbc.url}"/>
                <property name="username" value="${jdbc.userName}"/>
                <property name="password" value="${jdbc.passWorld}"/>
            </dataSource>
        </environment>
    </environments>


    <mappers>
        <!--加载sql映射文件-->
        <!--<mapper resource="cn/twopair/mappers/UserMapper.xml"/>-->

        <!--或使用包扫描(推荐)-->
        <!--Mapper代理方式(包扫描， name记得改成你自己项目对应路径）-->
        <package name="cn.twopair.mappers"/>
    </mappers>
</configuration>

```

</TabItem>
<TabItem value="db" label="db.properties">

```markdown
jdbc.driver=com.mysql.cj.jdbc.Driver
jdbc.url=
jdbc.userName=
jdbc.passWorld=
```

</TabItem>

</Tabs>