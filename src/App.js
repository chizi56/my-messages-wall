import React, { useEffect, useState } from "react";
import './App.css';

import { Navigate } from "react-router-dom";


const App = () => {

  const [currentAccount, setCurrentAccount] = useState("");

  const checkIfWalletIsConnected = async () => {
    const { ethereum } = window;
    if (!ethereum) {
      console.log("Make sure you have metamask!");
    } else {
      console.log("We have the ethereum object", ethereum);
    }

    const accounts = await ethereum.request({ method: "eth_accounts" });
    if(accounts.length !== 0){
      console.log("Authorized account: ", accounts[0]);
      setCurrentAccount(accounts[0]);
    }else{
      console.log("No accounts!")
    }

  }
  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error)
    }
  }
  const check = () => {
    if(!currentAccount){
      return <button onClick={connectWallet}>Connect Wallet</button>;
    }else{
      return <Navigate to="/main" replace={true} />
    }
  }
  useEffect(() => {
    checkIfWalletIsConnected();
  }, [])

  return (
    <div className="App">
      {check()}
    </div>
  );
}

export default App;
