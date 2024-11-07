---
title: '数据结构：利用栈实现算式运算'
description: '深入理解栈的实现原理，并用其解决中缀表达式转后缀表达式的问题'
pubDate: 2021-05-01 22:11:33
tags: ['栈', '表达式计算']
difficulty: '困难'
setup: |
  import CodeBlock from '../../components/CodeBlock.astro'
---

<style>
  /* 调整整体文章的字体大小 */
  article {
    font-size: 0.95rem;
    line-height: 1.6;
  }
  
  /* 调整标题大小 */
  h1 { font-size: 1.8rem; }
  h2 { font-size: 1.4rem; }
  h3 { font-size: 1.2rem; }
  h4 { font-size: 1.1rem; }
  
  /* 调整代码块字体大小 */
  pre code {
    font-size: 0.9rem;
  }
  
  /* 调整引用块样式 */
  blockquote {
    font-size: 0.95rem;
    color: #666;
    border-left: 4px solid #ddd;
    padding-left: 1rem;
    margin: 1rem 0;
  }
  
  /* 调整图片容器 */
  img {
    max-width: 100%;
    height: auto;
    margin: 1rem 0;
  }
</style>

## 问题描述

实现一个简单的计算器，输入一个包含圆括号、加、减、乘、除、求余等符号组成的算术表达式字符串，输出该算术表达式的值。

## 待解决问题

1. 中缀表达式转化为后缀表达式
2. 对象区分：对于一个字符串形式的数学算式，如何区分数字（1位数字、多位数字）
3. 栈的创建与实现

### 堆栈的特点

- Last in first out（后进先出）
- 两种实现方式（都为顺序存储结构）：
  1. 数组存储
  2. 链式存储

## 实现过程

### 1. 中缀转后缀步骤

下图展示了中缀表达式转后缀表达式的具体步骤：

![中缀转后缀表达式步骤](/images/data-structure/description.png)

### 2. 栈的实现（C语言）

首先实现栈的基本结构：
- 宏定义：栈的最大长度，数组类型
- 重命名：struct SNode* Stack
- 4个操作：creatStack()，isEmpty()，push()，pop()

> 注意：下面代码是有错误的，不知道屏幕前的你能否看出来呢？

```c
#include<stdio.h>
#include<stdlib.h>
#define MaxSize 100
#define ElementType char
typedef struct SNode* Stack; 
int isEmpty(Stack s);
void push(Stack s,ElementType item);
ElementType pop(Stack s);
struct SNode
{
    ElementType Data[MaxSize]; //ElementType 可以是任意数据类型，使用的时候用宏定义即可
    int top;    //定义一个头指针，实际上记录的是数组的下标  -1:空栈
};
//入栈操作
void push(Stack s,ElementType item)
{
    if(isEmpty(s)){
        printf("栈是空的");
        return;
    }
    else{
        s->Data[++(s->top)]=item;

    }
}
// 出栈操作
ElementType pop(Stack s)
{
    if(isEmpty(s)){
        return 'e';
    }
    else{
        return s->Data[s->top--];//先返回再将数组下标减一
    }
}
//判断栈是否为空
int isEmpty(Stack s)
{
    if(s->top==0)
        return 1;
    else 
        return 0;
}
//初始化
Stack creatStack()
{
    Stack s=(struct SNode*)malloc(sizeof(struct SNode*));
    s->top=-1;//空栈
    return s;
}

```
到这里就完成了第一步：栈的创建
然后进行第二部，将中缀表达式转化成后缀表达式

### 中缀表达式转后缀表达式

#### 基本概念
- **中缀表达式**：运算符号位于两个运算数之间
- **后缀表达式**：运算符号位于两个运算数之后

#### 需要解决的问题
1. **运算数区分问题**：
   - 单个数字容易区分
   - 多位数字和小数点的处理较复杂

2. **运算符优先级处理**：
   - 本例中采用简化处理：假设所有数字均用单个字符表示
   - 运算符集合：`+` `-` `*` `/` `(` `)`

#### 运算符优先级规则
- `(`：栈外最高优先级，栈内最低优先级
- `)`：最低优先级
- `*` `/`：次高优先级
- `+` `-`：普通优先级

#### 优先级实现代码
```c
int getPri(char c) {
    switch(c) {    
        case '*':
        case '/': return 3;
        case '+':
        case '-': return 2;
        case '(': return 1;
        case '#': return 0;
    }
}
```

### 3. 测试结果
测试代码
```c
int main()
{
    Stack s=creatStack();
    char* notation="2+9/3-5";
    
    char* n=ReversePolishNotation(notation,s);
    printf("%s",n);
}

```

第一次运行结果：

![结果截图](/images/data-structure/wrongAnswer.png)

出错了！让我们来找找错误。
不知道屏幕前的你是否找到了错误呢？

### 4. 错误分析与修正

主要错误：
1. creatStack 中开辟的是地址（struct snode*）
2. pop 方法使用问题（我们希望可以去除栈底的元素，而不是返回 NULL）
3. 新增方法 getEle 获取栈顶元素问题
4. 截止符号问题（#）

### 5. 最终正确实现

```c
#include<stdio.h>
#include<stdlib.h>
#include<string.h>
#define MaxSize 20
#define ElementType char
typedef struct SNode* Stack; 
int isEmpty(Stack s);
void push(Stack s,ElementType item);
ElementType pop(Stack s);
int getPri(char c);
ElementType getEle(Stack s);
struct SNode
{
    ElementType Data[MaxSize]; //ElementType 可以是任意数据类型，使用的时候用宏定义即可
    int top;    //定义一个头指针，实际上记录的是数组的下标  -1:空栈
};
//入栈操作
void push(Stack s,ElementType item)
{
    if(s->top<MaxSize-1){
       s->Data[++(s->top)]=item;
    }
    else{
        printf("栈满");
    }
}
// 出栈操作
ElementType pop(Stack s)
{
    if(isEmpty(s)){
        printf("s空");
        return s->Data[0];
    }
    else{
        return s->Data[(s->top)--];//先返回再将数组下标减一
    }
}
//判断栈是否为空
int isEmpty(Stack s)
{
    if(s->top==0)
        return 1;
    else if(s->top>0)
        return 0;
}
//初始化
Stack creatStack()
{
    Stack s=(struct SNode*)malloc(sizeof(struct SNode));
    s->top=0;//空栈
    s->Data[0]='#';
    return s;
}
void  ReversePolishNotation(char* Notation,Stack s)
{   char newNotation[20];
    int len=strlen(Notation);
    int j=0;//记录newNotation当前的位置
    for(int i=0;i<len;i++){
        //是数字直接输出
        if(Notation[i]>='0'&&Notation[i]<='9'){
            newNotation[j++]=Notation[i];
        }
        //左括号压入堆栈
        else if(Notation[i]=='('){
            push(s,Notation[i]);
        }
        //遇到右括号，将栈顶的符号弹出并输出,直至遇到左括号
        else if(Notation[i]==')'){
            char c=getEle(s);
            while(c!='('){
                c=pop(s);
                newNotation[j++]=c;
                c=getEle(s);
            }
            pop(s);
        }
        /*
        *运算符
        */
        else{
            char cc=getEle(s);//cc当前栈顶运算符
            //算式当前项的运算符优先级>s栈顶运算符的优先级，将它压栈
            if(getPri(Notation[i])>getPri(cc)){
                push(s,Notation[i]);
            }
            //否则就将s栈顶的运算符弹出并输出，在比较新的栈顶运算符，直到当前运算符优先级>栈顶运符
            else {
                cc=pop(s);
                newNotation[j++]=cc;
                cc=getEle(s);
                while(getPri(Notation[i])<=getPri(cc)){
                    cc=pop(s);
                    newNotation[j++]=cc;
                    cc=getEle(s);
                }
                push(s,Notation[i]);
                
            }
        }
        
        
    }
    // //最后将栈中的运算符都输出
    char c=getEle(s);
    while(s->top>0&&c!='#'){
       newNotation[j++]=c;
       pop(s);
       c=getEle(s);
    }        
    printf("%s",newNotation);
    
}
int getPri(char c)
{
    switch(c){    
        case '*':;
        case '/':return 3;
        case '+':;
        case '-':return 2;
        case '(':return 1;
        case '#':return 0;
    }
}
//获取栈顶元素
ElementType getEle(Stack s)
{

    char c=pop(s);
    if(c!='#')
        push(s,c);
    return c;
}
int main()
{
    Stack s=creatStack();
    char notation[20]="(2*(9+6/3-5)+4)";
    ReversePolishNotation(notation,s);
    
}


```

最终运行结果：

![运行截图](/images/data-structure/right.png)

## 总结

通过这个实例，我们学习了：
1. 栈的基本实现
2. 中缀表达式转后缀表达式的算法
3. 代码调试与优化的过程

