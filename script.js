

// DOM elements
const resultEl = document.getElementById('result');
const lowercaseEl = document.getElementById('lowercase');
const uppercaseEl = document.getElementById('uppercase');
const lengthEl = document.getElementById('length');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const clipboardEl = document.getElementById('clipboard');

const randomFunction = {
    lower: getRandomLowerCharacters,
    upper: getRandomUpperCharacters,
    number: getRandomNumber,
    symbol: getRandomSymbol
};

// Clipborad Event Listener
clipboardEl.addEventListener("click", () => {
    const textarea = document.createElement('textarea');
	const password = resultEl.innerText;
	
	if(!password) { return; }
	
	textarea.value = password;
	document.body.appendChild(textarea);
	textarea.select();
	document.execCommand('copy');
	textarea.remove();
	alert('Password copied to clipboard');
});

// Genearte password event listener
generateEl.addEventListener("click", () => {
    // + is used to change string datatype to number type
    const length = +lengthEl.value;
    const hasLower = lowercaseEl.checked;
    const hasUpper = uppercaseEl.checked;
    const hasNumbers = numbersEl.checked;
    const hasSymbols = symbolsEl.checked;
    resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumbers, hasSymbols, length);
});

function generatePassword(lower, upper, number, symbol, length) {
	let generatedPassword = '';
	const typesCount = lower + upper + number + symbol; // 4
    const typesArr = [{lower}, {upper}, {number}, {symbol}].filter(item => Object.values(item)[0]);
    
// Doesn't have a selected type 
if(typesCount === 0) {
    return '';
}
// Create a loop
for(let i = 0; i < length; i+=typesCount) {
    typesArr.forEach(type => {
        const funcName = Object.keys(type)[0];
        generatedPassword += randomFunction[funcName]();

    })
}
const finalPassword = generatedPassword.slice(0, length);
return finalPassword;
}




// Generator functions

// a-z
function getRandomLowerCharacters() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}
// A-Z
function getRandomUpperCharacters() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}
// 0-9
function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
    const symbols = '!@#=%^&*()[]_<>/.|{}~,';
    return symbols[Math.floor(Math.random() * symbols.length)];
}

