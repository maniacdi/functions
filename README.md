# TODO

1. Install dependencies.
2. Complete both excercises with best practices and taking performance into consideration.
3. All tests must pass.
4. Create a repository in your github with the solution.

# 1- Array map challenge

Complete in the most efficient way the functions customMap and customFilter in arrayMap.test.js.
You CAN NOT use filter and/or map within those functions.

# 2- Count positive bits

Given an integer, n, we want to know the following:

1. How many 1-bits are in its binary representation?
2. Let's say n's binary representation has k significant bits indexed from 1 to k. What are the respective positions (i.e., in ascending order) of each 1-bit?
3. The performance is really important in this challenge.

### Example

Complete countBids function in bitCounter.test.js (Obviously you can use helper functions if needed). It has one parameter: an integer, n. It must return an integer array with the following 1 + k values:

- The first index (0) must contain the total number of 1 bits in n's binary representation.
- The subsequent indices must contain the respective positions of the one-indexed 1-bits in n's binary representation.

### Output format

Return an array of integers where the first element is the total number of 1-bits in n's binary representation and the subsequent elements are the respective one-indexed locations of each 1-bit from most to least significant.

### Tips

The integer n = 137 converts to binary.

| 1   | 0   | 0   | 0   | 1   | 0   | 0   | 1   |
| --- | --- | --- | --- | --- | --- | --- | --- |

Reverse the binary representation.

| 1   | 0   | 0   | 1   | 0   | 0   | 0   | 1   |
| --- | --- | --- | --- | --- | --- | --- | --- |

Count number of positive bits: 3
Search the position: 0, 3, 7
Return [ 3, 0, 3, 7 ]
