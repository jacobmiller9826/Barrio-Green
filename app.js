let provider, signer, contract;
const CONTRACT_ADDRESS = "YOUR_DEPLOYED_CONTRACT_ADDRESS";
const ABI = [
  "function balanceOf(address) view returns (uint256)",
  "function burn(uint256 amount)"
];

async function connectWallet() {
  if (window.ethereum) {
    await ethereum.request({ method: 'eth_requestAccounts' });
    provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = provider.getSigner();
    contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
    console.log("Wallet connected");
  } else {
    alert("Please install MetaMask!");
  }
}

async function showBalance() {
  if (!signer) return;
  const address = await signer.getAddress();
  document.getElementById("userAddress").textContent = address;
  const balance = await contract.balanceOf(address);
  document.getElementById("userBalance").textContent = ethers.utils.formatUnits(balance, 18);
}

document.addEventListener("DOMContentLoaded", async () => {
  if (document.getElementById("connectWallet")) {
    document.getElementById("connectWallet").addEventListener("click", async () => {
      await connectWallet();
      alert("Wallet connected!");
    });
  }

  if (document.getElementById("userBalance")) {
    await connectWallet();
    await showBalance();
  }

  if (document.getElementById("logForm")) {
    document.getElementById("logForm").addEventListener("submit", (e) => {
      e.preventDefault();
      const log = {
        user: signer.getAddress(),
        type: document.getElementById("logType").value,
        amount: document.getElementById("logAmount").value,
        approved: false
      };
      let logs = JSON.parse(localStorage.getItem("logs") || "[]");
      logs.push(log);
      localStorage.setItem("logs", JSON.stringify(logs));
      alert("Log submitted for admin approval!");
      document.getElementById("logForm").reset();
    });
  }

  if (document.getElementById("rewardsList")) {
    const rewards = [
      { name: "Tucson Baseball Ticket Voucher", cost: 50 },
      { name: "Diamondbacks Cap Discount", cost: 40 },
      { name: "Phoenix Suns T-Shirt Discount", cost: 40 },
      { name: "UA Wildcats Merch Voucher", cost: 30 },
      { name: "Roadrunners Ticket Discount", cost: 35 }
    ];

    const list = document.getElementById("rewardsList");
    rewards.forEach(r => {
      const li = document.createElement("li");
      li.className = "reward-card";
      li.innerHTML = `<h3>${r.name}</h3><p>Cost: ${r.cost} TUC</p>`;
      const btn = document.createElement("button");
      btn.textContent = "Redeem";
      btn.onclick = async () => {
        await connectWallet();
        await contract.burn(ethers.utils.parseUnits(r.cost.toString(), 18));
        alert(`Redeemed ${r.name}!`);
        await showBalance();
      };
      li.appendChild(btn);
      list.appendChild(li);
    });

    await connectWallet();
    await showBalance();
  }
});
