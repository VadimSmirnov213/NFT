import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { Panel, Button, Div } from "@vkontakte/vkui";
import CustomHeader from "../components/CustomHeader/CustomHeader";
import CheckCard from "../components/CheckCard/CheckCard";
import ShopWindow from "../components/ShopWindow/ShopWindow";
import axios from "axios";

import {
  PanelHeaderBack,
  useAdaptivityConditionalRender,
  PopoutWrapper,
  ModalDismissButton,
} from "@vkontakte/vkui";


const Customer = ({ id, go }) => {
  const [events, setEvents] = useState([]);
  const loadEvents = async () => {
    try {
      const user = (
        await window.ethereum.request({ method: "eth_requestAccounts" })
      )[0];

      const response = await axios.post(
        `https://29ab-176-52-77-82.ngrok.io/v1/user/getAllNfts`,
        { owner_adress: user },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response);
      setEvents(response.data.data);
    } catch (error) {
      // console.error(error);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  return (
    <Panel id={"Customer"}>
      <CustomHeader name="Проверка билета" />
      
      <label>Проверка билета</label>
      <PanelHeaderBack onClick={go} data-to="home" />
      <ShopWindow object={<CheckCard />} events={events} />
    </Panel>
  );
};

// const CustomPopout = ({ onClose }) => {
//   const { sizeX } = useAdaptivityConditionalRender();
//   return (
//     <PopoutWrapper onClick={onClose}>
//       <div
//         style={{
//           backgroundColor: "var(--vkui--color_background_content)",
//           borderRadius: 8,
//           position: "relative",
//           padding: "12px",
//         }}
//       >
//         <h4>Кастомное модальное окно</h4>

//         {sizeX.regular && (
//           <ModalDismissButton
//             className={sizeX.regular.className}
//             onClick={onClose}
//           />
//         )}
//       </div>
//     </PopoutWrapper>
//   );
// };

Customer.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Customer;
