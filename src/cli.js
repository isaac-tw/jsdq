#!/usr/bin/env node
const chalkAnimation = require('chalk-animation');

const sleep = (ms = 1000) => new Promise(resolve => setTimeout(resolve, ms));

async function displayIntro() {
    console.clear();
    const titleText = 'JSDQ - JavaScript Daily Question';
    const animatedTitle = chalkAnimation.rainbow(titleText);
    await sleep();
    animatedTitle.stop();
}

async function runQuiz() {
    await displayIntro();
}

runQuiz();
