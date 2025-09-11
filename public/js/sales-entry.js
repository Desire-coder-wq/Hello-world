// Fetch all sales from backend
async function fetchSales() {
  const res = await fetch("/api/sales");
  return await res.json();
}

// Calculate totals
function calculateTotals(sale) {
  const subtotal = sale.quantity * sale.price;
  const discountAmount = sale.discount ? subtotal * 0.05 : 0;
  const total = subtotal - discountAmount;
  return { subtotal, total };
}

// Add a row to the table
function addRowToTable(sale) {
  const { subtotal, total } = calculateTotals(sale);
  const tbody = document.querySelector("#salesTable tbody");
  const newRow = document.createElement("tr");
  newRow.setAttribute("data-id", sale._id);

  newRow.innerHTML = `
    <td>${sale.salesAgent}</td>
    <td>${sale.customer}</td>
    <td>${sale.productId}</td>
    <td>${sale.quantity}</td>
    <td>${sale.price}</td>
    <td>${sale.transport}</td>
    <td>${sale.payment}</td>
    <td>${sale.discount ? "Yes (5%)" : "No"}</td>
    <td>${subtotal.toFixed(2)}</td>
    <td>${total.toFixed(2)}</td>
    <td>${new Date(sale.date).toLocaleDateString()}</td>
    <td>
      <button class="edit">Edit</button>
      <button class="delete">Delete</button>
    </td>
  `;

  // Edit button logic
  newRow.querySelector(".edit").addEventListener("click", () => {
    document.getElementById("saleId").value = sale._id;
    document.getElementById("salesAgent").value = sale.salesAgent;
    document.getElementById("customer").value = sale.customer;
    document.getElementById("productId").value = sale.productId;
    document.getElementById("quantity").value = sale.quantity;
    document.getElementById("price").value = sale.price;
    document.getElementById("transport").value = sale.transport;
    document.getElementById("payment").value = sale.payment;
    document.getElementById("discount").checked = sale.discount;
    document.getElementById("date").value = sale.date.split("T")[0];
  });

  // Delete button logic
  newRow.querySelector(".delete").addEventListener("click", async () => {
    if (confirm("Are you sure you want to delete this entry?")) {
      await fetch(`/api/sales/${sale._id}`, { method: "DELETE" });
      newRow.remove();
    }
  });

  tbody.appendChild(newRow);
}

// Load existing sales on page load
window.addEventListener("DOMContentLoaded", async () => {
  const sales = await fetchSales();
  sales.forEach(addRowToTable);
});

// Handle form submission (create + update)
document.getElementById("salesForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const saleId = document.getElementById("saleId").value;

  // Collect form data
const saleData = {
  salesAgent: document.getElementById("salesAgent").value,
  customer: document.getElementById("customer").value,
  productId: document.getElementById("productId").value,
  quantity: document.getElementById("quantity").value,
  transport: document.getElementById("transport").value,
  payment: document.getElementById("payment").value,
  discount: document.getElementById("discount").checked, // 👈 FIXED
  date: document.getElementById("date").value,
  price: document.getElementById("price").value,
};


  if (saleId) {
    // Update existing sale
    const res = await fetch(`/api/sales/${saleId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(saleData),
    });
    const updated = await res.json();

    const row = document.querySelector(`tr[data-id='${saleId}']`);
    const { subtotal, total } = calculateTotals(updated);

    row.children[0].textContent = updated.salesAgent;
    row.children[1].textContent = updated.customer;
    row.children[2].textContent = updated.productId;
    row.children[3].textContent = updated.quantity;
    row.children[4].textContent = updated.price;
    row.children[5].textContent = updated.transport;
    row.children[6].textContent = updated.payment;
    row.children[7].textContent = updated.discount ? "Yes (5%)" : "No";
    row.children[8].textContent = subtotal.toFixed(2);
    row.children[9].textContent = total.toFixed(2);
    row.children[10].textContent = new Date(updated.date).toLocaleDateString();

    document.getElementById("saleId").value = "";
  } else {
    // New entry
    const res = await fetch("/api/sales", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(saleData),
    });
    const saved = await res.json();
    addRowToTable(saved);
  }

  e.target.reset();
});
