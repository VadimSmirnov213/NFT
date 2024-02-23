import React from "react";
import PropTypes from "prop-types";

import { Panel, Button, Div } from "@vkontakte/vkui";

import {
  PanelHeader,
  PanelHeaderBack,
  Header,
  Group,
  Cell,
  Avatar,
  CardGrid,
  Card,
  CellButton,
  useAdaptivityConditionalRender,
  PopoutWrapper,
  ModalDismissButton
} from "@vkontakte/vkui";

const CustomPopout = ({ onClose }) => {
  const { sizeX } = useAdaptivityConditionalRender();
  return (
    <PopoutWrapper onClick={onClose}>
      <div
        style={{
          backgroundColor: 'var(--vkui--color_background_content)',
          borderRadius: 8,
          position: 'relative',
          padding: '12px',
        }}
      >
        <h4>Кастомное модальное окно</h4>

        {sizeX.regular && (
          <ModalDismissButton className={sizeX.regular.className} onClick={onClose} />
        )}
      </div>
    </PopoutWrapper>
  );
};

export default CustomPopout;