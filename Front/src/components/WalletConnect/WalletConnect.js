import React, { useEffect, useState } from "react";
import "./WalletConnect.css";

import { Button } from "@vkontakte/vkui";

const WalletConnect = () => {
  const [connButtonText, setConnButtonText] = useState("Connect Wallet");

  useEffect(() => {
    connectWalletHandler();
  }, []);

  const connectWalletHandler = () => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      console.log("MetaMask Here!");

      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result) => {
          accountChangedHandler(result[0]);
          setConnButtonText(
            result[0].substring(0, 5) + "..." + result[0].substring(39)
          );
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      console.log("Need to install MetaMask");
    }
  };

  // update account, will cause component re-render
  const accountChangedHandler = (newAccount) => {
    setConnButtonText(
      newAccount[0].substring(0, 5) + "..." + newAccount[0].substring(39)
    );
  };

  const chainChangedHandler = () => {
    window.location.reload();
  };

  window.ethereum.on("accountsChanged", accountChangedHandler);

  window.ethereum.on("chainChanged", chainChangedHandler);

  return (
    <>
      <Button onClick={connectWalletHandler}>{connButtonText}</Button>
    </>
  );
};

export default WalletConnect;
