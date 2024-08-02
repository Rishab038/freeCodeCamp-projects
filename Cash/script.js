let price = 19.5;
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100]
];

const currencyUnit = {
  "PENNY": 0.01,
  "NICKEL": 0.05,
  "DIME": 0.1,
  "QUARTER": 0.25,
  "ONE": 1,
  "FIVE": 5,
  "TEN": 10,
  "TWENTY": 20,
  "ONE HUNDRED": 100
};

function calculateChange(price, cash, cid) {
  let changeDue = cash - price;
  let totalCID = cid.reduce((acc, curr) => acc + curr[1], 0);
  
  if (changeDue > totalCID) {
    return { status: "INSUFFICIENT_FUNDS", change: [] };
  }
  
  if (changeDue.toFixed(2) === totalCID.toFixed(2)) {
    return {
      status: "CLOSED",
      change: cid.filter(([, amount]) => amount > 0)
    };
  }
  
  let change = [];
  let tempCid = JSON.parse(JSON.stringify(cid)).reverse();
  
  for (let i = 0; i < tempCid.length; i++) {
    let [unit, amount] = tempCid[i];
    let unitValue = currencyUnit[unit];
    let unitCount = Math.min(Math.floor(changeDue / unitValue), amount / unitValue);
    let unitTotal = unitCount * unitValue;
    
    if (unitCount > 0) {
      change.push([unit, unitTotal]);
      changeDue = (changeDue - unitTotal).toFixed(2);
      tempCid[i][1] = (amount - unitTotal).toFixed(2);
    }
    
    if (changeDue == 0) break;
  }
  
  if (changeDue > 0) {
    return { status: "INSUFFICIENT_FUNDS", change: [] };
  }
  
  return { status: "OPEN", change: change, updatedCid: tempCid.reverse() };
}

function updateDrawerDisplay(cid) {
  const drawerContents = document.getElementById("cash-drawer-display");
  drawerContents.textContent = cid.map(([unit, amount]) => `${unit}: $${amount.toFixed(2)}`).join("\n");
}

document.getElementById("purchase-btn").addEventListener("click", function() {
  let cash = parseFloat(document.getElementById("cash").value);
  let changeDueElement = document.getElementById("change-due");
  
  if (cash < price) {
    alert("Customer does not have enough money to purchase the item");
    return;
  }
  
  if (cash === price) {
    changeDueElement.textContent = "No change due - customer paid with exact cash";
    updateDrawerDisplay(cid);
    return;
  }
  
  let result = calculateChange(price, cash, cid);
  
  if (result.status === "INSUFFICIENT_FUNDS") {
    changeDueElement.textContent = "Status: INSUFFICIENT_FUNDS";
  } else if (result.status === "CLOSED") {
    changeDueElement.textContent = "Status: CLOSED " + result.change.map(([unit, amount]) => `${unit}: $${amount.toFixed(2)}`).join(" ");
    cid = result.change;
  } else {
    changeDueElement.textContent = "Status: OPEN " + result.change.map(([unit, amount]) => `${unit}: $${amount.toFixed(2)}`).join(" ");
    cid = result.updatedCid;
  }
  
  updateDrawerDisplay(cid);
});

// Initial display of drawer contents
updateDrawerDisplay(cid);