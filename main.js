// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8]
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9]
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6]
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5]
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6]

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5]
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3]
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4]
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5]
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4]

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4]
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9]
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3]
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3]
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3]

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5]


// Add your functions below:

// VALIDATE CREDIT CARD

function validateCred(arr) {
    let reversedArray = arr.slice().reverse();                    // reverse array so can used indices repeatably - added slice as was reversed/mutated in later function but unsure why works (SO)
    let sum = 0;                                                  // initialise sum var
    for (let i = 0; i < reversedArray.length; i++ ){              // looping through reversed arr
        let digit = reversedArray[i];
        if (i === 0 || i % 2 === 0) {                             // if check variable or i/2 is 0 - add digit to sum
            sum += digit;
        } else if (i === 1 || i % 2 === 1) {                      // if 1st index or subsequent odds eg 3rd 5th 7th, double digit. 
            digit *= 2;                                           
            if (digit > 9) {                                      // if doubled digit > 9, subtract 9
                digit -= 9;
            } 
            sum += digit;                                        // add digit to sum each time (doubled or not)
        }                                             
    }
    return sum % 10 === 0;                                       // if sum/10 remainder is 0, true/valid, else not
}

// console.log(validateCred(invalid1));

// FIND INVALID CARDS

function findInvalidCards (nestedArr) {
    let invalidArray = [];
    for (const cardNumber of nestedArr) {
        if (validateCred(cardNumber) === false) {
            invalidArray.push(cardNumber);
        }
    }
    // for (let i = 0; i < nestedArr.length; i++ ){
    //     let cardNumber = nestedArr[i];
    //     if (validateCred(cardNumber) === false){
    //         invalidArray.push(cardNumber);
    //     }
    // }
    return invalidArray;
}

// console.log(findInvalidCards(batch));

// IDENTIFY INVALID CARD COMPANIES

function idInvalidCardCompanies (invalidArray) {
    let invalidCompanies = [];
    for (let i= 0 ; i<invalidArray.length ; i++) {
        let firstDigit = invalidArray[i][0];
        
        switch(firstDigit) {
            case 3:
                if (invalidCompanies.indexOf('Amex') === -1) {
                    invalidCompanies.push('Amex');
                }
                break;
            case 4:
                if (invalidCompanies.indexOf('Visa') === -1) {
                    invalidCompanies.push('Visa');
                }
                break;
            case 5:
                if (invalidCompanies.indexOf('Mastercard') === -1) {
                    invalidCompanies.push('Mastercard');
                }
                break;
            case 6:
                if (invalidCompanies.indexOf('Discover') === -1) {
                    invalidCompanies.push('Discover');
                } 
                break;
            default:
                return 'Company not found';
        } 
    }
    return invalidCompanies;    
}


console.log(idInvalidCardCompanies(findInvalidCards(batch)));

console.log(idInvalidCardCompanies([ [ 4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5 ],
    [ 5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3 ],
    [ 3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4 ],
    [ 6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5 ],
    [ 5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4 ],
    [ 3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4 ],
    [ 6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3 ],
    [ 4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3 ] ]));