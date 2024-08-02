const userInput = document.getElementById("number");
const convertBtn = document.getElementById("convert-btn");
const resultDiv = document.getElementById("output");


const numberToRoman = input => {
    let num = input;
    if (input === '') {
        alert('Please input a value');
        return;
      }

    // Remove the previous result
     resultDiv.replaceChildren();

    let roman = {
        M: 1000, CM: 900, D: 500,
        CD: 400, C: 100, XC: 90,
        L: 50, XL: 40, X: 10,
        IX: 9, V: 5, IV: 4, I: 1
    };
    let str = '';

    for (let i of Object.keys(roman)) {
        let q = Math.floor(num / roman[i]);
        num -= q * roman[i];
        str += i.repeat(q);
    }

    const pTag = document.createElement('p');
    pTag.className = 'user-input';
    pTag.innerHTML = String(str);
    resultDiv.appendChild(pTag);

     // Show the result.
    resultDiv.classList.remove('hidden');
        
}

convertBtn.addEventListener("click",  () => {
    numberToRoman(userInput.value);
    userInput.value = '';
});

userInput.addEventListener("key", e => {
    if (e.key == "Enter") {
      checkForPalindrome(userInput.value);
      userInput.value = '';
    }
  });