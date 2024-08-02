const input = document.getElementById("#text-input");
const buttonInput = document.getElementById("check-btn");
const result = document.getElementById("result");

function cleanInputString(str) {
    const regex = /[+-\s]/g;
    return str.replace(regex, '');
  }
  
  function isInvalidInput(str) {
    const regex = /\d+e\d+/i;
    return str.match(regex);
  }

const checkPalindrome = (n) => {
    cleanInputString(n);
    if()
    const reverse = 0;
    for(const i=n; i>0; i=i/10){
        reverse += i%10;
    }

    return (n === reverse);
}

const onButtonClick = () => {
    const check = checkPalindrome(input);
    if(check){
        output.innerHTML = `
        <div class="results-div"><p>${input} is a Palindrome<p></div>
        `
    }else{
        output.innerHTML = `
        <div class="results-div"><p>${input} is not a Palindrome<p></div>
        `
    }
}

buttonInput.addEventListener("click", onButtonClick);

