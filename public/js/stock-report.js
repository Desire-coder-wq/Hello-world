document.addEventListener("DOMContentLoaded", () => {
  // Attendant Chart
  if (attendantData.length) {
    new Chart(document.getElementById("attendantChart"), {
      type: "bar",
      data: {
        labels: attendantData.map(d => d._id),
        datasets: [{
          label: "Stock Added (Qty)",
          data: attendantData.map(d => d.totalAdded)
        }]
      }
    });
  }

  // Monthly Expense Chart
  if (monthlyExpenses.length) {
    new Chart(document.getElementById("expenseChart"), {
      type: "line",
      data: {
        labels: monthlyExpenses.map(d => `${d._id.month}/${d._id.year}`),
        datasets: [{
          label: "Monthly Expenses",
          data: monthlyExpenses.map(d => d.total)
        }]
      }
    });
  }

  // Product Expense Chart
  if (productExpenses.length) {
    new Chart(document.getElementById("productExpenseChart"), {
      type: "pie",
      data: {
        labels: productExpenses.map(d => d._id),
        datasets: [{
          label: "Expenses",
          data: productExpenses.map(d => d.totalExpense)
        }]
      }
    });
  }
});

// Product Quantity Chart
if (productQuantities.length) {
  new Chart(document.getElementById("productQuantityChart"), {
    type: "bar",
    data: {
      labels: productQuantities.map(d => d._id),
      datasets: [{
        label: "Stock Quantity",
        data: productQuantities.map(d => d.totalQuantity)
      }]
    }
  });
}

