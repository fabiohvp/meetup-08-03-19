import { Drawer, makeStyles } from "@material-ui/core";
import SideMenu, { IMenuItem } from "../sideMenu/SideMenu";

import React from "react";
import clsx from "clsx";
import useGlobalStore from "../../AppStore";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  drawer: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClosed: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: 0
  },
  drawerPaper: {
    padding: theme.spacing(7, 0, 0, 0),
    width: drawerWidth
  }
}));

const SideMenuDrawer = (props: { items: IMenuItem[] }) => {
  const classes = useStyles();

  const globalState = useGlobalStore()[0];
  const { drawerOpened } = globalState.sideMenu;

  return (
    <Drawer
      className={clsx(classes.drawer, !drawerOpened && classes.drawerClosed)}
      variant="persistent"
      open={drawerOpened}
      classes={{
        paper: classes.drawerPaper
      }}
    >
      <SideMenu items={props.items} />
    </Drawer>
  );
};

export default SideMenuDrawer;
