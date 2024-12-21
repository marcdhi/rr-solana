import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";

// Default styles that can be overridden by your app
import "@solana/wallet-adapter-react-ui/styles.css";

import { useState } from "react";


export function Welcome() {

  const wallet = useWallet();
  const connection = useConnection();
  console.log(wallet);

  const [amount, setAmount] = useState("");
  const [walletPublicKey, setWalletPublicKey] = useState("");
  
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);  
    setAmount(e.target.value);
  }

  const handleSendAirdrop = () => {
    setWalletPublicKey(wallet.publicKey?.toBase58() || "");
    console.log(walletPublicKey)
    console.log("Send Airdrop");
    connection.connection.requestAirdrop(wallet.publicKey!, parseInt(amount) * 1000000000)
    console.log("Airdrop sent");
    alert("Airdrop sent");
  }


  return (
    <main className="flex flex-col items-center justify-center pt-16 pb-4">

      <h1 className="text-2xl mb-8">
        Welcome to the Solana Airdrop!
      </h1>

      <div className="flex flex-col items-center space-y-4">
        <input
          type="text"
          placeholder="Amount"
          value={amount}
          onChange={handleAmountChange}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={handleSendAirdrop}>
          Send Airdrop
        </button>
      </div>
    </main>
  );
}
