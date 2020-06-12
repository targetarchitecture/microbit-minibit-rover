enum RadioMessage {
    message1
}
// ADKEY
//
//
// Nothing = 1015
//
// A = 1
//
// B = 145
//
// C = 226
//
// D = 449
//
// E = 723
//
function readButtons () {
    adkey = pins.analogReadPin(AnalogPin.P2)
    if (adkey > 900) {
        button = "."
    } else if (adkey < 100) {
        button = "A"
        basic.showString("A")
    } else if (adkey < 190) {
        button = "B"
        basic.showString("B")
    } else if (adkey < 300) {
        button = "C"
        basic.showString("C")
    } else if (adkey < 500) {
        button = "D"
        basic.showString("D")
    } else if (adkey < 800) {
        button = "E"
        basic.showString("E")
    } else {
        button = "."
        basic.showIcon(IconNames.No)
    }
}
function readJoystick () {
    joystick_x = pins.analogReadPin(AnalogPin.P0)
    if (joystick_x > 600) {
        left_right = "R"
    } else if (joystick_x < 400) {
        left_right = "L"
    } else {
        left_right = "."
    }
    joystick_y = pins.analogReadPin(AnalogPin.P1)
    if (joystick_y > 600) {
        forward_backward = "F"
    } else if (joystick_y < 400) {
        forward_backward = "B"
    } else {
        forward_backward = "."
    }
}
let message = ""
let forward_backward = ""
let joystick_y = 0
let left_right = ""
let joystick_x = 0
let button = ""
let adkey = 0
basic.showIcon(IconNames.TShirt)
radio.setGroup(4)
basic.showIcon(IconNames.Chessboard)
basic.showIcon(IconNames.Diamond)
basic.forever(function () {
    readJoystick()
    readButtons()
    message = "FWDBWD:" + forward_backward + "LFTRHT:" + left_right + "BTN:" + button
    radio.sendString(message)
    serial.writeLine(message)
})
