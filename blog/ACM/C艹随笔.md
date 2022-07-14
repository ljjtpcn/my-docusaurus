---
slug: acm-cpp
title: 记录刷题过程c++ 常用知识
date: 2022-07-12
authors: ljj
tags: [cpp, ACM, 函数]
---
<!-- truncate -->

## 内建函数(__builtin_xxx(x))

### 位运算相关内建函数总结

1. `__builtin_ffs(x)`
返回`x`的最后一位`1`是从后向前第几位

2. `__builtin_clz(x)`
返回`x`的二进制下前导的`0`的个数

3. `__builtin_ctz(x)`
返回`x`的二进制下末尾的`0`的个数

4. `__builtin_popcount(x)`
返回`x`的二进制下`1`的个数

5. `__builtin_parity(x)`
返回`x`的二进制下1的个数的奇偶性(奇`1`偶`0`)

:::tip
参数 `x`默认为`unsigned int`类型.如需其它类型**一般**按以下格式书写:

格式: `__builtin_xxx + (l || ll)(x)` 

例如: `__builtin_popcountl(x)` || `__builtin_popcountll(x)`  
:::

### 内建开平方函数

> 属于内置函数，使用硬件加速运算。实测开方`1~1e8`比普通`sqrt`快`1/3`

1. `__builtin_sqrt(x)` //返回`8`字节`double`类型
2. `__builtin_sqrtl(x)` //返回`16`字节`long double`类型
3. `__builtin_sqrtf(x)` //返回`4`字节`float`类型

## 字符串相关函数

### 大小写转换
1. `char toupper(char c)` 
2. `char tolower(char c)`
3. `transform(str.begin(), str.end(), str.begin(), ::toupper)`

## 最值相关函数

### 数组中最大/小值

```cpp
#include<bits/stdc++.h>
using namespace std;

int main()
{
    //an array
    int arr[] = { 100, 200, -100, 300, 400 };

    //a vector
    vector<int> v1{ 10, 20, 30, 40, 50 };

    //finding largest element from the array
    int result = *max_element(arr + 0, arr + 5);
    cout << "largest element of the array:" << result << endl;

    //finding largest element from the vector
    result = *max_element(v1.begin(), v1.end());
    cout << "largest element of the vector:" << result << endl;
    
    cout << max({1, 2, 3, 4, 43, 444}); // 444
    return 0;
}
```

## vector

### std前缀和

1. `partial_sum(arr.begin(), arr.end(), s.begin() + 1)`

    ```cpp

        //球arr前缀和,保存至s中,从下标1开始
        vector<int> arr(n, 0), s(n + 1, 0);
        for (int i = 0; i < n; i++) cin >> arr[i];
        partial_sum(arr.begin(), arr.end(), s.begin() + 1);
    ```
