
let monthlyInput = document.getElementById("monthlyInput");
let rateInput = document.getElementById("rateInput");
let yearsInput = document.getElementById("yearsInput");


let monthlyDisplay = document.getElementById("monthlyDisplay");
let rateDisplay = document.getElementById("rateDisplay");
let yearsDisplay = document.getElementById("yearsDisplay");

let investedAmount = document.getElementById("investedAmount");
let estReturns = document.getElementById("estReturns");
let totalValue = document.getElementById("totalValue");

let ctx = document.getElementById('sipChart').getContext('2d');
let sipChart = new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: ['Invested amount', 'Est. returns'],
    datasets: [{
      data: [0, 0],
      backgroundColor: ['#E5E9FF', '#4B6FFF'],
      borderWidth: 0
    }]
  },
  options: {
    plugins: {
      legend: {
        position: 'top',
        labels: {
          boxWidth: 12,
          font: {
            size: 12
          }
        }
      }
    },
    cutout: '70%',
    responsive: true,
    maintainAspectRatio: false
  }
});

document.querySelector('.invest-btn').addEventListener('click', function () {
  let monthly = parseFloat(document.getElementById('monthlyInput').value);
  let rate = parseFloat(document.getElementById('rateInput').value);
  let years = parseFloat(document.getElementById('yearsInput').value);

});

function formatNumber(num) {
  return num.toLocaleString("en-IN", { maximumFractionDigits: 0 });
}

function calculateSIP() {
  let monthly = parseFloat(monthlyInput.value);
  let rate = parseFloat(rateInput.value) / 100 / 12;
  let years = parseInt(yearsInput.value);
  let months = years * 12;

  let invested = monthly * months;
  let futureValue = monthly * ((Math.pow(1 + rate, months) - 1) * (1 + rate)) / rate;
  let returns = futureValue - invested;

  monthlyDisplay.textContent = formatNumber(monthly);
  rateDisplay.textContent = rateInput.value;
  yearsDisplay.textContent = yearsInput.value;

  investedAmount.textContent = `₹${formatNumber(invested)}`;
  estReturns.textContent = `₹${formatNumber(returns)}`;
  totalValue.textContent = `₹${formatNumber(futureValue)}`;

  sipChart.data.datasets[0].data = [invested, returns];
  sipChart.update();
}

monthlyInput.addEventListener("input", calculateSIP);
rateInput.addEventListener("input", calculateSIP);
yearsInput.addEventListener("input", calculateSIP);

window.addEventListener("DOMContentLoaded", calculateSIP);


