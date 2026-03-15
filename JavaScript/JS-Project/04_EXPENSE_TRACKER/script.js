document.addEventListener("DOMContentLoaded", () => {
  const expenseForm = document.getElementById("expense-form");
  const expenseNameInput = document.getElementById("expense-name");
  const expenseAmountInput = document.getElementById("expense-amount");
  const expenseList = document.getElementById("expense-list");
  const totalAmountDisplay = document.getElementById("total-amount");

  let expenses = JSON.parse(localStorage.getItem("expense")) || [];
  let totalAmount = calculateTotalAmount();
  renderExpenses();

  expenseForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = expenseNameInput.value.trim();
    const expense = expenseAmountInput.value.trim();

    if (name === "" || expense === "") return;

    addExpenses(name, expense);

    expenseNameInput.value = "";
    expenseAmountInput.value = "";
  });

  function addExpenses(name, expance) {
    const newExpense = {
      name: name,
      amount: Number(expance),
    };

    expenses.push(newExpense);
    totalAmount = calculateTotalAmount();
    saveLocalStorage();
    renderExpenses();
  }

  function calculateTotalAmount() {
    let total = 0;

    expenses.forEach((item) => {
      total += Number(item.amount);
    });

    return total;
  }

  function saveLocalStorage() {
    localStorage.setItem("expense", JSON.stringify(expenses));
  }

  function renderExpenses() {
    expenseList.innerHTML = "";

    expenses.forEach((item, index) => {
      const li = document.createElement("li");
      li.innerHTML = `${item.name} - ${item.amount} <button>remove</button>`;

      const removeBtn = li.querySelector("button");
      removeBtn.addEventListener("click", (e) => {
        e.stopPropagation();

        expenses.splice(index, 1);
        totalAmount = calculateTotalAmount();
        saveLocalStorage();
        renderExpenses();
      });
      expenseList.appendChild(li);
    });

    totalAmountDisplay.textContent = `$${totalAmount.toFixed(2)}`;
  }
});
