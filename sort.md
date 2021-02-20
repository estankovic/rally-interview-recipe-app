 I would go with native .sort() function.
 Reasoning: If I would implement it, I would only copy code from stackoverflow, so the "effort"
 would be none. 

 I will rather try to explain problems that might occur.

 **Applies for all cases A and B:**
 If we would want to estimate exactly (in ms) the time it takes
 for each algorithm to sort those arrays, the arrays would need to be "precalculated"
 before the test case runs, so that we do not influence out measurement by the time it takes to generate random number.

 If we would be talking only about "average" execution time, then it depends on chosen algorithms and the machine does not
 really matters because time would be relative to number of operations(complexity)

 For the absolute time, with running the algorithm, that would be tricky and would depend also on input data

 **For the case A:**
 The array size is rather small, but number of executions is huge.
 Because of small size, I would go with QuickSort.

 **For the case B:**
 Here I was tasked to write function that would sort an array of length 10 000 where each number could be random number following the rule:
 `(a^b) where a and b are random numbers between 100 and 10000`

 This creates first problem, number meeting the requirement is huge. That means, we cannot use regular integers.
 Luckily JS now implements BigInt() that suits our needs.
 Here I would choose the algorithm that is both memory efficient and Number of operations efficient,
 because we are working with quite big array and huge numbers.
 


