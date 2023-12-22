
//TODO
function handleGetPuzzleButton() {

  let userText = document.getElementById('userTextField').value
  if (userText && userText != '') {

    //add the userText to text-area on html
    let textDiv = document.getElementById("text-area")
    textDiv.style.color = 'black'
	  textDiv.innerHTML = textDiv.innerHTML + `<p> ${userText}</p>`

    let userRequestObj = {text: userText}
    let userRequestJSON = JSON.stringify(userRequestObj)
    //document.getElementById('userTextField').value = ''
    //alert ("You typed: " + userText);

    let xhttp = new XMLHttpRequest()
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        //console.log("data: " + this.responseText)
        //console.log("typeof: " + typeof this.responseText)
        //we are expecting the response text to be a JSON string
        let responseObj = JSON.parse(this.responseText)
        
        //console.log("responseObj",responseObj)
        
        if (responseObj.text === 'NOT FOUND: ' + userText){
          console.log("the puzzle does not exist")
          words = [] //clear the words on teh canvas
        }
        else {
          //change the words array to the lyric words
        words = []
        //puzzle.puzzleLines = responseObj.puzzleLines;
        // console.log(responseObj.puzzleLines)
        for (let i = 0; i < responseObj.puzzleLines.length; i++) {
          puzzleLine = responseObj.puzzleLines[i]
          wordsInPuzzleLine = puzzleLine.split(" ")
          for (let j = 0; j < wordsInPuzzleLine.length; j++) {
            let wordInPuzzleLine = wordsInPuzzleLine[j]
            if (wordInPuzzleLine != "") {
              //console.log(wordInPuzzleLine)
              words.push({word: wordInPuzzleLine, x: 50, y: 50})
            }
          }
        }
        modifyWordsLocations() //set x and y to random locations
        }
        drawCanvas()
      }
    }
    xhttp.open("POST", "userText") //API .open(METHOD, URL)
    xhttp.send(userRequestJSON) //API .send(BODY)
  }
}

//TODO
function handleSolvePuzzleButton() {

  let result = [[]]
  result[0][0] = words[0]
  let added
  
  for (let i = 1; i < words.length; i++) {
    added = false
    //console.log(words[i]) //I
    for (let j = 0; j < result.length; j ++){
      if (Math.abs(result[j][0].y - words[i].y) <= 10) {
        result[j].push(words[i])
        added = true
        break
      }
    }
    if (added === false) {
      result.push([words[i]])
    }
  }
  
  let rows = []
  for (let i = 0; i < result.length; i++) {
    //sort the strings in result[i] from smallest x to largest
    let row = result[i]
    //console.log("row: " + row)
    row.sort((a, b) => a.x - b.x)

    let rowString = "";
    for (let j = 0; j < result[i].length; j++){
      rowString = rowString + result[i][j].word + " "
    }

    let rowY = row[0].y //find the smallest x in result[i]
    let rowObj = {text: rowString, y: rowY}
    rows.push(rowObj)
  }
  rows.sort((a, b) => a.y - b.y)
  //console.log(rows)

  let textDiv = document.getElementById("text-area")
  textDiv.innerHTML = ""

  let wordResultWithOrder = []
  for (let i = 0; i<rows.length; i++) {
    let row = rows[i].text
    let wordsInOneRow = row.trim().split(" ")
    for (let j = 0; j < wordsInOneRow.length; j++) {
      wordResultWithOrder.push(wordsInOneRow[j])
    }
    textDiv.innerHTML = textDiv.innerHTML + `<p> ${row}</p>`
  }
  //console.log(wordResultWithOrder)

  let answer = []

  let userText = document.getElementById('userTextField').value

  if (userText && userText != '') {
    let userRequestObj = {text: userText}
    let userRequestJSON = JSON.stringify(userRequestObj)
  
    let xhttp = new XMLHttpRequest()
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          let responseObj = JSON.parse(this.responseText)

          for (let i =0; i < responseObj.puzzleLines.length; i++) {
            let answerRow = responseObj.puzzleLines[i]
            let wordsInAnswerRow = answerRow.split(" ")
            for (let j = 0; j < wordsInAnswerRow.length; j++) {
              answer.push(wordsInAnswerRow[j])
            }
          }
          
          //console.log(answer)

          let isWrong = false
          let textArea = document.getElementById('text-area')
          
          for (let i = 0; i < answer.length; i++) {
          if (answer[i] !== wordResultWithOrder[i]) {
            isWrong = true
            textArea.style.color = 'red'
            break
            }
          }

          if (isWrong === false) {
            textArea.style.color = 'green'
          }
        }
      }
      xhttp.open("POST", "userText")
      xhttp.send(userRequestJSON)
  }
}
