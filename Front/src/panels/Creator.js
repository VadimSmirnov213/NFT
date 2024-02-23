import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { ethers } from "ethers";

import WhitelistNFT from "../data/WhitelistNFT";

import CustomHeader from "../components/CustomHeader/CustomHeader";

import {
  Panel,
  FormLayout,
  FormItem,
  Input,
  Checkbox,
  Button,
  DateInput,
  ChipsInput,
  PanelHeaderBack,
  Gallery,
} from "@vkontakte/vkui";


const Creator = ({ id, go, onBackClick }) => {
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventDate, setEventDate] = useState(() => new Date());
  const [eventAddresses, setEventAddresses] = useState([]);
  const [publish, setPublish] = useState(false);

  const [slideIndex, setSlideIndex] = useState(1);

  const submit = async () => {
    try {
      const response = await axios.post(
        "https://29ab-176-52-77-82.ngrok.io/v1/events/getAll",
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const total = response.data.meta.total;

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const contractFactory = await new ethers.ContractFactory(
        WhitelistNFT.abi,
        WhitelistNFT.bytecode,
        signer
      );

      const contract = await contractFactory.deploy(
        "VKTicket",
        "VKT",
        total + 1,
        "https://29ab-176-52-77-82.ngrok.io/v1",
        eventAddresses.map((x) => x.value),
        publish
      );

      console.log("https://goerli.etherscan.io/address/" + contract.address);

      const wallet = (
        await window.ethereum.request({ method: "eth_requestAccounts" })
      )[0];

      const response2 = await axios.post(
        "https://29ab-176-52-77-82.ngrok.io/v1/events/create  ",
        {
          owner_adress: wallet,
          contract_id: contract.address,
          title: eventName,
          description: eventDescription,
          date_event: eventDate.toString(),
          img:
            "https://29ab-176-52-77-82.ngrok.io/images/" +
            (slideIndex + 1) +
            ".jpeg",
          nft_name: "VKTicket",
          nft_symbol: "VKT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Panel id={id}>
      <CustomHeader name="Создание билета" />
      <div className="headerContainer">
        <PanelHeaderBack onClick={go} data-to="home" />
        <label>Создание билета</label>
        <Button size="s" onClick={go} data-to="creatorsecond">Библиотека</Button>
      </div>
      <FormLayout>
        <FormItem top="Название события">
          <Input onChange={(e) => setEventName(e.target.value)} />
        </FormItem>
        <FormItem top="Описание события">
          <Input onChange={(e) => setEventDescription(e.target.value)} />
        </FormItem>
        <FormItem top="Дата">
          <DateInput
            onChange={setEventDate}
            value={eventDate}
            enableTime={true}
            disablePast={true}
            closeOnChange={true}
            disablePickers={false}
            showNeighboringMonth={false}
            disableCalendar={false}
          />
        </FormItem>
        <FormItem top="Список приглашенных">
          <ChipsInput
            placeholder="Введите адрес и нажмите Enter"
            selected={eventAddresses}
            onChange={setEventAddresses}
          />
        </FormItem>
        <Checkbox
          onChange={(e) => setPublish(!publish)}
          description="Пользователи смогут забрать свои билеты сразу после создания события"
        >
          Опубликовать событие
        </Checkbox>

        <Gallery
          slideWidth="90%"
          align="center"
          slideIndex={slideIndex}
          onChange={setSlideIndex}
          isDraggable={true}
          showArrows={true}
        >
          <img
            src="https://29ab-176-52-77-82.ngrok.io/images/1.jpeg"
            height="300"
          />
          <img
            src="https://29ab-176-52-77-82.ngrok.io/images/2.jpeg"
            height="300"
          />
          <img
            src="https://29ab-176-52-77-82.ngrok.io/images/3.jpeg"
            height="300"
          />
        </Gallery>
        <FormItem>
          <Button size="s" stretched onClick={submit}>
            Создать событие
          </Button>
        </FormItem>
      </FormLayout>
    </Panel>
  );
};

Creator.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Creator;