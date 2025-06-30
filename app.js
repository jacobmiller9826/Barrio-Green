const clientId = "05a0325af41e925b0e2ff52a16efa407";
const contractAddress = "0xC52a002023ABA42B4490f625Df6434fc26E425c8";

// Modal elements
const modal = document.getElementById("modal");
const modalMessage = document.getElementById("modal-message");
const modalClose = document.getElementById("modal-close");

// Language & mode toggles
const langToggle = document.getElementById("lang-toggle");
const modeToggle = document.getElementById("mode-toggle");

let currentLang = "EN";

// Utility: Show modal with message
function showModal(message) {
  modalMessage.textContent = message;
  modal.style.display = "flex";
}

modalClose.addEventListener("click", () => {
  modal.style.display = "none";
});

// LocalStorage keys
const BALANCE_KEY = "barrioGreen_TUC_balance";

// Initialize balance if not present
if (!localStorage.getItem(BALANCE_KEY)) {
  localStorage.setItem(BALANCE_KEY, "0");
}

// Get balance as number
function getBalance() {
  return parseFloat(localStorage.getItem(BALANCE_KEY)) || 0;
}

// Save balance
function setBalance(amount) {
  localStorage.setItem(BALANCE_KEY, amount.toFixed(2));
}

// Update balance display on dashboard or anywhere balance element exists
function updateBalanceDisplay() {
  const balanceEls = document.querySelectorAll("#balance");
  balanceEls.forEach((el) => {
    el.textContent = getBalance().toFixed(2) + " TUC";
  });
}

// Language toggle handler
function toggleLanguage() {
  if (currentLang === "EN") {
    currentLang = "ES";
    langToggle.textContent = "EN";
    // Update static texts to Spanish
    document.getElementById("app-title").textContent = "Barrio Verde";
    document.getElementById("app-subtitle").textContent = "Recompensas Comunitarias de Arizona";

    // Update buttons and placeholders if present
    document.querySelectorAll("button").forEach((btn) => {
      if (btn.id === "lang-toggle") return;
      if (btn.id === "mode-toggle") return;

      if (btn.textContent.includes("Exchange")) btn.textContent = btn.textContent.replace("Exchange", "Intercambiar");
      if (btn.textContent.includes("Redeem")) btn.textContent = btn.textContent.replace("Redeem", "Canjear");
      if (btn.textContent.includes("Mint")) btn.textContent = btn.textContent.replace("Mint", "Generar");
      if (btn.textContent.includes("Go to Dashboard")) btn.textContent = "Ir al Panel";
      if (btn.textContent.includes("Dashboard")) btn.textContent = "Panel";
      if (btn.textContent.includes("Rewards")) btn.textContent = "Recompensas";
      if (btn.textContent.includes("Admin")) btn.textContent = "Admin";
    });

    document.querySelectorAll("input").forEach((input) => {
      if (input.placeholder.includes("Plastic")) input.placeholder = "Créditos de plástico (kg)";
      if (input.placeholder.includes("Solar")) input.placeholder = "Créditos solares (kWh)";
      if (input.placeholder.includes("Recipient")) input.placeholder = "Dirección destinataria";
      if (input.placeholder.includes("Amount")) input.placeholder = "Cantidad a generar";
    });
  } else {
    currentLang = "EN";
    langToggle.textContent = "ES";
    // Update static texts back to English
    document.getElementById("app-title").textContent = "Barrio Green";
    document.getElementById("app-subtitle").textContent = "Arizona Community Rewards";

    // Reset buttons and placeholders
    document.querySelectorAll("button").forEach((btn) => {
      if (btn.id === "lang-toggle") return;
      if (btn.id === "mode-toggle") return;

      if (btn.textContent.includes("Intercambiar")) btn.textContent = btn.textContent.replace("Intercambiar", "Exchange");
      if (btn.textContent.includes("Canjear")) btn.textContent = btn.textContent.replace("Canjear", "Redeem");
      if (btn.textContent.includes("Generar")) btn.textContent = btn.textContent.replace("Generar", "Mint");
      if (btn.textContent.includes("Ir al Panel")) btn.textContent = "Go to Dashboard";
      if (btn.textContent.includes("Panel")) btn.textContent = "Dashboard";
      if (btn.textContent.includes("Recompensas")) btn.textContent = "Rewards";
      if (btn.textContent.includes("Admin")) btn.textContent = "Admin";
    });

    document.querySelectorAll("input").forEach((input) => {
      if (input.placeholder.includes("Créditos de plástico")) input.placeholder = "Plastic credits (kg)";
      if (input.placeholder.includes("Créditos solares")) input.placeholder = "Solar credits (kWh)";
      if (input.placeholder.includes("Dirección destinataria")) input.placeholder = "Recipient Address";
      if (input.placeholder.includes("Cantidad a generar")) input.placeholder = "Amount to Mint";
    });
  }
}

// Dark mode toggle handler
function toggleDarkMode() {
  document.body.classList.toggle("dark");
}

// Exchange plastic credits -> add TUC
function exchangePlastic() {
  const plasticInput = document.getElementById("plastic-input");
  let plasticAmount = parseFloat(plasticInput.value);
  if (isNaN(plasticAmount) || plasticAmount <= 0) {
    showModal(currentLang === "EN" ? "Please enter a valid plastic credit amount." : "Por favor, ingrese una cantidad válida de créditos de plástico.");
    return;
  }
  // For example: 1 kg plastic = 2 TUC tokens
  const tucEarned = plasticAmount * 2;

  const newBalance = getBalance() + tucEarned;
  setBalance(newBalance);
  updateBalanceDisplay();
  plasticInput.value = "";

  showModal(
    currentLang === "EN"
      ? `Exchanged ${plasticAmount} kg plastic for ${tucEarned.toFixed(2)} TUC!`
      : `Intercambiado ${plasticAmount} kg de plástico por ${tucEarned.toFixed(2)} TUC!`
  );
}

// Exchange solar credits -> add TUC
function exchangeSolar() {
  const solarInput = document.getElementById("solar-input");
  let solarAmount = parseFloat(solarInput.value);
  if (isNaN(solarAmount) || solarAmount <= 0) {
    showModal(currentLang === "EN" ? "Please enter a valid solar credit amount." : "Por favor, ingrese una cantidad válida de créditos solares.");
    return;
  }
  // Example: 1 kWh solar = 1.5 TUC tokens
  const tucEarned = solarAmount * 1.5;

  const newBalance = getBalance() + tucEarned;
  setBalance(newBalance);
  updateBalanceDisplay();
  solarInput.value = "";

  showModal(
    currentLang === "EN"
      ? `Exchanged ${solarAmount} kWh solar for ${tucEarned.toFixed(2)} TUC!`
      : `Intercambiado ${solarAmount} kWh solar por ${tucEarned.toFixed(2)} TUC!`
  );
}

// Redeem a reward, subtract balance
function redeemReward(cost, rewardName) {
  const balance = getBalance();
  if (balance < cost) {
    showModal(currentLang === "EN" ? "Insufficient TUC balance." : "Saldo TUC insuficiente.");
    return;
  }
  const newBalance = balance - cost;
  setBalance(newBalance);
  updateBalanceDisplay();

  showModal(
    currentLang === "EN"
      ? `Redeemed ${rewardName} for ${cost} TUC!`
      : `Canjeado ${rewardName} por ${cost} TUC!`
  );
}

// Admin mint tokens (adds to balance)
function mintTokens() {
  const mintAddressInput = document.getElementById("mint-address");
  const mintAmountInput = document.getElementById("mint-amount");
  const address = mintAddressInput.value.trim();
  const amount = parseFloat(mintAmountInput.value);

  if (!address) {
    showModal(currentLang === "EN" ? "Please enter a recipient address." : "Por favor ingrese una dirección destinataria.");
    return;
  }
  if (isNaN(amount) || amount <= 0) {
    showModal(currentLang === "EN" ? "Please enter a valid amount to mint." : "Por favor ingrese una cantidad válida para generar.");
    return;
  }

  // For simulation, mint tokens to local balance
  const newBalance = getBalance() + amount;
  setBalance(newBalance);
  updateBalanceDisplay();

  mintAddressInput.value = "";
  mintAmountInput.value = "";

  showModal(
    currentLang === "EN"
      ? `Minted ${amount.toFixed(2)} TUC to ${address}!`
      : `Generado ${amount.toFixed(2)} TUC a ${address}!`
  );
}

// Setup event listeners & initialize UI
function setup() {
  updateBalanceDisplay();

  if (langToggle) langToggle.addEventListener("click", toggleLanguage);
  if (modeToggle) modeToggle.addEventListener("click", toggleDarkMode);

  const plasticBtn = document.getElementById("plastic-exchange-btn");
  if (plasticBtn) plasticBtn.addEventListener("click", exchangePlastic);

  const solarBtn = document.getElementById("solar-exchange-btn");
  if (solarBtn) solarBtn.addEventListener("click", exchangeSolar);

  const mintBtn = document.getElementById("mint-button");
  if (mintBtn) mintBtn.addEventListener("click", mintTokens);

  // Redeem buttons on rewards page
  document.querySelectorAll(".redeem-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const cost = parseFloat(btn.getAttribute("data-cost"));
      const rewardName = btn.parentElement.querySelector("h3")?.textContent || "Reward";
      redeemReward(cost, rewardName);
    });
  });
}

// Run setup on DOM ready
document.addEventListener("DOMContentLoaded", setup);
