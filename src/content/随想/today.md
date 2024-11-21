---
title: '找工作小记'
description: '2024-10-9离职之后，第一天开始找工作'
pubDate: 2024-11-20
---

本来将这个网站放在我的简历上后，我是不太愿意继续发票一些随想的，但是想了想还是决定发出来，我就是我。

今天参与了两场面试，上午第一场去了一家做军工产品的公司，问的东西倒没什么，主要是5道机试题，从十点多到十二点，做出来三道，其中有一道我觉得只能通过测试用例，
并不能通过所有的情况。

它描述的是有三个字符串，其中两个字符串每个字符串按序从左到右，拆成n字符串；然后这两个字符串的子字符串进行拼接，最后判断能否得到第三个字符串s。
s1 = "aabcc", s2 = "dbbca", s3 = "aadbbcbcac"，s3可以由s1和s2拼接得到。

我给了一种简单的求法：
首先判断s3开头符合s1还是s2, 然后分别进行求解；如果两个都符合，那就对两个都进行求解，最后取或。
我抽离出了一个方法`isEqual`
```java
// 这个方法是默认s1开头，
public boolean isEqual(String s1, String s2, String s3) {
    for (int i = 0; i < s3.length(); i++) {
        // 取s3的char
        char c3 = s3.charAt(i);
        // j, k用于表示s1, s2目前需要进行匹配的索引
        int j = 0, k = 0;
        // flag为false表示此时由s1进行拼接，true为s2
        boolea flag = false;
        // 定义错误条件，(连续错误两次)如果s1不匹配，s2也不匹配，那么认为不可以拼接成s3;
        int wrongTimes = 0;
        if (flag) {
            // 边界处理
            if (j >= s1.length()) {
                flag = true;
                continue;
            }
            char c1 = s1.CharAt(j);
            if (c1 != c3) {
                // 错误一次
                wrongTimes++;
                // 交由s2匹配   
                flag = false;
                // 记得让i回退
                i--;
            }else {
                // 正确则连错清0
                wrongTimes = 0;
                // 指向s1需要匹配的下一个元素
                j++;
            }
        }else {
            // 边界处理
            if (k >= s2.length) {
                // 
                flag = false;
                continue;
            }
            char c2 = s2.charAt(k);
            if (c2 != c3) {
                wrongTime++;
                flag = true;
                i--;
            }else {
                wrongTime = 0;
                k++;
            }
        }
        if (wrongTimes >=2) {
            return false;
        }
    }
    return true;

}
```
