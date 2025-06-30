# Barrio Green – Arizona Community Rewards DApp

Barrio Green is a simple, beautiful, and intuitive decentralized app (DApp) built to reward Tucson community members with tokenized incentives for solar and recycling participation. The app connects to a smart contract deployed on the Sepolia testnet, managing TUC tokens.

---

## Features

- **Auto-generated wallet:** No login or email required. Wallet is created locally in your browser.
- **Dashboard:** Displays your connected wallet address and your current TUC token balance.
- **Rewards Catalog:** Browse community rewards such as baseball tickets and farmers market discounts redeemable with TUC tokens.
- **Admin Mint Page:** For authorized users to mint new TUC tokens to any Ethereum address. This enables token distribution to community members or testers.
- **Language Toggle:** Switch between English and Spanish.
- **Dark Mode:** Switch between light and dark themes for easier viewing.
- **Mobile-friendly:** Designed with large text, rounded boxes, and Arizona-inspired colors for clarity and accessibility.

---

## How to Use

1. Open the app in a modern browser.
2. The app auto-generates a local wallet for you.
3. View your wallet address and TUC balance on the dashboard.
4. Navigate to the Rewards page to see available rewards.
5. (Admins only) Use the Admin Mint page to mint TUC tokens to users.
6. Use the language and dark mode toggles in the header for personalization.

---

## Admin Mint Page Details

- The admin page allows minting new tokens by entering a recipient wallet address and the amount of TUC tokens.
- Only wallets with minting permissions on the deployed contract can successfully mint tokens.
- This page should be secured or restricted in a production environment to prevent unauthorized minting.

---

## Technical Details

- **Smart Contract Network:** Sepolia testnet
- **Smart Contract Address:** `0xC52a002023ABA42B4490f625Df6434fc26E425c8`
- **Blockchain SDK:** Thirdweb JavaScript SDK and Embedded Wallet
- **Frontend:** HTML, CSS, and JavaScript, hosted on GitHub Pages

---

## Setup and Deployment

1. Clone or download this repository.
2. Host the files on GitHub Pages or any static hosting provider.
3. Ensure you have access to the smart contract on Sepolia and proper permissions if you intend to mint tokens.
4. Open the app in a browser to start using.

---

## Future Improvements

- Secure admin page with authentication.
- Implement on-chain rewards redemption logic.
- Add more rewards and dynamic catalog loading.
- Integrate notifications or email alerts for users.
- Support mainnet deployment and real token economics.

---

## License

This project is open source and available under the MIT License.

---

Made with ❤️ for Tucson and Arizona communities 🌵  
