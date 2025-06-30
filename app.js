// app.js — Shared script for all pages

// Language & dark mode state & persistence
let currentLang = localStorage.getItem("barrio-lang") || "EN";
let darkMode = localStorage.getItem("barrio-dark") === "true";

const langToggle = document.getElementById("lang-toggle");
const modeToggle = document.getElementById("mode-toggle");

const modal = document.getElementById("modal");
const modalMessage = document.getElementById("modal-message");
const modalClose = document.getElementById("modal-close");

// Navigation buttons
const navButtons = document.querySelectorAll(".nav-button");

// Translation dictionary (expand as needed)
const texts = {
  EN: {
    home: {
      welcomeTitle: "Welcome to Barrio Green",
      welcomeText: "Use the navigation above to explore the app.",
    },
    dashboard: {
      userLabel: "User wallet address:",
      balanceLabel: "Balance:",
      connectWallet: "Connect Wallet",
      walletConnected: "Wallet connected (simulated)!",
      balance: "0 TUC",
    },
    rewards: {
      rewardsTitle: "Rewards Catalog",
      baseball: "Baseball Tickets",
      baseballCost: "Cost: 50 TUC",
      farmersMarket: "Farmers Market Discount",
      farmersCost: "Cost: 30 TUC",
      redeemed: "Redeemed successfully (simulated)!",
    },
    exchange: {
      exchangeTitle: "Exchange Credits",
      exchangeButton: "Exchange",
      exchangeSuccess: "Exchange successful (simulated)!",
      invalidAmount: "Please enter a valid amount to exchange.",
    },
    admin: {
      adminTitle: "Admin Mint Tokens",
      mintAddressPlaceholder: "Recipient Address",
      mintAmountPlaceholder: "Amount",
      mintButton: "Mint Tokens",
      mintSuccess: "Mint successful (simulated)!",
      mintError: "Please enter valid address and amount.",
    },
    help: {
      helpTitle: "Help & FAQ",
      helpText: "Coming soon. Ask your admin for support!",
    },
    modalClose: "Close",
  },
  ES: {
    home: {
      welcomeTitle: "Bienvenido a Barrio Verde",
      welcomeText: "Usa la navegación para explorar la aplicación.",
    },
    dashboard: {
      userLabel: "Dirección de billetera del usuario:",
      balanceLabel: "Saldo:",
      connectWallet: "Conectar billetera",
      walletConnected: "¡Billetera conectada (simulada)!",
      balance: "0 TUC",
    },
    rewards: {
      rewardsTitle: "Catálogo de Recompensas",
      baseball: "Entradas de Béisbol",
      baseballCost: "Costo: 50 TUC",
      farmersMarket: "Descuento en Mercado de Agricultores",
      farmersCost: "Costo: 30 TUC",
      redeemed: "¡Canjeado exitosamente (simulado)!",
    },
    exchange: {
      exchangeTitle: "Intercambiar Créditos",
      exchangeButton: "Intercambiar",
      exchangeSuccess: "¡Intercambio exitoso (simulado)!",
      invalidAmount: "Por favor ingrese una cantidad válida para intercambiar.",
    },
    admin: {
      adminTitle: "Generar Tokens (Admin)",
      mintAddressPlaceholder: "Dirección del destinatario",
      mintAmountPlaceholder: "Cantidad",
      mintButton: "Generar Tokens",
      mintSuccess: "¡Generación exitosa (simulada)!",
      mintError: "Por favor ingrese dirección y cantidad válidas.",
    },
    help: {
      helpTitle: "Ayuda y Preguntas Frecuentes",
      helpText: "Próximamente. ¡Pregunte a su administrador para ayuda!",
    },
    modalClose: "Cerrar",
  },
};

// Initialize UI text based on language
function updateTexts() {
  const lang = currentLang;
  // Header
  document.getElementById("app-title").textContent =
    lang === "EN" ? "Barrio Green" : "Barrio Verde";
  document.getElementById("app-subtitle").textContent =
    lang === "EN"
      ? "Arizona Community Rewards"
      : "Recompensas Comunitarias de Arizona";

  // Nav buttons active states handled via CSS, no text changes needed here

  // Page-specific text
  const pathname = window.location.pathname;
  if (pathname.endsWith("index.html") || pathname === "/") {
    document.getElementById("welcome-title").textContent =
      texts[lang].home.welcomeTitle;
    document.getElementById("welcome-text").textContent =
      texts[lang].home.welcomeText;
  } else if (pathname.endsWith("dashboard.html")) {
    document.getElementById("user-label").textContent =
      texts[lang].dashboard.userLabel;
    document.getElementById("balance-label").textContent =
      texts[lang].dashboard.balanceLabel;
    document.getElementById("connect-wallet").textContent =
      texts[lang].dashboard.connectWallet;
    document.getElementById("balance").textContent = texts[lang].dashboard.balance;
  } else if (pathname.endsWith("rewards.html")) {
    document.getElementById("rewards-title").textContent =
      texts[lang].rewards.rewardsTitle;
    const rewards = document.querySelectorAll(".reward-item h3");
    const rewardsCost = document.querySelectorAll(".reward-item p");
    rewards[0].textContent = texts[lang].rewards.baseball;
    rewardsCost[0].textContent = texts[lang].rewards.baseballCost;
    rewards[1].textContent = texts[lang].rewards.farmersMarket;
    rewardsCost[1].textContent = texts[lang].rewards.farmersCost;
    const redeemBtns = document.querySelectorAll(".redeem-btn");
    redeemBtns.forEach(btn => {
      btn.textContent = lang === "EN" ? "Redeem" : "Canjear";
    });
  } else if (pathname.endsWith("exchange.html")) {
    document.getElementById("exchange-title").textContent =
      texts[lang].exchange.exchangeTitle;
    document.getElementById("exchange-button").textContent =
      texts[lang].exchange.exchangeButton;
  } else if (pathname.endsWith("admin.html")) {
    document.getElementById("admin-title").textContent =
      texts[lang].admin.adminTitle;
    document.getElementById("mint-address").placeholder =
      texts[lang].admin.mintAddressPlaceholder;
    document.getElementById("mint-amount").placeholder =
      texts[lang].admin.mintAmountPlaceholder;
    document.getElementById("mint-button").textContent =
      texts[lang].admin.mintButton;
  } else if (pathname.endsWith("help.html")) {
    document.getElementById("help-title").textContent =
      texts[lang].help.helpTitle;
    document.getElementById("help-text").textContent =
      texts[lang].help.helpText;
  }

  langToggle.textContent = lang === "EN" ? "ES" : "EN";
  modalClose.textContent = texts[lang].modalClose;
}

// Toggle dark mode UI
function updateDarkMode() {
  if (darkMode) {
    document.body.classList.add("dark");
    modeToggle.textContent = "☀️";
  } else {
    document.body.classList.remove("dark");
    modeToggle.textContent = "🌙";
  }
}

// Show modal with message
function showModal(message) {
  modalMessage.textContent = message;
  modal.classList.remove("hidden");
}

// Hide modal
function hideModal() {
  modal.classList.add("hidden");
  modalMessage.textContent = "";
}

// Simulated wallet and blockchain logic

let walletConnected = false;
let userAddress = "0x1234...ABCD";
let userBalance = 100;

// Connect wallet simulation
function connectWallet() {
  walletConnected = true;
  // Update dashboard
  const addressEl = document.getElementById("user-address");
  const balanceEl = document.getElementById("balance");
  if (addressEl) addressEl.textContent = userAddress;
  if (balanceEl) balanceEl.textContent = `${userBalance} TUC`;
  showModal(
    currentLang === "EN"
      ? "Wallet connected (simulated)!"
      : "¡Billetera conectada (simulada)!"
  );
}

// Redeem reward simulation
function redeemReward(cost, name) {
  if (!walletConnected) {
    showModal(
      currentLang === "EN"
        ? "Please connect your wallet first."
        : "Por favor conecta tu billetera primero."
    );
    return;
  }
  if (userBalance < cost) {
    showModal(
      currentLang === "EN"
        ? "Insufficient balance to redeem."
        : "Saldo insuficiente para canjear."
    );
    return;
  }
  userBalance -= cost;
  const balanceEl = document.getElementById("balance");
  if (balanceEl) balanceEl.textContent = `${userBalance} TUC`;
  showModal(
    currentLang === "EN"
      ? `Successfully redeemed: ${name}`
      : `Canjeado exitosamente: ${name}`
  );
}

// Exchange credits simulation
function exchangeCredits() {
  if (!walletConnected) {
    showModal(
      currentLang === "EN"
        ? "Please connect your wallet first."
        : "Por favor conecta tu billetera primero."
    );
    return;
  }
  const input = document.getElementById("exchange-amount");
  const amount = Number(input?.value);
  if (!amount || amount <= 0) {
    showModal(
      currentLang === "EN"
        ? texts.EN.exchange.invalidAmount
        : texts.ES.exchange.invalidAmount
    );
    return;
  }
  if (userBalance < amount) {
    showModal(
      currentLang === "EN"
        ? "Insufficient balance to exchange."
        : "Saldo insuficiente para intercambiar."
    );
    return;
  }
  userBalance -= amount;
  const balanceEl = document.getElementById("balance");
  if (balanceEl) balanceEl.textContent = `${userBalance} TUC`;
  showModal(
    currentLang === "EN"
      ? `Exchanged ${amount} TUC successfully!`
      : `¡Intercambiado ${amount} TUC exitosamente!`
  );
  if (input) input.value = "";
}

// Mint tokens simulation
function mintTokens() {
  if (!walletConnected) {
    showModal(
      currentLang === "EN"
        ? "Please connect your wallet first."
        : "Por favor conecta tu billetera primero."
    );
    return;
  }
  const addressInput = document.getElementById("mint-address");
  const amountInput = document.getElementById("mint-amount");
  const address = addressInput?.value.trim();
  const amount = Number(amountInput?.value);
  if (!address || !amount || amount <= 0) {
    showModal(
      currentLang === "EN"
        ? texts.EN.admin.mintError
        : texts.ES.admin.mintError
    );
    return;
  }
  // Simulate mint by adding amount to userBalance if minting to self
  if (address === userAddress) {
    userBalance += amount;
    const balanceEl = document.getElementById("balance");
    if (balanceEl) balanceEl.textContent = `${userBalance} TUC`;
  }
  showModal(
    currentLang === "EN"
      ? texts.EN.admin.mintSuccess
      : texts.ES.admin.mintSuccess
  );
  if (addressInput) addressInput.value = "";
  if (amountInput) amountInput.value = "";
}

// Setup event listeners
function setupEventListeners() {
  if (langToggle) {
    langToggle.addEventListener("click", () => {
      currentLang = currentLang === "EN" ? "ES" : "EN";
      localStorage.setItem("barrio-lang", currentLang);
      updateTexts();
    });
  }

  if (modeToggle) {
    modeToggle.addEventListener("click", () => {
      darkMode = !darkMode;
      localStorage.setItem("barrio-dark", darkMode);
      updateDarkMode();
    });
  }

  if (modalClose) {
    modalClose.addEventListener("click", hideModal);
  }

  // Dashboard wallet connect button
  const connectBtn = document.getElementById("connect-wallet");
  if (connectBtn) {
    connectBtn.addEventListener("click", connectWallet);
  }

  // Rewards redeem buttons
  const redeemBtns = document.querySelectorAll(".redeem-btn");
  redeemBtns.forEach((btn, i) => {
    btn.addEventListener("click", () => {
      if (i === 0) redeemReward(50, texts[currentLang].rewards.baseball);
      else if (i === 1) redeemReward(30, texts[currentLang].rewards.farmersMarket);
    });
  });

  // Exchange button
  const exchangeBtn = document.getElementById("exchange-button");
  if (exchangeBtn) {
    exchangeBtn.addEventListener("click", exchangeCredits);
  }

  // Mint button
  const mintBtn = document.getElementById("mint-button");
  if (mintBtn) {
    mintBtn.addEventListener("click", mintTokens);
  }
}

// Initialize app on load
function initApp() {
  updateTexts();
  updateDarkMode();
  setupEventListeners();

  // Show wallet address and balance if on dashboard
  if (window.location.pathname.endsWith("dashboard.html")) {
    const addressEl = document.getElementById("user-address");
    const balanceEl = document.getElementById("balance");
    if (walletConnected) {
      if (addressEl) addressEl.textContent = userAddress;
      if (balanceEl) balanceEl.textContent = `${userBalance} TUC`;
    } else {
      if (addressEl) addressEl.textContent = "Not connected";
      if (balanceEl) balanceEl.textContent = "0 TUC";
    }
  }
}

window.addEventListener("DOMContentLoaded", initApp);
