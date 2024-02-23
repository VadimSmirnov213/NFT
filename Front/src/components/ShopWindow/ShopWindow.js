import React from "react";
import "./ShopWindow.css";

import {
  Panel,
  Button,
  Div,
  CardGrid,
  Card,
  Group,
  Cell,
} from "@vkontakte/vkui";
import ClaimCard from "../ClaimCard/ClaimCard";

const ShopWindow = ({ object, events }) => {
  return (
    <Group className="listevents">
      <CardGrid size="2">
        {events.map((event, index) => (
          <div style={{ padding: "10px" }}>
            {React.cloneElement(object, { event: event, index: index })}
          </div>
        ))}
      </CardGrid>
    </Group>
  );
};

export default ShopWindow;
