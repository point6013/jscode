<!--
 * @Author: Huang Meng
 * @Date: 2022-08-15 11:11:54
 * @LastEditTime: 2022-08-15 14:02:58
 * @LastEditors: your name
 * @Description: 
 * @FilePath: \blog\小林coding网站---mysql基础-索引数据结构.md
 * 可以输入预定的版权声明、个性签名、空行等
-->
## MySQL索引的数据结构和算法


### 索引问题相关
![image](https://tva1.sinaimg.cn/large/9ebd4c2bgy1h57a1bznrfj21o216ync5.jpg)

![image](https://tvax2.sinaimg.cn/large/9ebd4c2bgy1h57a6jr1cbj20mj0bptbj.jpg)

![image](https://tva1.sinaimg.cn/large/9ebd4c2bgy1h57a75bhuij20y70dv0wg.jpg)

![image](https://tvax3.sinaimg.cn/large/9ebd4c2bgy1h57au0tf9sj21zp0ji7d3.jpg)
引出的问题是索引覆盖与回表,在执行器的部分已经讲过。


### MySQL 默认的存储引擎 InnoDB 采用的是 B+ 作为索引的数据结构，原因有：


#### B+Tree vs B-Tree
- B+ 树的非叶子节点不存放实际的记录数据，仅存放索引，因此数据量相同的情况下，相比存储即存索引又存记录的 B 树，B+树的非叶子节点可以存放更多的索引，因此 B+ 树可以比 B 树更「矮胖」，查询底层节点的磁盘 I/O次数会更少。

- B+ 树有大量的冗余节点（所有非叶子节点都是冗余索引），这些冗余索引让 B+ 树在插入、删除的效率都更高，比如删除根节点的时候，不会像 B 树那样会发生复杂的树的变化；

- B+ 树叶子节点之间用链表连接了起来，有利于范围查询，而 B 树要实现范围查询，因此只能通过树的遍历来完成范围查询，这会涉及多个节点的磁盘 I/O 操作，范围查询效率不如 B+ 树。


#### B+ tree vs 二叉树

对于有N个叶子节点的B+Tree，其搜索复杂度为O(logdN),其中d表示节点语序的最大的子节点的个数为d个。在实际应用中，d值大于100，这样就保证了，即使数据达到1000W级别的时候，B+Tree的高度依然能够3-4层，也就是说一次数据查询只需要做3-4次的磁盘的IO操作就能查询到目标数据。
对比二叉树，每个父级节点的儿子节点的个数为2，其搜索的复杂度为O(logN), 比B+Tree的层高高出不少，因此二叉树的检索的目标数据所经历的磁盘IO次数要多得多。

#### B+Tree vs Hash 
Hash 在做等值查询的时候，速度非常快，其搜索复杂度为O(1)。但是Hash表不适合做范围查询，他更加适合做等值查询，B+Tree索引比Hash表索引有着更为广泛的用途。



[原文链接](https://xiaolincoding.com/mysql/base/how_select.html#mysql-%E6%89%A7%E8%A1%8C%E6%B5%81%E7%A8%8B%E6%98%AF%E6%80%8E%E6%A0%B7%E7%9A%84) ([小林的网站](https://xiaolincoding.com/))

