# MPMP-pascals-triangle

This project was made as an attempt to answer Matt Parkers Maths puzzle about Pascals triangle

It works reasonably well for the first around 1000 rows of the triangle, but the further you go, the slower it becomes, and it will eventually crash due to lack of memory availible to store the triangle.
I have tried to mitigate the memory problem by dropping every line as I no longer need it (as each line is generated from the last line, I only need to keep a line in memory untill I am finished calculating the next line)

Since making this, I have realized that a more elegant solution, pushing back the memory problem even further, would have been to generalise the problem, by only storing a bool (eg true if the number is odd), 
since I would still be able to accurately determine if two added numbers will yeild an odd or even number, without knowing the actual number - this would probably save me a lot of memory, and computation time.

UPDATE: This generalised solution can now be found in the "Generalised-to-Bool" branch of this repository :-)

Also, I intuitively feel like there should be some mathmatically elegant solution, that doesn't rely on actually calculating tens of thousands of rows to arrive at an answer, but coding was just what first came to my mind.
