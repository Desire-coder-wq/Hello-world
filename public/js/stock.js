function getStock() {
  return JSON.parse(localStorage.getItem("stockData") || "[]");
}

function saveStock(stock) {
  localStorage.setItem("stockData", JSON.stringify(stock));
}

function renderStock() {
  const stockTable = document.getElementById("stockTable");
  const stock = getStock();

  if (stock.length === 0) {
    stockTable.innerHTML = `<tr><td colspan="5" style="text-align:center;">No stock available</td></tr>`;
    return;
  }

  const headers = ["Product", "Quantity", "Unit Price", "Total Value", "Actions"];
  const rows = stock.map((item, i) => `
    <tr>
      <td>${item.name}</td>
      <td>${item.quantity}</td>
      <td>${item.price.toLocaleString()} UGX</td>
      <td>${(item.quantity * item.price).toLocaleString()} UGX</td>
      <td>
        <button class="editBtn" data-index="${i}">✏️ Edit</button>
        <button class="deleteBtn" data-index="${i}">🗑️ Delete</button>
      </td>
    </tr>
  `).join('');

  stockTable.innerHTML = `
    <thead><tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr></thead>
    <tbody>${rows}</tbody>
  `;

  // Attach actions
  document.querySelectorAll(".deleteBtn").forEach(btn =>
    btn.addEventListener("click", () => {
      const index = btn.getAttribute("data-index");
      if (confirm("Delete this stock item?")) {
        let stock = getStock();
        stock.splice(index, 1);
        saveStock(stock);
        renderStock();
      }
    })
  );

  document.querySelectorAll(".editBtn").forEach(btn =>
    btn.addEventListener("click", () => {
      const index = btn.getAttribute("data-index");
      let stock = getStock();
      const item = stock[index];

      document.getElementById("stockId").value = index;
      document.getElementById("name").value = item.name;
      document.getElementById("quantity").value = item.quantity;
      document.getElementById("price").value = item.price;
    })
  );
}

// Handle Add/Edit
document.getElementById("stockForm").addEventListener("submit", e => {
  e.preventDefault();
  const id = document.getElementById("stockId").value;
  const name = document.getElementById("name").value;
  const quantity = parseInt(document.getElementById("quantity").value, 10);
  const price = parseFloat(document.getElementById("price").value);

  let stock = getStock();

  if (id) {
    // Edit
    stock[id] = { name, quantity, price };
  } else {
    // Add
    stock.push({ name, quantity, price });
  }

  saveStock(stock);
  e.target.reset();
  document.getElementById("stockId").value = "";
  renderStock();
});
