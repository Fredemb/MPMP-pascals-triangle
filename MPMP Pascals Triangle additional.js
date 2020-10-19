document.getElementById("rows").value = 128 //Standard number of rows set to 128, as in the original puzzle

//Add variables to hold counters
var total = 0
var odd = 0
var rowtotal = 0
var rowodd = 0

//Add variables to hold ratios
var rowratio = (rowodd/rowtotal)*100
var ratio = (odd/total)*100

//Add references to UI elements
let totalRowsUI = document.getElementById("rowsCalculated")
let rowratioUI = document.getElementById("oddThisRow")
let ratioUI = document.getElementById("oddAllRows")
let calculateButton = document.getElementById("calculateButton")
let inputnumber = document.getElementById("rows").value

function updateUI(i) { //Function to update the output on screen

    //Calculate new ratios
    rowratio = (rowodd/rowtotal)*100
    ratio = (odd/total)*100

    //Print output to relevant UI elements
    totalRowsUI.innerHTML = i
    rowratioUI.innerHTML = rowratio.toFixed(4) + "%"
    ratioUI.innerHTML = ratio.toFixed(4) + "%"
}

function checkOdd(bool) { //Odd numbers are represented by boolean value TRUE, even numbers are FALSE
    total += 1
    rowtotal += 1
    if (bool) { //Runs if the number is odd
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
    
        //Resetting the row counters
        rowtotal = 0
        rowodd = 0
    
        nextRow.push(lastRow[0]) //Add the first value of the last row as the first number of this row
        checkOdd(lastRow[0]) //Count if odd, and count in total
    
        if (lastRow.length > 1) {
            for (j=0; j<lastRow.length-1; j++){ //This loop calculates wheather summed numbers are true or false, and adds them to the row
                //var sum = BigInt(lastRow[j] + lastRow[j+1])
                var sum = ( (lastRow[j] || lastRow[j+1]) && !(lastRow[j] && lastRow[j+1]) ) //Curse the lack of an XOR operator ;-P
                nextRow.push(sum) //Adds the sum to the current row
                checkOdd(sum) //Count if odd, and count in total
            }
        }
    
        nextRow.push(lastRow[lastRow.length-1]) //Add the last value of the last row as the last number of this row
        checkOdd(lastRow[lastRow.length-1]) //Count if odd, and count in total
    
        triangle.push(nextRow) //Adding the generated row to the triangle in memory
        triangle.shift() //Removes previous rows from memory, for memory savings

        updateUI(i) //I cant seem to get this to update before the loop is over :-(
    
        console.log(i + ": " + rowratio.toFixed(4) + "%  ->  " + ratio.toFixed(4) + "%")
    }
    
    return triangle
}

function calculate() {

    //First resets all counters, to ensure starting from 0
    total = 0
    odd = 0
    rowtotal = 0
    rowodd = 0

    inputnumber = Number(document.getElementById("rows").value) //Gets the number of rows to calculate from the user input
    document.getElementById("output").innerHTML = null //Removes any previous output
    updateUI(0) //Removes previous output
    generateTriangle(inputnumber).forEach(appendline) //Generates the triangle, and then starts the appendline function (below)

    function appendline(line){
        var outputHTML = document.getElementById("output")
        var lineArray = line.toString().split(",")
        lineArray.forEach(createSpan)

        function createSpan(s) {
            var newSpan = document.createElement('span')
            newSpan.innerHTML = s + ", "
            if (s == 'true') {
                newSpan.style.color = 'Darkgreen'
            }
            else {
                newSpan.style.color = 'Darkred'
            }
            console.log(newSpan)
            outputHTML.appendChild(newSpan)
        }

        outputHTML.innerHTML += "<br><br>"
    }
}

calculateButton.addEventListener("click",calculate) //Listener for button-press 