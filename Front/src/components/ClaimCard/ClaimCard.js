import React, { useState } from "react";
import { ethers } from "ethers";
import "./ClaimCard.css";
import WhitelistNFT from "../../data/WhitelistNFT";
import axios from "axios";

import { Button, Card } from "@vkontakte/vkui";

const ClaimCard = ({ event, index }) => {
  const [loading, setLoading] = useState(false);

  const onClaimHandler = async () => {
    setLoading(true);
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        event.contract_id,
        WhitelistNFT.abi,
        signer
      );
      const txResponse = await contract.claimNFT();
      const txReceipt = await txResponse.wait();
      const events = txReceipt.events;
      const tokenId = events[0].args.tokenId.toNumber();
      if (txReceipt.status == 1) {
        const response = await axios.post(
          "https://29ab-176-52-77-82.ngrok.io/v1/nfts/create",
          {
            owner_wallet: await signer.getAddress(),
            event_id: event.id.toString(),
            token_id: tokenId.toString(),
            meta_data: `{"title": "${event.title.toString()}","description": "${event.description.toString()}","img":"${
              event.img
            }","date_event": "${event.date_event}","contract_address": "${
              event.contract_id
            }","token_id": "${tokenId}"}`,

            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log(response);
      } else {
        // reverted
      }
    } catch (error) {
      // console.error(error);
      console.log("Error while claim");
    }
    setLoading(false);
  };

  return (
    <Card mode="shadow" key={index}>
      <div
        style={{
          backgroundImage: `url(${event.img})`,
          backgroundSize: "cover",
          display: "flex",
          "flex-direction": "column",
          "justify-content": "space-between",
          "align-items": "flex-end",
          height: "150px",
          width: "340px",
        }}
      >
        <div className="topright">
          <label>{event.title}</label>
          <label> {event.description}</label>
        </div>
        <div className="bottomright">
          <Button onClick={onClaimHandler} loading={loading}>
            Забрать
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ClaimCard;
