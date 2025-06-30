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
  let exchangeRates = {
    plastic: 10,
    solar: 20
  };

  const userAddress = document.getElementById("user-address");
  const balanceDisplay = document.getElementById("balance");
  const langToggle = document.getElementById("lang-toggle");
  const modeToggle = document.getElementById("mode-toggle");

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

  async function exchangeCredits(type) {
    const input = document.getElementById(`${type}-input`);
    const status = document.getElementById(`${type}-status`);
    if (!input || !status) return;

    const amount = parseFloat(input.value);
    if (isNaN(amount) || amount <= 0) {
      status.textContent = currentLang === "EN" ? "Enter valid amount." : "Ingrese una cantidad válida.";
      return;
    }

    const tucAmount = amount * exchangeRates[type];
    try {
      status.textContent = currentLang === "EN" ? "Exchanging..." : "Intercambiando...";
      const contract = await getContract({ client, address: contractAddress, chain });
      const userAddr = await wallet.getAddress();
      await contract.erc20.mintTo(userAddr, tucAmount.toString());
      status.textContent = currentLang === "EN" ? `Exchanged for ${tucAmount} TUC!` : `¡Intercambiado por ${tucAmount} TUC!`;
    } catch (err) {
      console.error(err);
      status.textContent = currentLang === "EN" ? "Error during exchange." : "Error en el intercambio.";
    }
  }

  async function mintTokens() {
    const mintAddressInput = document.getElementById("mint-address");
    const mintAmountInput = document.getElementById("mint-amount");
    const mintStatus = document.getElementById("mint-status");
    if (!mintAddressInput || !mintAmountInput || !mintStatus) return;

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
    if (langToggle) langToggle.textContent = currentLang === "EN" ? "ES" : "EN";
    const title = document.getElementById("app-title");
    const subtitle = document.getElementById("app-subtitle");
    if (title) title.textContent = currentLang === "EN" ? "Barrio Green" : "Barrio Verde";
    if (subtitle) subtitle.textContent = currentLang === "EN" ? "Arizona Community Rewards" : "Recompensas Comunitarias de Arizona";
  }

  function toggleMode() {
    document.body.classList.toggle("dark");
  }

  // Attach to common elements
  if (langToggle) langToggle.addEventListener("click", toggleLanguage);
  if (modeToggle) modeToggle.addEventListener("click", toggleMode);

  // Exchange buttons
  const plasticBtn = document.getElementById("plastic-exchange-btn");
  if (plasticBtn) plasticBtn.addEventListener("click", () => exchangeCredits("plastic"));
  const solarBtn = document.getElementById("solar-exchange-btn");
  if (solarBtn) solarBtn.addEventListener("click", () => exchangeCredits("solar"));

  // Admin mint
  const mintButton = document.getElementById("mint-button");
  if (mintButton) mintButton.addEventListener("click", mintTokens);

  init();
});
