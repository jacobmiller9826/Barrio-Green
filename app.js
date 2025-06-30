import { createThirdwebClient } from "https://esm.sh/@thirdweb-dev/react-core@0.16.1";
import { createEmbeddedWallet } from "https://esm.sh/@thirdweb-dev/wallets@0.16.1";
import { getContract } from "https://esm.sh/@thirdweb-dev/sdk@0.16.1/evm";
import { defineChain } from "https://esm.sh/@thirdweb-dev/chains@0.16.1";

const clientId = "05a0325af41e925b0e2ff52a16efa407";
const contractAddress = "0xC52a002023ABA42B4490f625Df6434fc26E425c8";
const chain = defineChain("sepolia");

const client = createThirdwebClient({ clientId });
const wallet = createEmbeddedWallet({ client });

const loginSection = document.getElementById("login-section");
const dashboardSection = document.getElementById("dashboard-section");
const emailInput = document.getElementById("email-input");
const loginButton = document.getElementById("login-button");
const logoutButton = document.getElementById("logout-button");
const userAddress = document.getElementById("user-address");
const balanceDisplay = document.getElementById("balance");

async function login() {
  const email = emailInput.value.trim();
  if (!email) {
    alert("Please enter your email.");
    return;
  }

  loginButton.disabled = true;
  loginButton.textContent = "Logging in...";

  try {
    await wallet.connect({ strategy: "email", email });
    const address = await wallet.getAddress();
    console.log("Logged in:", address);
    userAddress.textContent = address;

    await showDashboard();
  } catch (err) {
    console.error(err);
    alert("Login failed.");
  } finally {
    loginButton.disabled = false;
    loginButton.textContent = "Login with Email";
  }
}

async function showDashboard() {
  loginSection.classList.add("hidden");
  dashboardSection.classList.remove("hidden");

  await fetchBalance();
}

async function fetchBalance() {
  try {
    balanceDisplay.textContent = "Loading...";
    const contract = await getContract({
      client,
      address: contractAddress,
      chain
    });
    const address = await wallet.getAddress();

    const balance = await contract.erc20.balanceOf(address);
    balanceDisplay.textContent = `${balance.displayValue} TUC`;
  } catch (err) {
    console.error(err);
    balanceDisplay.textContent = "Error loading balance.";
  }
}

async function logout() {
  await wallet.disconnect();
  loginSection.classList.remove("hidden");
  dashboardSection.classList.add("hidden");
  emailInput.value = "";
}

loginButton.addEventListener("click", login);
logoutButton.addEventListener("click", logout);
