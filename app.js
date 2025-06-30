// Import if using thirdweb
import { createThirdwebClient } from "https://esm.sh/@thirdweb-dev/react-core@0.16.1";
import { createLocalWallet } from "https://esm.sh/@thirdweb-dev/wallets@0.16.1";
import { getContract } from "https://esm.sh/@thirdweb-dev/sdk@0.16.1/evm";
import { defineChain } from "https://esm.sh/@thirdweb-dev/chains@0.16.1";

// THIRDWEB SETTINGS
const clientId = "05a0325af41e925b0e2ff52a16efa407";
const contractAddress = "0xC52a002023ABA42B4490f625Df6434fc26E425c8";
const chain = defineChain("sepolia");

const client = createThirdwebClient({ clientId });
const wallet = createLocalWallet();

let currentLang = localStorage.getItem("lang") || "EN";
let darkMode = localStorage.getItem("dark") === "true";

// Get modal
const modal = document.getElementById("modal");
const modalMessage = document.getElementById("modal-message");
const modalClose = document.getElementById("modal-close");

function showModal(message) {
  if (modal && modalMessage && modalClose) {
    modalMessage.textContent = message;
    modal.classList.remove("hidden");
    modalClose.onclick = () => modal.classList.add("hidden");
  }
}

// Apply dark mode if remembered
if (darkMode) document.body.classList.add("dark");

// Language toggle
const langToggle = document.getElementById("lang-toggle");
if (langToggle) {
  langToggle.textContent = currentLang === "EN" ? "ES" : "EN";
  langToggle.addEventListener("click", () => {
    currentLang = currentLang === "EN" ? "ES" : "EN";
    localStorage.setItem("lang", currentLang);
    langToggle.textContent = currentLang === "EN" ? "ES" : "EN";
    updateLanguage();
  });
}

// Dark mode toggle
const modeToggle = document.getElementById("mode-toggle");
if (modeToggle) {
  modeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    darkMode = document.body.classList.contains("dark");
    localStorage.setItem("dark", darkMode);
  });
}

// Update text content for language
function updateLanguage() {
  const title = document.getElementById("app-title");
  const subtitle = document.getElementById("app-subtitle");
  if (title) title.textContent = currentLang === "EN" ? "Barrio Green" : "Barrio Verde";
  if (subtitle) subtitle.textContent = currentLang === "EN"
    ? "Arizona Community Rewards"
    : "Recompensas Comunitarias de Arizona";
}
updateLanguage();

// Wallet
let connectedAddress = localStorage.getItem("walletAddress") || null;

async function initWallet() {
  if (!connectedAddress) {
    await wallet.connect();
    connectedAddress = await wallet.getAddress();
    localStorage.setItem("walletAddress", connectedAddress);
  }
  updateAddressDisplay();
  fetchBalance();
}

// Address display
async function updateAddressDisplay() {
  const addr = document.getElementById("user-address");
  if (addr && connectedAddress) {
    addr.textContent = connectedAddress;
  }
}

// Fetch balance
async function fetchBalance() {
  try {
    const balanceDisplay = document.getElementById("balance");
    if (balanceDisplay) {
      balanceDisplay.textContent = currentLang === "EN" ? "Loading..." : "Cargando...";
      const contract = await getContract({ client, address: contractAddress, chain });
      const balance = await contract.erc20.balanceOf(connectedAddress);
      balanceDisplay.textContent = `${balance.displayValue} TUC`;
    }
  } catch (err) {
    console.error(err);
  }
}

// Mint tokens
const mintButton = document.getElementById("mint-button");
if (mintButton) {
  mintButton.addEventListener("click", async () => {
    const mintAddress = document.getElementById("mint-address").value.trim();
    const mintAmount = document.getElementById("mint-amount").value.trim();

    if (!mintAddress || !mintAmount) {
      showModal(currentLang === "EN" ? "Please enter address and amount." : "Por favor ingrese dirección y cantidad.");
      return;
    }

    try {
      const contract = await getContract({ client, address: contractAddress, chain });
      await contract.erc20.mintTo(mintAddress, mintAmount);
      showModal(currentLang === "EN" ? "Mint successful!" : "¡Generación exitosa!");
    } catch (err) {
      console.error(err);
      showModal(currentLang === "EN" ? "Error minting." : "Error al generar.");
    }
  });
}

// Rewards redeem buttons
document.querySelectorAll(".redeem-btn").forEach(btn =>
  btn.addEventListener("click", () => {
    showModal(currentLang === "EN"
      ? "Redeemed! Enjoy your reward."
      : "¡Canjeado! Disfruta tu recompensa.");
  })
);

// Exchange button
const exchangeButton = document.getElementById("exchange-button");
if (exchangeButton) {
  exchangeButton.addEventListener("click", () => {
    const amount = document.getElementById("exchange-amount").value.trim();
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      showModal(currentLang === "EN"
        ? "Enter a valid amount to exchange."
        : "Ingrese una cantidad válida para intercambiar.");
    } else {
      showModal(currentLang === "EN"
        ? `Exchanged ${amount} credits for TUC tokens!`
        : `¡Intercambiados ${amount} créditos por tokens TUC!`);
    }
  });
}

// Try to init wallet if on dashboard
if (document.getElementById("user-address")) {
  initWallet();
}
