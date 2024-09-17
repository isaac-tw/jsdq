#!/usr/bin/env node
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
}

async function runQuiz() {
    const dailyNumber = getDailyShuffledNumber(questions.length);
    const questionOfTheDay = questions[dailyNumber - 1];

    console.clear();
    await displayIntro();
    await displayQuestion(questionOfTheDay);
}

runQuiz();
