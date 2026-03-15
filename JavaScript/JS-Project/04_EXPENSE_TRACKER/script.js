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
    const amount = expenseAmountInput.value.trim();

    if (name === "" || amount === "") return;

    addExpenses(name, amount);

    expenseNameInput.value = "";
    expenseAmountInput.value = "";
  });

  function addExpenses(name, amount) {
    expenses.push({ name, amount: Number(amount) });
    totalAmount = calculateTotalAmount();
    saveLocalStorage();
    renderExpenses();
  }

  function calculateTotalAmount() {
    return expenses.reduce((total, item) => total + Number(item.amount), 0);
  }

  function saveLocalStorage() {
    localStorage.setItem("expense", JSON.stringify(expenses));
  }

  function renderExpenses() {
    expenseList.innerHTML = "";

    expenses.forEach((item, index) => {
      const li = document.createElement("li");
      // ✅ span tags so CSS styles name + amount correctly
      li.innerHTML = `
        <span>${item.name}</span>
        <span>$${Number(item.amount).toFixed(2)}</span>
        <button>Remove</button>
      `;

      li.querySelector("button").addEventListener("click", (e) => {
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
