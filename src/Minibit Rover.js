radio.onReceivedString(function (receivedString) {
    message = receivedString
})
function moveRobot () {
    if (left_right == "." && forward_backward == ".") {
        minibit.stop(MBStopMode.Coast)
        minibit.ledClear()
    } else if (left_right == "." && forward_backward == "F") {
        minibit.drive(top_speed)
        minibit.setLedColor(minibit.MBColours(MBColors.White))
    } else if (left_right == "R" && forward_backward == ".") {
        minibit.spin(MBRobotDirection.Right, spin_speed)
        minibit.ledClear()
        minibit.setPixelColor(2, minibit.MBColours(MBColors.Green))
        minibit.setPixelColor(3, minibit.MBColours(MBColors.Green))
    } else if (left_right == "L" && forward_backward == ".") {
        minibit.spin(MBRobotDirection.Left, spin_speed)
        minibit.ledClear()
        minibit.setPixelColor(0, minibit.MBColours(MBColors.Green))
        minibit.setPixelColor(1, minibit.MBColours(MBColors.Green))
    } else if (left_right == "." && forward_backward == "B") {
        minibit.drive(top_speed * -1)
        minibit.setLedColor(minibit.MBColours(MBColors.Indigo))
    } else if (left_right == "R" && forward_backward == "F") {
        if (allow_diagonal_driving == true) {
            minibit.motor(MBMotor.Left, top_speed)
            minibit.motor(MBMotor.Right, top_speed * 0.5)
            minibit.ledClear()
            minibit.setPixelColor(2, minibit.MBColours(MBColors.White))
            minibit.setPixelColor(3, minibit.MBColours(MBColors.Green))
        }
    } else if (left_right == "L" && forward_backward == "F") {
        if (allow_diagonal_driving == true) {
            minibit.motor(MBMotor.Left, top_speed * 0.5)
            minibit.motor(MBMotor.Right, top_speed)
            minibit.ledClear()
            minibit.setPixelColor(1, minibit.MBColours(MBColors.White))
            minibit.setPixelColor(0, minibit.MBColours(MBColors.Green))
        }
    } else if (left_right == "L" && forward_backward == "B") {
        if (allow_diagonal_driving == true) {
            minibit.motor(MBMotor.Left, top_speed * -0.5)
            minibit.motor(MBMotor.Right, top_speed * -1)
            minibit.ledClear()
            minibit.setLedColor(minibit.MBColours(MBColors.Blue))
        }
    } else if (left_right == "R" && forward_backward == "B") {
        if (allow_diagonal_driving == true) {
            minibit.motor(MBMotor.Left, top_speed * -1)
            minibit.motor(MBMotor.Right, top_speed * -0.5)
            minibit.ledClear()
            minibit.setLedColor(minibit.MBColours(MBColors.Violet))
        }
    }
}
function showButton () {
    if (button == "A") {
        basic.showIcon(IconNames.Heart)
    } else if (button == "B") {
        basic.showString("B")
    } else if (button == "C") {
        basic.clearScreen()
    } else if (button == "D") {
        basic.showArrow(ArrowNames.SouthWest)
    } else if (button == "E") {
        basic.showArrow(ArrowNames.SouthEast)
    }
}
function readSonar () {
    current_milliseconds = input.runningTime()
    if (current_milliseconds - previous_milliseconds > sonar_ping_every_ms) {
        previous_milliseconds = current_milliseconds
        if (left_right == "." && forward_backward == ".") {
            distance = minibit.sonar(MBPingUnit.Centimeters)
            if (distance < 3) {
                minibit.setLedColor(minibit.MBColours(MBColors.Red))
            } else if (distance < 4) {
                minibit.setLedColor(minibit.MBColours(MBColors.Orange))
            } else if (distance < 5) {
                minibit.setLedColor(minibit.MBColours(MBColors.Yellow))
            }
        }
    }
}
let distance = 0
let current_milliseconds = 0
let button = ""
let forward_backward = ""
let left_right = ""
let message = ""
let sonar_ping_every_ms = 0
let previous_milliseconds = 0
let allow_diagonal_driving = false
let spin_speed = 0
let top_speed = 0
basic.showIcon(IconNames.Asleep)
minibit.setUpdateMode(MBMode.Auto)
minibit.setLedColor(minibit.MBColours(MBColors.Red))
radio.setGroup(4)
minibit.setLedColor(minibit.MBColours(MBColors.Green))
top_speed = 600
spin_speed = 300
allow_diagonal_driving = true
previous_milliseconds = 0
sonar_ping_every_ms = 100
basic.showIcon(IconNames.Happy)
basic.forever(function () {
    forward_backward = message.charAt(3)
    left_right = message.charAt(7)
    button = message.charAt(12)
    showButton()
    moveRobot()
    readSonar()
})
