import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Panel, PanelHeaderBack } from "@vkontakte/vkui";
import axios from "axios";

import CustomHeader from "../components/CustomHeader/CustomHeader";
import WatchCard from "../components/WatchCard/WatchCard";
import ShopWindow from "../components/ShopWindow/ShopWindow";


const CreatorSecond = ({ id, go }) => {
  const [events, setEvents] = useState([]);
  const loadEvents = async () => {
    try {
      const user = (
        await window.ethereum.request({ method: "eth_requestAccounts" })
      )[0];

      const response = await axios.post(
        "https://29ab-176-52-77-82.ngrok.io/v1/user/getAllEvents",
        { owner_adress: user },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setEvents(response.data.data);
    } catch (error) {
      // console.error(error);
      console.log(error);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  return (
    <Panel id={"CreatorSecond"}>
      <CustomHeader name="Библиотека" />
      <label>Библиотека</label>
      <PanelHeaderBack onClick={go} data-to="creator" />
      <ShopWindow object={<WatchCard />} events={events} />
    </Panel>
  );
};

CreatorSecond.propTypes = {
  id: PropTypes.string.isRequired,
};

export default CreatorSecond;
