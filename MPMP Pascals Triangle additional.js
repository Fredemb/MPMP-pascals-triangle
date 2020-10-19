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

//Add references to UI elements
let totalRowsUI = document.getElementById("rowsCalculated")
let rowratioUI = document.getElementById("oddThisRow")
let ratioUI = document.getElementById("oddAllRows")
let calculateButton = document.getElementById("calculateButton")
var inputnumber = document.getElementById("rows").value

function updateUI(i) { //Function to update the output on screen

    //Calculate new ratios
    rowratio = (rowodd/rowtotal)*100
    ratio = (odd/total)*100

    //Print output to relevant UI elements
    totalRowsUI.innerHTML = i
    rowratioUI.innerHTML = rowratio.toFixed(4) + "%"
    ratioUI.innerHTML = ratio.toFixed(4) + "%"
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
    
        updateUI(i)
    
        //console.log(i + ": " + rowratio.toFixed(4) + "%  ->  " + ratio.toFixed(4) + "%")
    }
    
    return triangle
}

function calculate() {
    total = 0
    odd = 0
    rowtotal = 0
    rowodd = 0
    updateUI(0)
    inputnumber = Number(document.getElementById("rows").value)
    document.getElementById("output").innerHTML = ''
    generateTriangle(inputnumber).forEach(appendline)

    function appendline(line){
        var outputHTML = document.getElementById("output")
        var lineArray = line.toString().split(",")
        lineArray.forEach(createSpan)

        function createSpan(s) {
            var newSpan = document.createElement('span')
            newSpan.innerHTML = s + ", "
            var n = BigInt(s)
            if (!(n % 2n == 0n)) {
                newSpan.style.color = 'Darkgreen'
            }
            else {
                newSpan.style.color = 'Darkred'
            }
            //console.log(newSpan)
            outputHTML.appendChild(newSpan)
        }

        outputHTML.innerHTML += "<br><br>"
    }
}

calculateButton.addEventListener("click",calculate)