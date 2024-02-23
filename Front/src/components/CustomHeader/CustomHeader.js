import React from "react";
import "./CustomHeader.css";

import {
  Panel,
  PanelHeader,
  Header,
  Button,
  Group,
  Cell,
  Div,
  Avatar,
} from "@vkontakte/vkui";
import WalletConnect from "../WalletConnect/WalletConnect";

const CustomHeader = ({ name, id, go }) => {
  return (
    <PanelHeader>
      <div className="header">
        <WalletConnect />
      </div>
    </PanelHeader>
  );
};

export default CustomHeader;
