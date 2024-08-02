const userInput = document.getElementById('user-input');
const checkBtn = document.getElementById('check-btn');
const clearBtn = document.getElementById('clear-btn');
const result = document.getElementById('results-div');

const numberCheck = (phoneNumber) => {

    if (phoneNumber === '') {
        alert('Please provide a phone number');
        return;
    }

    const cleanNumber = phoneNumber.replace(/\D/g, '');
    let resultMsg = '';

  // Check if the cleaned number has 10 or 11 digits
    if (cleanNumber.length !== 10 && cleanNumber.length !== 11) {
        resultMsg = `Invalid US number: ${phoneNumber}`;
    }

    // If the number has 11 digits, check if it starts with 1
    if (cleanNumber.length === 11 && cleanNumber[0] !== '1') {
        resultMsg = `Invalid US number: ${phoneNumber}`;
    }

    // Use a regular expression to match the various formats
    const phoneRegex = /^(1\s?)?(\(\d{3}\)|\d{3})[\s.-]?\d{3}[\s.-]?\d{4}$/;
    
    if(phoneRegex.test(phoneNumber)){
        resultMsg = `Valid US number: ${phoneNumber}`;
    }
    else{
        resultMsg = `Invalid US number: ${phoneNumber}`;
    }
    
    const pTag = document.createElement('p');
    pTag.className = 'user-input';
    pTag.innerHTML = resultMsg;
    result.appendChild(pTag);
}    

checkBtn.addEventListener('click', () => {
    numberCheck(userInput.value)
    userInput.value = '';
});

clearBtn.addEventListener('click', () => {
    result.innerHTML = '';
    result.replaceChild();
    userInput.value = '';
});

userInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      numberCheck(userInput.value);
      userInput.value = '';
    }
  });

