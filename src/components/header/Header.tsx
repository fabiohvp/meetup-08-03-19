import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Typography,
  makeStyles
} from "@material-ui/core";

import { Link } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import React from "react";
import useGlobalStore from "../../AppStore";

const useStyles = makeStyles(theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  toolbar: {
    justifyContent: "space-between",
    flexFlow: "row-wrap"
  },
  toolbarLeftContent: {
    display: "flex"
  },
  link: {
    margin: theme.spacing(1, 1.5)
  }
}));

const Header = () => {
  const classes = useStyles();
  const globalActions = useGlobalStore()[1];

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <div className={classes.toolbarLeftContent}>
          <IconButton
            color="inherit"
            aria-label="Expandir menu lateral"
            onClick={() => globalActions.sideMenu.toggleDrawerOpened()}
            edge="start"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">
            <Button
              color="inherit"
              component={Link}
              to="/"
              className={classes.link}
            >
              LOGO
            </Button>
          </Typography>
        </div>
        <Button href="#" color="inherit" variant="outlined">
          Login
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
