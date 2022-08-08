<!--
 * @Author: Huang Meng
 * @Date: 2021-07-27 12:27:06
 * @LastEditTime: 2021-07-27 12:34:39
 * @LastEditors: your name
 * @Description: 
 * @FilePath: \01code\blog\mysql 除法与取余数0727
 * 可以输入预定的版权声明、个性签名、空行等
-->

#### mysql除法与取余数



![image](https://tvax1.sinaimg.cn/mw690/9ebd4c2bgy1gsve9ub1bej20jy0kc41y.jpg)

![image](https://tvax1.sinaimg.cn/mw690/9ebd4c2bgy1gsveb6iv15j20jh0aggof.jpg)


#### 解题思路

- 利用窗口函数，求出每行的排序，每个type下的行数，每个type下的汇总求和数
- 判断如果是type的最后一行，则将余数加到该行

```sql
SELECT
     a.id,
     a.type,
CASE
    WHEN rk = num THEN
    mod_num + divide_num ELSE divide_num 
    END 平均 
FROM
     (
     SELECT
      a.*,
      row_number() over ( PARTITION BY type ORDER BY id ASC ) rk,  --- 每个type内的排序
      count(1) over ( PARTITION BY type ) num,  --- 每个type的行数
      MOD (
           sum( quantity ) over ( PARTITION BY type ),
      count(1)) over ( PARTITION BY type )) mod_num,  --- 取余数
      floor(
      sum( quantity ) over ( PARTITION BY type ) / count(1) over ( PARTITION BY type )) divide_num --- 地板除法
     FROM
          t0727a a
     LEFT JOIN t0727b b ON a.id = b.id 
     ) a
```