import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./Home.css";

import { Panel, Button, Div } from "@vkontakte/vkui";
import CustomHeader from "../components/CustomHeader/CustomHeader";
import ShopWindow from "../components/ShopWindow/ShopWindow";
import ClaimCard from "../components/ClaimCard/ClaimCard";
import axios from "axios";



const Home = ({ id, go }) => {
  const [events, setEvents] = useState([]);

  const loadEvents = async () => {
    try {
      const response = await axios.post(
        "https://29ab-176-52-77-82.ngrok.io/v1/events/getAll",
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setEvents(response.data.data);
    } catch (error) {
      // console.error(error);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  return (
    <Panel id={id}>
      <CustomHeader name="Главная" />
      
      <label>Главная</label>

      <Div className="homechoices">
        <Button stretched onClick={go} data-to="creator">
          Создание билета
        </Button>
        <Button
          stretched
          className="rightchoice"
          onClick={go}
          data-to="customer"
        >
          Проверка билета
        </Button>
      </Div>
      <hr />
      <ShopWindow object={<ClaimCard />} events={events} />
    </Panel>
  );
};

Home.propTypes = {
  id: PropTypes.string.isRequired,
  go: PropTypes.func.isRequired,
};

export default Home;
