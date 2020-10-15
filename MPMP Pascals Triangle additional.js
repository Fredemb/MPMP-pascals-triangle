document.getElementById("rows").value = 128

var total = 0
var odd = 0
var rowtotal = 0
var rowodd = 0

function checkOdd(n) {
    total += 1
    rowtotal += 1
    if (!(n % 2n == 0n)) {
        odd += 1
        rowodd += 1
    }
}

function generateTriangle(numberOfRows) {
    var triangle = [] //Variable to store pascals triangle
    triangle.push([BigInt(1)]) //Starting the first row as a single 1
    triangle[0].forEach(checkOdd) //Count the odd numbers in the first row
    
    for (i=1; i<numberOfRows; i++){ //Loop to generate pascals triangle
        var lastRow = triangle[triangle.length-1]
        var nextRow = []
    
        rowtotal = 0
        rowodd = 0
    
        nextRow.push(lastRow[0]) //Add the first number of the last row as the first number of this row
        checkOdd(lastRow[0])
    
        if (lastRow.length > 1) {
            for (j=0; j<lastRow.length-1; j++){ //This loop does the summing for all numbers except the first and last of any row
                var sum = BigInt(lastRow[j] + lastRow[j+1])
                nextRow.push(BigInt(sum))
                checkOdd(BigInt(sum))
            }
        }
    
        nextRow.push(lastRow[lastRow.length-1]) //Add the last number of the last row as the last number of this row
        checkOdd(lastRow[lastRow.length-1])
    
        triangle.push(nextRow)
        triangle.shift()
    
        var rowratio = (rowodd/rowtotal)*100
        var ratio = (odd/total)*100
    
        console.log(i + ": " + rowratio.toFixed(4) + "%  ->  " + ratio.toFixed(4) + "%")
    }
    
    return triangle
}

let calculateButton = document.getElementById("calculateButton")
var inputnumber = document.getElementById("rows").value

function calculate() {
    total = 0
    odd = 0
    rowtotal = 0
    rowodd = 0
    inputnumber = Number(document.getElementById("rows").value)
    document.getElementById("output").innerHTML = null
    generateTriangle(inputnumber).forEach(appendline)

    function appendline(line){
        document.getElementById("output").innerHTML += line + "<br>"
    }
}

calculateButton.addEventListener("click",calculate)