import { createThirdwebClient } from "https://esm.sh/@thirdweb-dev/react-core@0.16.1";
import { createLocalWallet } from "https://esm.sh/@thirdweb-dev/wallets@0.16.1";
import { getContract } from "https://esm.sh/@thirdweb-dev/sdk@0.16.1/evm";
import { defineChain } from "https://esm.sh/@thirdweb-dev/chains@0.16.1";

const clientId = "05a0325af41e925b0e2ff52a16efa407";
const contractAddress = "0xC52a002023ABA42B4490f625Df6434fc26E425c8";
const chain = defineChain("sepolia");

const client = createThirdwebClient({ clientId });
const wallet = createLocalWallet();

let currentLang = "EN";

const modal = document.getElementById("modal");
const modalMessage = document.getElementById("modal-message");
const modalClose = document.getElementById("modal-close");

function showModal(message) {
  modalMessage.textContent = message;
  modal.classList.remove("hidden");
}

modalClose.addEventListener("click", () => {
  modal.classList.add("hidden");
});

// Language toggle
const langToggle = document.getElementById("lang-toggle");
langToggle?.addEventListener("click", () => {
  currentLang = currentLang === "EN" ? "ES" : "EN";
  langToggle.textContent = currentLang === "EN" ? "ES" : "EN";
  document.getElementById("app-title").textContent = currentLang === "EN" ? "Barrio Green" : "Barrio Verde";
  document.getElementById("app-subtitle").textContent = currentLang === "EN" ? "Arizona Community Rewards" : "Recompensas Comunitarias de Arizona";
});

// Dark mode toggle
const modeToggle = document.getElementById("mode-toggle");
modeToggle?.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// Utility to get contract instance
async function getTokenContract() {
  return getContract({ client, address: contractAddress, chain });
}

// ======================
// Dashboard page logic
// ======================
async function dashboardPageInit() {
  try {
    await wallet.connect();
    const address = await wallet.getAddress();
    const userAddressEl = document.getElementById("user-address");
    const balanceEl = document.getElementById("balance");

    if (!address) {
      userAddressEl.textContent = currentLang === "EN" ? "Wallet not connected" : "Cartera no conectada";
      balanceEl.textContent = "-";
      return;
    }

    userAddressEl.textContent = address;

    const contract = await getTokenContract();
    const balance = await contract.erc20.balanceOf(address);

    balanceEl.textContent = `${balance.displayValue} TUC`;
  } catch (err) {
    console.error(err);
    const balanceEl = document.getElementById("balance");
    if (balanceEl) balanceEl.textContent = currentLang === "EN" ? "Error loading balance." : "Error cargando saldo.";
  }
}

// ======================
// Rewards page logic
// ======================
function rewardsPageInit() {
  const redeemButtons = document.querySelectorAll(".redeem-btn");
  redeemButtons.forEach(button => {
    button.addEventListener("click", () => {
      const rewardName = button.parentElement.querySelector("h3")?.textContent || "Reward";
      const costText = button.parentElement.querySelector("p")?.textContent || "";
      showModal(
        currentLang === "EN"
          ? `You have redeemed "${rewardName}". ${costText}`
          : `Has canjeado "${rewardName}". ${costText}`
      );
      // Here you would add blockchain logic to deduct tokens, etc.
    });
  });
}

// ======================
// Admin page logic
// ======================
function adminPageInit() {
  const mintButton = document.getElementById("mint-button");
  const mintAddressInput = document.getElementById("mint-address");
  const mintAmountInput = document.getElementById("mint-amount");
  const mintStatus = document.getElementById("mint-status");

  mintButton?.addEventListener("click", async () => {
    const toAddress = mintAddressInput.value.trim();
    const amount = mintAmountInput.value.trim();

    if (!toAddress || !amount) {
      mintStatus.textContent = currentLang === "EN" ? "Please enter valid address and amount." : "Por favor, ingrese dirección y cantidad válidas.";
      return;
    }

    try {
      mintStatus.textContent = currentLang === "EN" ? "Minting tokens..." : "Generando tokens...";
      const contract = await getTokenContract();
      await contract.erc20.mintTo(toAddress, amount);
      mintStatus.textContent = currentLang === "EN" ? "Mint successful!" : "¡Generación exitosa!";
      mintAddressInput.value = "";
      mintAmountInput.value = "";
    } catch (err) {
      console.error(err);
      mintStatus.textContent = currentLang === "EN" ? "Error minting tokens." : "Error al generar tokens.";
    }
  });
}

// ======================
// Initialization
// ======================
document.addEventListener("DOMContentLoaded", () => {
  // Detect which page we are on by looking for unique elements:
  if (document.getElementById("balance")) {
    dashboardPageInit();
  }

  if (document.getElementById("rewards-list")) {
    rewardsPageInit();
  }

  if (document.getElementById("mint-button")) {
    adminPageInit();
  }
});
