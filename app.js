// Import Thirdweb SDK modules for blockchain (keep if your environment supports it)
import { createThirdwebClient } from "https://esm.sh/@thirdweb-dev/react-core@0.16.1";
import { createLocalWallet } from "https://esm.sh/@thirdweb-dev/wallets@0.16.1";
import { getContract } from "https://esm.sh/@thirdweb-dev/sdk@0.16.1/evm";
import { defineChain } from "https://esm.sh/@thirdweb-dev/chains@0.16.1";

const clientId = "05a0325af41e925b0e2ff52a16efa407";
const contractAddress = "0xC52a002023ABA42B4490f625Df6434fc26E425c8";
const chain = defineChain("sepolia");

const client = createThirdwebClient({ clientId });
const wallet = createLocalWallet();

let currentLang = localStorage.getItem("lang") || "EN";
let darkMode = localStorage.getItem("dark") === "true";

const modal = document.getElementById("modal");
const modalMessage = document.getElementById("modal-message");
const modalClose = document.getElementById("modal-close");

function showModal(message) {
  if (modal && modalMessage && modalClose) {
    modalMessage.textContent = message;
    modal.classList.remove("hidden");
    modalClose.focus();
  }
}

function closeModal() {
  if (modal) {
    modal.classList.add("hidden");
  }
}

// Close modal on click of close button or ESC key
modalClose?.addEventListener("click", closeModal);
window.addEventListener("keydown", e => {
  if (e.key === "Escape") closeModal();
});

// Dark mode toggle button
const modeToggle = document.getElementById("mode-toggle");
if (modeToggle) {
  modeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    darkMode = document.body.classList.contains("dark");
    localStorage.setItem("dark", darkMode);
  });
  if (darkMode) document.body.classList.add("dark");
}

// Language toggle button
const langToggle = document.getElementById("lang-toggle");
if (langToggle) {
  langToggle.textContent = currentLang === "EN" ? "ES" : "EN";
  langToggle.addEventListener("click", () => {
    currentLang = currentLang === "EN" ? "ES" : "EN";
    localStorage.setItem("lang", currentLang);
    langToggle.textContent = currentLang === "EN" ? "ES" : "EN";
    updateLanguageText();
  });
}

function updateLanguageText() {
  const title = document.getElementById("app-title");
  const subtitle = document.getElementById("app-subtitle");
  if (title)
    title.textContent = currentLang === "EN" ? "Barrio Green" : "Barrio Verde";
  if (subtitle)
    subtitle.textContent =
      currentLang === "EN"
        ? "Arizona Community Rewards"
        : "Recompensas Comunitarias de Arizona";
}
updateLanguageText();

// Navigation buttons
const navDashboard = document.getElementById("nav-dashboard");
const navRewards = document.getElementById("nav-rewards");
const navExchange = document.getElementById("nav-exchange");
const navAdmin = document.getElementById("nav-admin");
const navHelp = document.getElementById("nav-help");
const content = document.getElementById("content");

// Simple page content for demo purposes
const pages = {
  dashboard: `
    <section class="card">
      <h2>${currentLang === "EN" ? "Dashboard" : "Tablero"}</h2>
      <p>${currentLang === "EN" ? "User wallet address:" : "Dirección del usuario:"} <span id="user-address">Not connected</span></p>
      <p>${currentLang === "EN" ? "Balance:" : "Saldo:"} <span id="balance">0 TUC</span></p>
      <button id="connect-wallet" class="nav-button">${currentLang === "EN" ? "Connect Wallet" : "Conectar Billetera"}</button>
    </section>
  `,
  rewards: `
    <section class="card">
      <h2>${currentLang === "EN" ? "Rewards Catalog" : "Catálogo de Recompensas"}</h2>
      <div class="reward-item">
        <h3>${currentLang === "EN" ? "Baseball Tickets" : "Boletos de Béisbol"}</h3>
        <p>${currentLang === "EN" ? "Cost: 50 TUC" : "Costo: 50 TUC"}</p>
        <button class="redeem-btn nav-button">${currentLang === "EN" ? "Redeem" : "Canjear"}</button>
      </div>
      <div class="reward-item">
        <h3>${currentLang === "EN" ? "Farmers Market Discount" : "Descuento en Mercado de Agricultores"}</h3>
        <p>${currentLang === "EN" ? "Cost: 30 TUC" : "Costo: 30 TUC"}</p>
        <button class="redeem-btn nav-button">${currentLang === "EN" ? "Redeem" : "Canjear"}</button>
      </div>
    </section>
  `,
  exchange: `
    <section class="card">
      <h2>${currentLang === "EN" ? "Exchange Credits" : "Intercambiar Créditos"}</h2>
      <input type="number" id="exchange-amount" placeholder="${currentLang === "EN" ? "Amount to exchange" : "Cantidad a intercambiar"}" min="1" />
      <button id="exchange-button" class="nav-button">${currentLang === "EN" ? "Exchange" : "Intercambiar"}</button>
    </section>
  `,
  admin: `
    <section class="card">
      <h2>${currentLang === "EN" ? "Admin Mint Tokens" : "Administración: Generar Tokens"}</h2>
      <input type="text" id="mint-address" placeholder="${currentLang === "EN" ? "Recipient Address" : "Dirección del destinatario"}" />
      <input type="number" id="mint-amount" placeholder="${currentLang === "EN" ? "Amount" : "Cantidad"}" min="1" />
      <button id="mint-button" class="nav-button">${currentLang === "EN" ? "Mint Tokens" : "Generar Tokens"}</button>
    </section>
  `,
  help: `
    <section class="card">
      <h2>${currentLang === "EN" ? "Help & FAQ" : "Ayuda y Preguntas Frecuentes"}</h2>
      <p>${currentLang === "EN" ? "Coming soon. Ask your admin for support!" : "Próximamente. ¡Pregunte a su administrador para obtener ayuda!"}</p>
    </section>
  `
};

// Navigation click handlers
function loadPage(section) {
  content.innerHTML = pages[section];
  setTimeout(() => attachPageEvents(section), 100);
}

function attachPageEvents(section) {
  if (section === "dashboard") {
    document.getElementById("connect-wallet")?.addEventListener("click", () => {
      showModal(currentLang === "EN" ? "Wallet connected (simulated)!" : "¡Billetera conectada (simulada)!");
    });
  }
  if (section === "rewards") {
    document.querySelectorAll(".redeem-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        showModal(currentLang === "EN" ? "Redeemed successfully (simulated)!" : "¡Canjeado exitosamente (simulado)!");
      });
    });
  }
  if (section === "exchange") {
    document.getElementById("exchange-button")?.addEventListener("click", () => {
      showModal(currentLang === "EN" ? "Exchange successful (simulated)!" : "¡Intercambio exitoso (simulado)!");
    });
  }
  if (section === "admin") {
    document.getElementById("mint-button")?.addEventListener("click", () => {
      showModal(currentLang === "EN" ? "Mint successful (simulated)!" : "¡Generación exitosa (simulada)!");
    });
  }
}

// Attach navigation
navDashboard?.addEventListener("click", () => loadPage("dashboard"));
navRewards?.addEventListener("click", () => loadPage("rewards"));
navExchange?.addEventListener("click", () => loadPage("exchange"));
navAdmin?.addEventListener("click", () => loadPage("admin"));
navHelp?.addEventListener("click", () => loadPage("help"));

// Load default page
loadPage("dashboard");
