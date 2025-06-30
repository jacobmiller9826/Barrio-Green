document.addEventListener('DOMContentLoaded', () => {
  const userAddress = document.getElementById('userAddress');
  const userBalance = document.getElementById('userBalance');
  const connectButton = document.getElementById('connectWallet');
  const logForm = document.getElementById('logForm');
  const rewardsList = document.getElementById('rewardsList');
  const settingsButton = document.getElementById('settingsButton');

  // Simulated balance and address
  let address = "0x123...abc";
  let balance = 100;

  // Show test values
  if (userAddress) userAddress.textContent = address;
  if (userBalance) userBalance.textContent = balance;

  // Connect Wallet
  if (connectButton) {
    connectButton.addEventListener('click', () => {
      alert('Connecting to wallet (testnet)');
      if (userAddress) userAddress.textContent = address;
    });
  }

  // Log Form
  if (logForm) {
    logForm.addEventListener('submit', e => {
      e.preventDefault();
      const type = document.getElementById('logType').value;
      const amount = document.getElementById('logAmount').value;
      alert(`Logged ${amount} units of ${type}. Await admin approval.`);
      logForm.reset();
    });
  }

  // Rewards
  if (rewardsList) {
    const rewards = [
      { name: "Diamondbacks Tickets", cost: 50 },
      { name: "Suns Game Voucher", cost: 75 },
      { name: "Coyotes Merchandise", cost: 60 },
      { name: "UofA Wildcats Hat", cost: 40 }
    ];
    rewards.forEach(item => {
      const li = document.createElement('li');
      li.className = 'reward-card';
      li.innerHTML = `<h3>${item.name}</h3><p>Cost: ${item.cost} TUC</p><button>Redeem</button>`;
      rewardsList.appendChild(li);
    });
  }

  // Settings
  if (settingsButton) {
    settingsButton.addEventListener('click', () => {
      showSettings();
    });
  }

  function showSettings() {
    const settingsHTML = `
      <section>
        <h2>⚙️ Settings</h2>
        <button id="toggleDark">🌙 Toggle Dark Mode</button>
        <button id="increaseText">🔎 Increase Text Size</button>
        <button id="decreaseText">🔍 Decrease Text Size</button>
        <button onclick="location.href='index.html'">🚪 Log Out</button>
      </section>`;
    document.querySelector('main').innerHTML = settingsHTML;

    document.getElementById('toggleDark').addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
    });
    document.getElementById('increaseText').addEventListener('click', () => {
      document.body.classList.add('large-text');
    });
    document.getElementById('decreaseText').addEventListener('click', () => {
      document.body.classList.remove('large-text');
    });
  }
});
