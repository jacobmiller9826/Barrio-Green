let provider, signer, contract;
const CONTRACT_ADDRESS = "YOUR_DEPLOYED_CONTRACT_ADDRESS";
const ABI = [
  "function mint(address to, uint256 amount)"
];

async function connectWallet() {
  if (window.ethereum) {
    await ethereum.request({ method: 'eth_requestAccounts' });
    provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = provider.getSigner();
    contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
  } else {
    alert("Please install MetaMask!");
  }
}

async function loadLogs() {
  let logs = JSON.parse(localStorage.getItem("logs") || "[]");
  const pending = logs.filter(l => !l.approved);
  const list = document.getElementById("pendingLogs");
  list.innerHTML = '';

  pending.forEach(log => {
    const li = document.createElement("li");
    li.className = "reward-card";
    li.innerHTML = `
      <h3>${log.type.toUpperCase()}</h3>
      <p>User: ${log.user}</p>
      <p>Amount: ${log.amount}</p>
    `;
    const btn = document.createElement("button");
    btn.textContent = "Approve & Mint";
    btn.onclick = async () => {
      await connectWallet();
      await contract.mint(log.user, ethers.utils.parseUnits(log.amount.toString(), 18));
      log.approved = true;
      localStorage.setItem("logs", JSON.stringify(logs));
      alert("Tokens minted!");
      await loadLogs();
    };
    li.appendChild(btn);
    list.appendChild(li);
  });

  if (pending.length === 0) {
    list.innerHTML = "<p>No pending logs for approval.</p>";
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  await connectWallet();
  await loadLogs();
});
