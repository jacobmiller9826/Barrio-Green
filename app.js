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

// Modal
const modal = document.getElementById("modal");
const modalMessage = document.getElementById("modal-message");
const modalClose = document.getElementById("modal-close");

function showModal(message) {
  modalMessage.textContent = message;
  modal.classList.remove("hidden");
}

modalClose?.addEventListener("click", () => {
  modal.classList.add("hidden");
});

// Dark mode
document.getElementById("mode-toggle")?.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// Language toggle
document.getElementById("lang-toggle")?.addEventListener("click", () => {
  currentLang = currentLang === "EN" ? "ES" : "EN";
  document.getElementById("lang-toggle").textContent = currentLang === "EN" ? "ES" : "EN";
  document.getElementById("app-title").textContent = currentLang === "EN" ? "Barrio Green" : "Barrio Verde";
  document.getElementById("app-subtitle").textContent = currentLang === "EN"
    ? "Arizona Community Rewards" : "Recompensas Comunitarias de Arizona";
});

// Wallet connect and balance
async function connectWalletAndLoad() {
  try {
    await wallet.connect();
    const address = await wallet.getAddress();
    document.getElementById("user-address").textContent = address;

    const contract = await getContract({ client, address: contractAddress, chain });
    const balance = await contract.erc20.balanceOf(address);
    document.getElementById("balance").textContent = `${balance.displayValue} TUC`;
  } catch (err) {
    console.error(err);
    document.getElementById("balance").textContent = "Error";
  }
}

// Mint
document.getElementById("mint-button")?.addEventListener("click", async () => {
  const address = document.getElementById("mint-address").value.trim();
  const amount = document.getElementById("mint-amount").value.trim();
  try {
    const contract = await getContract({ client, address: contractAddress, chain });
    await contract.erc20.mintTo(address, amount);
    showModal(currentLang === "EN" ? "Mint Successful!" : "¡Generación exitosa!");
  } catch (err) {
    console.error(err);
    showModal(currentLang === "EN" ? "Error minting." : "Error al generar.");
  }
});

// Rewards
document.querySelectorAll(".redeem-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    showModal(currentLang === "EN" ? "Reward redeemed! 🎉" : "¡Recompensa canjeada! 🎉");
  });
});

// Exchange
document.getElementById("exchange-button")?.addEventListener("click", () => {
  showModal(currentLang === "EN" ? "Exchange completed! ✅" : "¡Intercambio completado! ✅");
});

// Init dashboard
if (document.getElementById("user-address")) {
  connectWalletAndLoad();
}
