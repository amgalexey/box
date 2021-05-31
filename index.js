const $start = document.querySelector('#start')
const $game = document.querySelector('#game')
const $time = document.querySelector('#time')
const $result = document.querySelector('#result')
const $timeHeader = document.querySelector('#time-header')
const $resultHeader = document.querySelector('#result-header')
const $gameTime = document.querySelector('#game-time')
let score = 0
let isGameStarted = false
let colors = ['red', 'blue', 'green', 'yellow']
$start.addEventListener('click', startGame)
$game.addEventListener('click', handleBoxClick)
$gameTime.addEventListener('input', setGameTime)

function show ($el) {
    $el.classList.remove('hide')
}

function hide($el) {
    $el.classList.add('hide')
}

function handleBoxClick(event){
    if (!isGameStarted) {
        return
    }
    if (event.target.dataset.box){
        score++
        renderBox()
    } else {
       $result.textContent = '0'
        $time.textContent = '0'
        score = 0

           }
}
function startGame() {
    score = 0
    setGameTime()
    $gameTime.setAttribute('disabled', true)
    isGameStarted = true
    hide($start)
    $game.style.backgroundColor = 'white'
    var interval = setInterval(function (){
        var time = parseFloat($time.textContent)
        console.log('interval', $time.textContent)
if (time <= 0) {
    clearInterval(interval)
    endGame()
}else {
    $time.textContent = (time - 0.1).toFixed(1)
}
    }, 100)
renderBox()
}

function setGameScore() {
    $result.textContent = score.toString()
}


function setGameTime () {
    var time = +$gameTime.value
    $time.textContent = time.toFixed(1)
    show($timeHeader)
    hide($resultHeader)
}
function endGame() {
    isGameStarted = false
    show($start)
    $gameTime.setAttribute('disabled', false)
    $game.innerHTML = ''
    $game.style.backgroundColor = '#ccc'
    hide($timeHeader)
    show($resultHeader)
    setGameScore()
    $gameTime.removeAttribute('disabled')
    if (score === 0) {
        $result.textContent = 'Твой результат "ю довн". Съебался отсюда, ебалай'

    }
}

function renderBox() {
    $game.innerHTML = ''
    var box = document.createElement('div')
    var boxSize = randomBox(30,100)
    var gameSize = $game.getBoundingClientRect()
    var maxTop = gameSize.height - boxSize
    var maxLeft = gameSize.width - boxSize
    var randomColorsIndex = randomBox(0, 3)
    box.style.height = box.style.width = boxSize + 'px'
    box.style.position = 'absolute'
    box.style.backgroundColor = colors[randomColorsIndex]
    box.style.top = randomBox(0, maxTop) + 'px'
    box.style.left = randomBox(0, maxLeft) + 'px'
    box.style.cursor = 'pointer'

    box.setAttribute('data-box', 'true')
    $game.insertAdjacentElement('afterbegin', box)
}

function randomBox(min, max) {
    return Math.floor(Math.random() * (max - min)+min)
}
