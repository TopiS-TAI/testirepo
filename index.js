imgContEl = document.getElementById('imgContainer')
imgEl = document.getElementById('image')
// gameFormEl = document.getElementById('gameForm')
startEl = document.getElementById("start")
messageEl = document.getElementById("message")
bodyEl = document.getElementsByTagName("body")
buttonEls = []
for (let i = 1; i < 5; i++) {
    buttonEls.push(document.getElementById('button' + i))
}

students = []
mix = []
fails = []
gameIndex = 0
score = 0

async function getStudents() {
    try {
        students = await fetch('opiskelijat/opiskelijat.json')
        students = await students.json()
        startEl.removeAttribute('disabled')
    } catch (err) {
        messageEl.innerHTML = err
    }
}

const arrayShuffle = (array) => { 
    for (let i = array.length - 1; i > 0; i--) { 
      const j = Math.floor(Math.random() * (i + 1)); 
      [array[i], array[j]] = [array[j], array[i]]; 
    } 
    return array; 
  }; 

function initGame() {
    gameIndex = 0
    score = 0
    fails = []
    messageEl.innerHTML = ''
    mix = arrayShuffle(students)
    mix = mix.filter(s => s.image)
    // gameFormEl.removeAttribute('hidden')
    startEl.setAttribute('hidden', true)
    bodyEl.classList.remove('running', 'stopped')
    bodyEl.classList.add('running')
    fillForm()
}

function fillForm() {
    imgEl.setAttribute('src', '/opiskelijat/' + mix[gameIndex].filename)
    randIndices = [gameIndex]
    while (randIndices.length < 4) {
        rand = Math.round(Math.random() * (mix.length - 1))
        if (randIndices.indexOf(rand) === -1) randIndices.push(rand)
    }
    randIndices = arrayShuffle(randIndices)
    for (i in buttonEls) {
        buttonEls[i].innerHTML = mix[randIndices[i]].name
    }
}

function gameOver() {
    messageEl.innerHTML = `Pisteet: ${score} / ${mix.length}. `
    failString = ''
    for (fail of fails) {
        failString += fail.name + ', '
    }
    messageEl.innerHTML += `Väärät arvaukset: ${failString}`
    // gameFormEl.setAttribute('hidden', true)
    start.removeAttribute('hidden')
    bodyEl.classList.remove('running', 'stopped')
}

function clicked(e) {
    if (e.target.innerHTML === mix[gameIndex].name) {
        score++
        imgContEl.classList.add('success')
    } else {
        fails.push(mix[gameIndex])
        imgContEl.classList.add('fail')
    }
    gameIndex++
    console.log('game', gameIndex)
    setTimeout(() => {
        imgContEl.classList.remove('success', 'fail')
    }, 100);

    if (gameIndex < mix.length) {
        fillForm()
    } else {
        gameOver()
    }
}

getStudents()
