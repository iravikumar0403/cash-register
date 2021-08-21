const billAmount = document.getElementById("bill-amount")
const cashGiven = document.getElementById("cash-given")
const checkBtn = document.getElementById("check-btn")
const errorEl = document.getElementById("error-msg")
const noteGroup = document.getElementById("note-group")
const exachangeAmoutEl = document.getElementById("exchange-amount")
const exchangeGroup = document.getElementById("exchange-group")
const exchangeTable = document.getElementById("table")

const availableNotes = [2000, 500, 100, 20, 10, 5, 1];
let exchangeAmount;

checkBtn.addEventListener('click', ()=>{
  if(validateInputs()){
    exchangeAmount = cashGiven.value - billAmount.value;
    exachangeAmoutEl.innerHTML = exchangeAmount;
    renderExchangeTable(["Note/Coins", ...availableNotes], noteGroup);
    let exchangeCount = calculateExchanges();
    renderExchangeTable(["Count" , ...exchangeCount], exchangeGroup);
  }
})

function renderExchangeTable(values, parentEl){
  parentEl.innerHTML = ""
  exchangeTable.style.display = "block"
  values.forEach(value => {
    let childEl = document.createElement('td');
    childEl.innerHTML = value;
    parentEl.appendChild(childEl);
  })
}

function calculateExchanges(){
  let remainingAmount = exchangeAmount;
  let exchangeCount = availableNotes.map(noteValue => {
    if(remainingAmount >= noteValue){
      numberOfNotes = parseInt(remainingAmount/noteValue);
      remainingAmount = remainingAmount%noteValue;
      return numberOfNotes;
    }else{
      return 0
    }
  })
  return(exchangeCount)
}

function validateInputs(){
  if(billAmount.value === ""){
    errorEl.innerHTML = "Please enter the bill amount";
    return false;
  }else if(isNaN(billAmount.value)){
    errorEl.innerHTML = "Invalid Input! Please enter a valid bill amount"
    return false;
  }else if(cashGiven.value === ""){
    errorEl.innerHTML = "Please enter the cash given";
    return false;
  }else if(isNaN(cashGiven.value)){
    errorEl.innerHTML = "Invalid Input! Please enter a valid cash amount"
    return false;
  }else{
    if (parseInt(cashGiven.value) < parseInt(billAmount.value)){
      errorEl.innerHTML = "Cash given must be greater than bill amount"
      return false;
    }
  }
  return true
}