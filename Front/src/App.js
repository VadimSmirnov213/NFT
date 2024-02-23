import React, { useState, useEffect } from "react";
import bridge from "@vkontakte/vk-bridge";
import {
  View,
  AdaptivityProvider,
  AppRoot,
  ConfigProvider,
  SplitLayout,
  SplitCol,
} from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";

import Home from "./panels/Home";
import Customer from "./panels/Customer";
import Creator from "./panels/Creator";
import CreatorSecond from "./panels/CreatorSecond";

const App = () => {
  const [activePanel, setActivePanel] = useState("home");
  const [setUser] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const user = await bridge.send("VKWebAppGetUserInfo");
      setUser(user);
    }
    fetchData();
  }, []);

  const go = (e) => {
    setActivePanel(e.currentTarget.dataset.to);
  };

  return (
    <ConfigProvider>
      <AdaptivityProvider>
        <AppRoot>
          <SplitLayout>
            <SplitCol>
              <View activePanel={activePanel}>
                <Home id="home" go={go} />
                <Creator id="creator" go={go} onBackClick={setActivePanel} />
                <Customer id="customer" go={go} onBackClick={setActivePanel} />
                <CreatorSecond id="creatorsecond" go={go} onBackClick={setActivePanel}/>
              </View>
            </SplitCol>
          </SplitLayout>
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  );
};

export default App;
