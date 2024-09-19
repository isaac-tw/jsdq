#!/usr/bin/env node
const { createSpinner } = require('nanospinner');
const { highlight } = require('cli-highlight');
const chalk = require('chalk');
const chalkAnimation = require('chalk-animation');
const inquirer = require('inquirer');

const { getDailyShuffledNumber } = require('./utils/utils');
const questions = require('./assets/javascript-questions.json');

const sleep = (ms = 1000) => new Promise(resolve => setTimeout(resolve, ms));

async function displayIntro() {
    const titleText = 'JSDQ - JavaScript Daily Question\n';
    const animatedTitle = chalkAnimation.rainbow(titleText);
    await sleep();
    animatedTitle.stop();
}

async function processAnswer(isCorrect, correctAnswer) {
    const formattedAnswer = chalk.green.bold(`"${correctAnswer}"`);
    const spinner = createSpinner('Processing answer...').start();
    await sleep(800);

    const answerMsg = `The answer is ${formattedAnswer}.`;
    if (isCorrect) {
        spinner.success({ text: `Correct! ${answerMsg} Well done!` });
    } else {
        spinner.error({ text: `Incorrect. ${answerMsg} Nice try, keep it up!.` });
    }
}

async function displayQuestion({ prompt, codeSnippet, options, answer }) {
    const optionLabels = ['A', 'B', 'C', 'D'];

    let message = `${prompt}\n`;
    if (codeSnippet) {
        message += `\n${highlight(codeSnippet)}\n\n`;
    }

    const choices = options.map((option, index) => `${optionLabels[index]}: ${option}`);

    const { selectedAnswer } = await inquirer.prompt({
        name: 'selectedAnswer',
        type: 'list',
        message,
        choices,
    });

    const isCorrect = selectedAnswer[0] === answer;
    const correctChoice = choices[optionLabels.indexOf(answer)];

    console.log()
    await processAnswer(isCorrect, correctChoice);
}

async function runQuiz() {
    const dailyNumber = getDailyShuffledNumber(questions.length);
    const questionOfTheDay = questions[dailyNumber - 1];

    console.clear();
    await displayIntro();
    await displayQuestion(questionOfTheDay);
}

runQuiz();
