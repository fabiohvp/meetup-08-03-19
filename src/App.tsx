import { CssBaseline, Paper, makeStyles } from "@material-ui/core";
import React, { useLayoutEffect } from "react";
import { Waiter, useWait } from "react-wait";
import api, { addWaitMiddleware } from "./services/api";

import Header from "./components/header/Header";
import { IMenuItem } from "./components/sideMenu/SideMenu";
import LinearProgress from "@material-ui/core/LinearProgress";
import { Router } from "react-router";
import Routes from "./routes";
import SideMenuDrawer from "./components/sideMenu/SideMenuDrawer";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  }
}));

const useStylesMain = makeStyles(theme => ({
  main: {
    flexGrow: 1,
    width: "100%",
    padding: theme.spacing(8, 0, 0, 0)
  },
  content: {
    flexGrow: 1,
    width: "100%",
    padding: theme.spacing(0, 2, 2, 2)
  },
  paper: {
    width: "100%",
    overflowX: "auto",
    marginTop: theme.spacing(2),
    padding: theme.spacing(2)
  },
  linearProgress: {
    flexGrow: 1
  }
}));

const Main = () => {
  const classes = useStylesMain();
  const wait = useWait();

  useLayoutEffect(() => {
    addWaitMiddleware(api, wait);
  }, []);

  return (
    <main className={classes.main}>
      {wait.anyWaiting() && (
        <LinearProgress
          variant="indeterminate"
          color="secondary"
          className={classes.linearProgress}
        />
      )}
      <div className={classes.content}>
        <Paper className={classes.paper}>
          <Routes />
        </Paper>
      </div>
    </main>
  );
};

export default function App() {
  const classes = useStyles();
  const items: IMenuItem[] = [
    {
      text: "Cadastro",
      to: "",
      children: [
        {
          text: "Employee",
          to: "/employee"
        }
      ]
    }
  ];

  return (
    <Waiter>
      <Router history={history}>
        <div className={classes.root}>
          <CssBaseline />
          <Header />
          <SideMenuDrawer items={items} />
          <Main />
        </div>
      </Router>
    </Waiter>
  );
}
