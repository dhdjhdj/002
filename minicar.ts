let address = 0x30

enum Motorlist {
    //% block="A"
    M1 = 1,
    //% block="B"
    M2 = 2
}

enum Direction1 {
    //% block="Forward"
    Forward = 1,
    //% block="Backward"
    Backward = 0
}
enum LED_rgb_L_R {
    //% bolck="LED_R"
    LED_R = 1,
    //% bolck="LED_L"
    LED_L = 0,
}

enum LED_color {
    //% block="rad"
    red1 = 1,
    //% block="green"
    green1 = 2,
    //% block="blue"
    blue1 = 3,
    //% block="cyan"
    cyan = 4,
    //% block="oxblood red"
    oxbloodred = 5,
    //% block="white"
    white = 6,
    //% block="yellow"
    yellow = 7,
    //% block="Turn off LED"
    black = 8,
    
}

//% color="#AA278D"
namespace Motor {

    //% block="motor = | %motor Direction = | $direction speed = $pwmvalue"
    //% direction.shadow=timePicker
    //% pwmvalue.min=0 pwmvalue.max=255 
    export function motor(motor: Motorlist, direction: Direction1, pwmvalue: number) {
        switch (motor) {
            case 1: // M1电机控制
                if (direction) { motor_i2cWrite(0x01, pwmvalue); motor_i2cWrite(0x02, 0); }
                else { motor_i2cWrite(0x02, pwmvalue); motor_i2cWrite(0x01, 0); }
                break;
            case 2: // M2电机控制
                if (direction) { motor_i2cWrite(0x04, pwmvalue); motor_i2cWrite(0x03, 0); }
                else { motor_i2cWrite(0x03, pwmvalue); motor_i2cWrite(0x04, 0); }
                break;
        }
    }

    //% block="RGB = |%place color = |$color"
    //% direction.shadow=timePicker
    export function led_rgb(place: LED_rgb_L_R, color: LED_color) {
        if (place == 1) {
            switch (color) {
                case 1: { motor_i2cWrite(0x0c, 0); motor_i2cWrite(0x0d, 1); motor_i2cWrite(0x0e, 1); };
                    break;
                case 2: { motor_i2cWrite(0x0c, 1); motor_i2cWrite(0x0d, 0); motor_i2cWrite(0x0e, 1); };
                    break;
                case 3: { motor_i2cWrite(0x0c, 1); motor_i2cWrite(0x0d, 1); motor_i2cWrite(0x0e, 0); };
                    break;
                case 4: { motor_i2cWrite(0x0c, 1); motor_i2cWrite(0x0d, 0); motor_i2cWrite(0x0e, 0); };
                    break;
                case 5: { motor_i2cWrite(0x0c, 0); motor_i2cWrite(0x0d, 1); motor_i2cWrite(0x0e, 0); };
                    break;
                case 6: { motor_i2cWrite(0x0c, 0); motor_i2cWrite(0x0d, 0); motor_i2cWrite(0x0e, 0); };
                    break;
                case 7: { motor_i2cWrite(0x0c, 0); motor_i2cWrite(0x0d, 0); motor_i2cWrite(0x0e, 1); };
                    break;
                case 8: { motor_i2cWrite(0x0c, 1); motor_i2cWrite(0x0d, 1); motor_i2cWrite(0x0e, 1); };
                    break;
            }
        }
        if (place == 0) {
            switch (color) {
                case 1: { motor_i2cWrite(0x09, 0); motor_i2cWrite(0x0a, 1); motor_i2cWrite(0x0b, 1); };
                    break;
                case 2: { motor_i2cWrite(0x09, 1); motor_i2cWrite(0x0a, 0); motor_i2cWrite(0x0b, 1); };
                    break;
                case 3: { motor_i2cWrite(0x09, 1); motor_i2cWrite(0x0a, 1); motor_i2cWrite(0x0b, 0); };
                    break;
                case 4: { motor_i2cWrite(0x09, 1); motor_i2cWrite(0x0a, 0); motor_i2cWrite(0x0b, 0); };
                    break;
                case 5: { motor_i2cWrite(0x09, 0); motor_i2cWrite(0x0a, 1); motor_i2cWrite(0x0b, 0); };
                    break;
                case 6: { motor_i2cWrite(0x09, 0); motor_i2cWrite(0x0a, 0); motor_i2cWrite(0x0b, 0); };
                    break;
                case 7: { motor_i2cWrite(0x09, 0); motor_i2cWrite(0x0a, 0); motor_i2cWrite(0x0b, 1); };
                    break;
                case 8: { motor_i2cWrite(0x09, 1); motor_i2cWrite(0x0a, 1); motor_i2cWrite(0x0b, 1); };
                    break;
            }
        }

    }
}

function motor_i2cWrite(reg: number, value: number) {
    let buf = pins.createBuffer(2)
    buf[0] = reg
    buf[1] = value
    pins.i2cWriteBuffer(address, buf)
}
