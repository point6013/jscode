
### 对于extra信息，常见的几种情况的分析


- using index、using where、using index condition

- using index ：使用覆盖索引的时候就会出现，测试发现主键索引也会生效

- using where：在查找使用索引的情况下，需要回表去查询所需的数据

- using index condition：查找使用了索引，不需要回表查询，因为要过滤的字段在索引中

- using index & using where：查找使用了索引，但是需要的数据都在索引列中能找到，所以不需要回表查询数据（联合索引很容易出现这样的结果）
ㅤ
ㅤ
---
#### 测试样例

- 字段
![image](https://tva2.sinaimg.cn/mw690/9ebd4c2bgy1h59kpuktjjj20ik0800up.jpg)
ㅤ
- 索引

![image](https://tva4.sinaimg.cn/mw690/9ebd4c2bgy1h59kq1yezcj20ip03dabb.jpg)

---


#### 普通索引

##### 索引覆盖  using index


![image](https://tva4.sinaimg.cn/mw690/9ebd4c2bgy1h59kqb6llsj20z203cjvi.jpg)

其中role_name为索引字段，这里查询的结果在索引中存在，所有extra中包含了一个using index
ㅤ
##### 回表 using where

![image](https://tvax4.sinaimg.cn/mw690/9ebd4c2bgy1h59kqb6llsj20z203cjvi.jpg)
这里的查询结果是其实是需要回表查询的
ㅤ
##### 使用了索引，同时需要回表

![image](https://tva3.sinaimg.cn/mw690/9ebd4c2bgy1h59kra16vij20z2037wiv.jpg)


其中role_name为索引字段，可以看到这里也使用了这个索引。这里using where 就是在第一个条件进行过滤后同时进行了回表查询再次过滤。
ㅤ
##### 主键查找，需要二次过滤，但是不需要回表

![image](https://tvax3.sinaimg.cn/mw690/9ebd4c2bgy1h59krgt5a5j20xt03a42m.jpg)

因为id为主键，主键是聚簇索引，本身就包含了所有数据，虽然需要进行二次过滤，但过滤的数据不需要回表就能查找到，所有没有出现using where
ㅤ
##### 索引下推  using index condition 

![image](https://tva3.sinaimg.cn/mw690/9ebd4c2bgy1h59kroobhwj212u03hn1t.jpg)

这里出现了using index condition,是因为过滤的字段在索引中，不需要回表查询过滤。索引的数据区是包含主键的。

---

#### 联合索引
ㅤ

下面是建立了一个ROLE_NAME, ROLE_DESC, ROLE_MESSAGE联合索引
![image](https://tvax4.sinaimg.cn/mw690/9ebd4c2bgy1h59ks3qechj210r03ewjg.jpg)

##### 最左匹配原则
和上面类似，查询字段在索引中会使用using index
ㅤ
ㅤ
![image](https://tva2.sinaimg.cn/mw690/9ebd4c2bgy1h59ksbd89lj20xh03atcj.jpg)

![image](https://tva1.sinaimg.cn/mw690/9ebd4c2bgy1h59ksi006oj20z903ajvl.jpg)


可以看到如果是联合索引，只要符合最左原则就会走索引

##### 回表 using where

![image](https://tvax2.sinaimg.cn/mw690/9ebd4c2bgy1h59ksmzexyj20zg0380wu.jpg)
ㅤ
因为role_extra不在索引中，最终会回表查询再次过滤


##### 联合索引跳过某个字段，使用了部分的索引，using index，仍需要回表

![image](https://tvax3.sinaimg.cn/mw690/9ebd4c2bgy1h59ksw3zcej212x03d0y0.jpg)
ㅤ

过滤条件的字段都在索引中，但注意，这里的role_message会失效，因为跳过了一个字段。其中using index很好理解，那就是查询的字段在索引中，而using where表示要回表查询再次过滤。

##### 索引下推 

![image](https://tvax2.sinaimg.cn/mw690/9ebd4c2bgy1h59kt1g3wrj212103cwj3.jpg)

这里的using index condition应该是这样理解，虽然role_message失效，但这个字段还是在索引中的，**所以不需要进行回表查询过滤，只需要在当前索引进行过滤**。从字面意思也能看出，“使用索引条件”。

##### 带有order by的using index condition
再看个比较复杂的，
![image](https://tvax4.sinaimg.cn/mw690/9ebd4c2bgy1h59ktcrrklj211t03in1z.jpg)


这里出现了using index condition,**是因为过滤的字段在索引中，不需要回表查询过滤。索引的数据区是包含主键的。**

##### using filesort
![image](https://tvax2.sinaimg.cn/mw690/9ebd4c2bgy1h59ktq62vnj216o037n1t.jpg)


这里出现了using filesort是因为需要对结果进行排序。因为role_desc不在索引中。而上面因为是对主键排序，每个索引的数据部分是包含主键的。注意这里role_desc无论是否加索引结果都一样，这里的排序不依赖索引。


[原文链接](https://blog.csdn.net/liujiqing123/article/details/120688295)