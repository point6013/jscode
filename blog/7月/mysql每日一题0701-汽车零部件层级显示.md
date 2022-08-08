<!--
 * @Author: Huang Meng
 * @Date: 2021-07-27 19:20:53
 * @LastEditTime: 2021-07-27 19:20:53
 * @LastEditors: your name
 * @Description: 
 * @FilePath: \01code\blog\mysql每日一题0701-汽车零部件层级显示.md
 * 可以输入预定的版权声明、个性签名、空行等
-->


![image](https://tvax2.sinaimg.cn/mw690/9ebd4c2bgy1gsvq6j44azj20pf0o0wm0.jpg)

```sql

CREATE TABLE T0701(
    ID INT,
    PRODUCTNAME VARCHAR(64),
    PARENTID INT,
);
 
INSERT INTO T0701 VALUES ( 1,'汽车',NULL);
INSERT INTO T0701 VALUES ( 2,'车身',1);
INSERT INTO T0701 VALUES ( 3,'发动机',1);
INSERT INTO T0701 VALUES ( 4,'车门',2);
INSERT INTO T0701 VALUES ( 5,'驾驶舱',2);
INSERT INTO T0701 VALUES ( 6,'行李舱',2);
INSERT INTO T0701 VALUES ( 7,'气缸',3);
INSERT INTO T0701 VALUES ( 8,'活塞',3);


```



- solution


mysql 递归的解决方案


```sql
 with recursive r as 
(select id,parentid ,cast(PRODUCTNAME as char(2000)) name, cast(id as char(2000)) as orderid    from 
`data_for_test`.`t0701` t where PARENTID is null 
union all 

select t.id,t.parentid,concat('' ,t.PRODUCTNAME) name,concat(r.orderid,"->",t.id) orderid from t0701  t  inner join  r on r.id = t.parentid
 
)  
select 
* from r
order by orderid
```