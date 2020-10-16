document.getElementById("rows").value = 128

var total = 0
var odd = 0
var rowtotal = 0
var rowodd = 0

function checkOdd(bool) { //Odd numbers are represented by boolean value TRUE, even numbers are FALSE
    total += 1
    rowtotal += 1
    if (bool) {
        odd += 1
        rowodd += 1
    }
}

function generateTriangle(numberOfRows) {
    var triangle = [] //Variable to store pascals triangle
    triangle.push([true]) //Starting the first row as a single odd number
    triangle[0].forEach(checkOdd) //Count the odd numbers in the first row
    
    for (i=1; i<numberOfRows; i++){ //Loop to generate pascals triangle
        var lastRow = triangle[triangle.length-1]
        var nextRow = []
    
        rowtotal = 0
        rowodd = 0
    
        nextRow.push(lastRow[0]) //Add the first value of the last row as the first number of this row
        checkOdd(lastRow[0])
    
        if (lastRow.length > 1) {
            for (j=0; j<lastRow.length-1; j++){ //This loop calculates wheather summed numbers are true or false, and adds them to the row
                //var sum = BigInt(lastRow[j] + lastRow[j+1])
                var sum = ( (lastRow[j] || lastRow[j+1]) && !(lastRow[j] && lastRow[j+1]) ) //Curse the lack of an XOR operator ;-P
                nextRow.push(sum)
                checkOdd(sum)
            }
        }
    
        nextRow.push(lastRow[lastRow.length-1]) //Add the last value of the last row as the last number of this row
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