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

  let currentLang = "EN";

  const userAddress = document.getElementById("user-address");
  const balanceDisplay = document.getElementById("balance");
  const langToggle = document.getElementById("lang-toggle");
  const modeToggle = document.getElementById("mode-toggle");
  const mintButton = document.getElementById("mint-button");

  async function init() {
    await wallet.connect();
    const address = await wallet.getAddress();
    if (userAddress) userAddress.textContent = address;
    await fetchBalance();
  }

  async function fetchBalance() {
    try {
      if (!balanceDisplay) return;
      balanceDisplay.textContent = "Loading...";
      const contract = await getContract({ client, address: contractAddress, chain });
      const address = await wallet.getAddress();
      const balance = await contract.erc20.balanceOf(address);
      balanceDisplay.textContent = `${balance.displayValue} TUC`;
    } catch (err) {
      console.error(err);
      if (balanceDisplay) balanceDisplay.textContent = "Error loading balance.";
    }
  }

  async function mintTokens() {
    const mintAddressInput = document.getElementById("mint-address");
    const mintAmountInput = document.getElementById("mint-amount");
    const mintStatus = document.getElementById("mint-status");
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

  function toggleLanguage() {
    currentLang = currentLang === "EN" ? "ES" : "EN";
    langToggle.textContent = currentLang === "EN" ? "ES" : "EN";
    document.getElementById("app-title").textContent = currentLang === "EN" ? "Barrio Green" : "Barrio Verde";
    document.getElementById("app-subtitle").textContent = currentLang === "EN" ? "Arizona Community Rewards" : "Recompensas Comunitarias de Arizona";
  }

  function toggleMode() {
    document.body.classList.toggle("dark");
  }

  if (mintButton) mintButton.addEventListener("click", mintTokens);
  if (langToggle) langToggle.addEventListener("click", toggleLanguage);
  if (modeToggle) modeToggle.addEventListener("click", toggleMode);

  init();
});
