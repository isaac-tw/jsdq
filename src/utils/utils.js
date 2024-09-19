function shuffle(array, seed) {
    let m = array.length, t, i;

    while (m) {
        i = Math.floor(random(seed++) * m--);

        // Swap element at index m with element at index i
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }

    return array;
}

function random(seed) {
    // Simple PRNG based on seed
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
}

function getDayOfCycle(questionNums) {
    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
    return dayOfYear % questionNums; // Cycles over 'questionNums'
}

function getDailyShuffledNumber(questionNums) {
    const dayOfCycle = getDayOfCycle(questionNums);

    // Generate and shuffle array from 1 to questionNums only once
    const numbers = Array.from({ length: questionNums }, (_, i) => i + 1);
    shuffle(numbers, new Date().getFullYear());

    return numbers[dayOfCycle];
}

function parseCodeAndText(inputText) {
    // Use regex to split the string into parts
    const fragments = inputText.split(/(```[\s\S]*?```)/);

    // Initialize result array
    const parsedContent = [];

    // Process each part
    fragments.forEach(part => {
        if (part.startsWith('```')) {
            // Extract code block content, removing the markdown delimiters
            const code = part.replace(/^```[\s\S]*?\n/, '').replace(/\n```$/, '');
            parsedContent.push({
                content: code,
                type: 'codeSnippet',
            });
        } else if (part.trim().length > 0) {
            parsedContent.push({
                content: part,
                type: 'string',
            });
        }
    });

    return parsedContent;
}

module.exports = {
    getDailyShuffledNumber,
    parseCodeAndText,
};
