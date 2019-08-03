import { Route, Switch } from "react-router-dom";

import Home from "./pages/Home";
import ListEmployee from "./components/employee/List";
import React from "react";
import StoreEmployee from "./components/employee/Store";

function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/employee" exact component={ListEmployee} />
      <Route path="/employee/:id" component={StoreEmployee} />
      <Route path="/employee/create" component={StoreEmployee} />
    </Switch>
  );
}

export default Routes;
