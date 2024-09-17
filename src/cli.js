#!/usr/bin/env node
const { createSpinner } = require('nanospinner');
const { highlight } = require('cli-highlight');
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
    const spinner = createSpinner('Processing answer...').start();
    await sleep(800);

    if (isCorrect) {
        spinner.success({ text: `Correct! The answer is '${correctAnswer}'. Well done!` });
    } else {
        spinner.error({ text: `Incorrect. The correct answer is '${correctAnswer}'. Game Over.` });
        process.exit(1);
    }
}

async function displayQuestion({ prompt, codeSnippet, options, answer }) {
    let message = `${prompt}\n`;
    if (codeSnippet) {
        message += `\n${highlight(codeSnippet)}\n\n`;
    }

    const { selectedAnswer } = await inquirer.prompt({
        name: 'selectedAnswer',
        type: 'list',
        message,
        choices: options,
    });

    const correctChoiceIndex = ['A', 'B', 'C', 'D'].indexOf(answer);
    const correctChoice = options[correctChoiceIndex];
    const isCorrect = selectedAnswer === correctChoice;

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
