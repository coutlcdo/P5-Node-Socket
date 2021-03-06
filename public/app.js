let x
let y
let backValue = false

function setup() {
    createCanvas(400, 400)
    // frameRate(120)
    x = 50
    y = 50

    socket = io.connect('https://p5-node-socket.herokuapp.com/')

    socket.on('con', isThereACon)
    socket.on('move', newPlayer)
}

function isThereACon(conVal) {
    backValue = conVal.true
}

function newPlayer(data) {
    let conVal = { 
        true: true
    } 
    socket.emit('connected', conVal)
    background(200)
    fill(100)
    rect(data.x, data.y, 25, 25)
}

function draw() {
    if (backValue === false) {
        background(200)
    }
    console.log('Sending ' + x + ',' + y)
    let data = {
        x,
        y
    }
    socket.emit('moveP', data)

    noStroke()
    fill(0)

    if ((x + 25) >= width) {
        x = width - 25
    } else if (x <= 0) {
        x = 0
    }
    if ((y + 25) >= height) {
        y = height - 25
    } else if (y <= 0) {
        y = 0
    }

    whenKey()

    rect(x, y, 25, 25)
}

function whenKey() {
    if (keyIsDown(LEFT_ARROW) && keyIsDown(UP_ARROW)) {
        x -= 5
        y -= 5
    } else if (keyIsDown(RIGHT_ARROW) && keyIsDown(UP_ARROW)) {
        x += 5
        y -= 5
    } else if (keyIsDown(RIGHT_ARROW) && keyIsDown(DOWN_ARROW)) {
        x += 5
        y += 5
    } else if (keyIsDown(LEFT_ARROW) && keyIsDown(DOWN_ARROW)) {
        x -= 5
        y += 5
    } else if (keyIsDown(LEFT_ARROW)) {
        x -= 5
    } else if (keyIsDown(RIGHT_ARROW)) {
        x += 5
    } else if (keyIsDown(UP_ARROW)) {
        y -= 5
    } else if (keyIsDown(DOWN_ARROW)) {
        y += 5
    }
}

// let x = 50
// let y = 50

// function setup() {
//     createCanvas(400, 400)
//     background(220)

//     socket = io.connect('http://localhost:3000')
//     socket.on('move', newPlayer)

//     noLoop()
// }

// function newPlayer(data) {
//     noStroke()
//     fill(100)
//     rect(data.x, data.y, 25, 25)
// }

// function draw() {
//     console.log('Sending ' + x + ',' + y)
//     let data = {
//         x,
//         y
//     }
//     socket.emit('move', data)

//     fill(0)
//     rect(x, y, 25, 25)

//     if ((x + 25) >= width) {
//         x = width - 25
//     } else if (x <= 0) {
//         x = 0
//     }
//     if ((y + 25) >= height) {
//         y = height - 25
//     } else if (y <= 0) {
//         y = 0
//     }

// }

// function keyPressed() {
//     if (keyCode === LEFT_ARROW && keyCode === UP_ARROW) {
//         x -= 5
//         y -= 5
//     } else if (keyCode === RIGHT_ARROW && keyCode === UP_ARROW) {
//         x += 5
//         y -= 5
//     } else if (keyCode === RIGHT_ARROW && keyCode === DOWN_ARROW) {
//         x += 5
//         y += 5
//     } else if (keyCode === LEFT_ARROW && keyCode === DOWN_ARROW) {
//         x -= 5
//         y += 5
//     } else if (keyCode === RIGHT_ARROW) {
//         x += 5
//     } else if (keyCode === LEFT_ARROW) {
//         x -= 5
//     } else if (keyCode === UP_ARROW) {
//         y -= 5
//     } else if (keyCode === DOWN_ARROW) {
//         y += 5
//     }

//     redraw()
//     setInterval(()=> {clear()}, 3000)
//   }
