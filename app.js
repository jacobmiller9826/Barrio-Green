import { createThirdwebClient } from "https://esm.sh/@thirdweb-dev/react-core@0.16.1";
import { createLocalWallet } from "https://esm.sh/@thirdweb-dev/wallets@0.16.1";
import { getContract } from "https://esm.sh/@thirdweb-dev/sdk@0.16.1/evm";
import { defineChain } from "https://esm.sh/@thirdweb-dev/chains@0.16.1";

document.addEventListener("DOMContentLoaded", () => {
  const clientId = "05a0325af41e925b0e2ff52a16efa407";
  const contractAddress = "0xC52a002023ABA42B4490f625Df6434fc26E425c8";
  const chain = defineChain("sepolia");

  const client = createThirdwebClient({ clientId });
  const wallet = createLocalWallet();

  const dashboardSection = document.getElementById("dashboard-section");
  const rewardsSection = document.getElementById("rewards-section");
  const adminSection = document.getElementById("admin-section");

  const navDashboard = document.getElementById("nav-dashboard");
  const navRewards = document.getElementById("nav-rewards");
  const navAdmin = document.getElementById("nav-admin");

  const userAddress = document.getElementById("user-address");
  const balanceDisplay = document.getElementById("balance");

  const mintAddressInput = document.getElementById("mint-address");
  const mintAmountInput = document.getElementById("mint-amount");
  const mintButton = document.getElementById("mint-button");
  const mintStatus = document.getElementById("mint-status");

  const langToggle = document.getElementById("lang-toggle");
  const modeToggle = document.getElementById("mode-toggle");

  let currentLang = "EN";

  async function init() {
    await wallet.connect();
    const address = await wallet.getAddress();
    userAddress.textContent = address;
    await fetchBalance();
  }

  async function fetchBalance() {
    try {
      balanceDisplay.textContent = "Loading...";
      const contract = await getContract({ client, address: contractAddress, chain });
      const address = await wallet.getAddress();
      const balance = await contract.erc20.balanceOf(address);
      balanceDisplay.textContent = `${balance.displayValue} TUC`;
    } catch (err) {
      console.error(err);
      balanceDisplay.textContent = "Error loading balance.";
    }
  }

  async function mintTokens() {
    try {
      mintStatus.textContent = currentLang === "EN" ? "Minting..." : "Generando...";
      const contract = await getContract({ client, address: contractAddress, chain });
      await contract.erc20.mintTo(mintAddressInput.value.trim(), mintAmountInput.value.trim());
      mintStatus.textContent = currentLang === "EN" ? "Mint successful!" : "¡Generación exitosa!";
    } catch (err) {
      console.error(err);
      mintStatus.textContent = currentLang === "EN" ? "Error minting." : "Error al generar.";
    }
  }

  function showSection(section) {
    [dashboardSection, rewardsSection, adminSection].forEach(s => s.classList.add("hidden"));
    section.classList.remove("hidden");
  }

  function toggleLanguage() {
    currentLang = currentLang === "EN" ? "ES" : "EN";
    langToggle.textContent = currentLang === "EN" ? "ES" : "EN";
    document.getElementById("app-title").textContent = currentLang === "EN" ? "Barrio Green" : "Barrio Verde";
    document.getElementById("app-subtitle").textContent = currentLang === "EN" ? "Arizona Community Rewards" : "Recompensas Comunitarias de Arizona";
  }

  function toggleMode() {
    document.body.classList.toggle("dark");
  }

  navDashboard.addEventListener("click", () => showSection(dashboardSection));
  navRewards.addEventListener("click", () => showSection(rewardsSection));
  navAdmin.addEventListener("click", () => showSection(adminSection));
  mintButton.addEventListener("click", mintTokens);
  langToggle.addEventListener("click", toggleLanguage);
  modeToggle.addEventListener("click", toggleMode);

  init();
});
