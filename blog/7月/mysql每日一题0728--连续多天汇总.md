<!--
 * @Author: Huang Meng
 * @Date: 2021-07-28 11:48:50
 * @LastEditTime: 2021-07-28 12:02:17
 * @LastEditors: your name
 * @Description: 
 * @FilePath: \01code\blog\mysql每日一题0728--连续多天汇总.md
 * 可以输入预定的版权声明、个性签名、空行等
-->


![image](https://tva4.sinaimg.cn/mw690/9ebd4c2bgy1gswirzuylxj20kg0k4446.jpg)

- 测试数据

```sql

CREATE TABLE T0728 
(
    val VARCHAR(50)
);
insert into T0728 (val) values('A10000003');
insert into T0728 (val) values('A10000001');
insert into T0728 (val) values('A10000002');
insert into T0728 (val) values('A10000011');
insert into T0728 (val) values('A10000004');
insert into T0728 (val) values('A10000006');
insert into T0728 (val) values('A10000009');
insert into T0728 (val) values('A10000010');
insert into T0728 (val) values('A10000012');
```


- solution


```sql
WITH TEMP AS ( SELECT ROW_NUMBER() OVER ( ORDER BY VAL ) ID, SUBSTR( VAL, 2, 9 ) AS VAL FROM T0728 )  --  临时表，添加自增列
SELECT GROUP_CONCAT( A ) RESULT  -- 分组连接全部行显示
FROM
(
SELECT
CONCAT( CONCAT( 'A', MIN ), '', CASE WHEN MAX = MIN THEN '' ELSE CONCAT( '-A', MAX ) END ) A  -- 连接不同连续的数据中的最大值与最小值，补全A
FROM
( SELECT A.VAL - A.ID, MIN( VAL ) MIN, MAX( VAL ) MAX FROM TEMP A GROUP BY 1 ) A 

-- 根据自增列与val值之间的差值是否一致判断是否归为连续
) B   

```

