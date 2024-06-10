#! /usr/bin/env node
import { differenceInSeconds } from "date-fns";
import inquirer from "inquirer";
import chalk from "chalk";
console.log(chalk.blue.bold('\n\t Welcome to Muhammad Mehdi Raza CountDown timer\n\t'));
const res = await inquirer.prompt([{
        name: "userInput",
        type: "number",
        message: "Please Enter the amount of second",
        validate: (input) => {
            if (isNaN(input)) {
                return "Please Enter a Valid Number";
            }
            else if (input > 60) {
                return "Seconds must be less than or equal to 60";
            }
            else {
                return true;
            }
        }
    }]);
let input = res.userInput;
function timestart(value) {
    const initTime = new Date().setSeconds(new Date().getSeconds() + value);
    const setIntervalTime = new Date(initTime);
    const intervalId = setInterval(() => {
        const CurrentTime = new Date();
        const timeDiff = differenceInSeconds(setIntervalTime, CurrentTime);
        if (timeDiff <= 0) {
            console.log(chalk.red.bold("Timer has Expired"));
            clearInterval(intervalId);
            process.exit();
        }
        const min = Math.floor((timeDiff % (3600 * 24)) / 60);
        const sec = Math.floor(timeDiff % 60);
        console.log(`${min.toString().padStart(2, "0")} : ${sec.toString().padStart(2, "0")}`);
    }, 1000);
}
timestart(input);
