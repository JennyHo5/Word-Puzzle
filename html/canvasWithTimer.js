
//DATA MODELS
//Use javascript array of objects to represent words and their locations
let words = []


let timer //used for the motion animation

const canvas = document.getElementById('canvas1') //our drawing canvas

function getWordAtLocation(aCanvasX, aCanvasY) {

  //locate the word near aCanvasX,aCanvasY
  //Just use crude region for now.
  //should be improved to using length of word etc.

  //note you will have to click near the start of the word
  //as it is implemented now
  const TOLERANCE = 20;
  for (let i = 0; i < words.length; i++) {
    //get the width of a word on canvas
    const context = canvas.getContext('2d')
    let wordWidth = context.measureText(words[i].word).width
    if ((aCanvasX >= words[i].x && aCanvasX <= words[i].x + wordWidth)
      && Math.abs(words[i].y - aCanvasY) < TOLERANCE) {
        return words[i]
      }


  }
  return null
}

function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}

function modifyWordsLocations() {
  for (let i =0; i < words.length; i++) {
    let wordString = words[i].word
    let wordWidth = wordString.length * 25
    let wordHeight = 25

    width = getRandomInteger(wordWidth, canvas.width - wordWidth)
    height = getRandomInteger(wordHeight, canvas.height - wordHeight)    

    words[i].x = Math.floor(width)
    words[i].y = Math.floor(height)
  }
}

function drawCanvas() {
  /*
  Call this function whenever the canvas needs to be redrawn.
  */

  const context = canvas.getContext('2d')

  context.fillStyle = 'white'
  context.fillRect(0, 0, canvas.width, canvas.height) //erase canvas

  context.font = '20pt Arial'
  context.fillStyle = 'cornflowerblue'
  context.strokeStyle = 'blue'

  for (let i = 0; i < words.length; i++) {

    let data = words[i]
    context.fillText(data.word, data.x, data.y)
    context.strokeText(data.word, data.x, data.y)

  }
}
