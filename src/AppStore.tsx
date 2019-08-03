import React from "react";
import { isMobile } from "react-device-detect";
import useGlobalHook from "use-global-hook";

const initialState: any = {
  sideMenu: {
    drawerOpened: !isMobile
  }
};

export const toggleDrawerOpened = (store: any, drawerOpened: boolean) => {
  const newState = {
    ...store.state,
    sideMenu: { drawerOpened: !store.state.sideMenu.drawerOpened }
  };

  store.setState(newState);
};

const useGlobalStore = useGlobalHook(React, initialState, {
  sideMenu: { toggleDrawerOpened }
});

export default useGlobalStore;
