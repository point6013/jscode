




![image](https://tvax2.sinaimg.cn/mw690/002Uexwngy1gurl2mus7ej60ow0gvteb02.jpg)


####  测试数据
```sql
CREATE TABLE T0918 (
No INT,
NAME NVARCHAR(20),
age INT);

INSERT INTO T0918 VALUES (1,'张三','18');
INSERT INTO T0918 VALUES (1,'李四','17');
INSERT INTO T0918 VALUES (1,'王五','23');
INSERT INTO T0918 VALUES (1,'赵六','40');
INSERT INTO T0918 VALUES (2,'Tom','17');
INSERT INTO T0918 VALUES (3,'Bob','19');
INSERT INTO T0918 VALUES (3,'Tony','36');
INSERT INTO T0918 VALUES (3,'Petter','25');
```


#### 解决方法


```sql


SET @sql1 = '';
set  @sql2 ='';
drop table if exists temp;
create table temp as  

(SELECT *, concat("NAME",ROW_NUMBER() over(partition by NO ))  rk1,

concat("AGE",ROW_NUMBER() over(partition by NO ))  rk2

 FROM `t0918`);

SELECT
  GROUP_CONCAT(DISTINCT
    CONCAT(
      'MAX(IF(c.rk1 = ''',
      c.rk1,
      ''', c.name, NULL)) AS ''',
      c.rk1, ''''
    )
  ) INTO @sql1
FROM (select distinct rk1,name  from temp) c;


SELECT
  GROUP_CONCAT(DISTINCT
    CONCAT(
      'MAX(IF(c.rk2 = ''',
      c.rk2,
      ''', c.age, NULL)) AS ''',
      c.rk2, ''''
    )
  ) INTO @sql2
FROM (select distinct rk2,age  from temp) c;

 
 
 set @sql = CONCAT('select NO,' , @sql1,',', @sql2,'from temp c group by NO');

 
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt
```
