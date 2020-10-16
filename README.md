# MPMP-pascals-triangle

This project was made as an attempt to answer Matt Parkers Maths puzzle about Pascals triangle

It works reasonably well for the first around 1000 rows of the triangle, but the further you go, the slower it becomes, and it will eventually crash due to lack of memory availible to store the triangle.
I have tried to mitigate the memory problem by dropping every line as I no longer need it (as each line is generated from the last line, I only need to keep a line in memory untill I am finished calculating the next line)

In this branch, I also don't keep the numbers, but only save a bool, that answers the question "is this number odd?" - to calculate if the sum of two numbers is odd, a simple XOR (which does not exist in javascript) will suffice - two odds or two evens will always sum to an even number, only one of each will sum to an odd number, no matter what the numbers actually are

Also, I intuitively feel like there should be some mathmatically elegant solution, that doesn't rely on actually calculating tens of thousands of rows to arrive at an answer, but coding was just what first came to my mind.
