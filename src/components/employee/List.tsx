import {
  Fab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  makeStyles
} from "@material-ui/core";
import React, { Fragment, useLayoutEffect, useState } from "react";

import AddIcon from "@material-ui/icons/Add";
import { Link } from "react-router-dom";
import api from "../../services/api";
import { withRouter } from "react-router";

const useStyles = makeStyles(theme => ({
  pointer: {
    cursor: "pointer"
  },
  title: {
    color: theme.palette.text.secondary
  },
  fab: {
    position: "absolute",
    bottom: theme.spacing(3),
    right: theme.spacing(3),
    [theme.breakpoints.down("xs")]: {
      bottom: theme.spacing(2),
      right: theme.spacing(2)
    }
  }
}));

const List = (props: any) => {
  const classes = useStyles();
  const [items, setItems] = useState([] as any[]);

  useLayoutEffect(() => {
    getEmployees();
  }, []);

  async function getEmployees() {
    const response = await api.get("/employees");
    const data = response.data.slice(0, 20);
    setItems(data);
  }

  return (
    <Fragment>
      <Typography variant="h4" component="h4" className={classes.title}>
        Employees
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Idade</TableCell>
            <TableCell>Salário</TableCell>
            {/* <TableCell>Foto</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map(item => (
            <TableRow
              key={item.id}
              hover
              className={classes.pointer}
              onClick={event => props.history.push(`/employee/${item.id}`)}
            >
              <TableCell>{item.employee_name}</TableCell>
              <TableCell>{item.employee_age}</TableCell>
              <TableCell>{item.employee_salary}</TableCell>
              {/* <TableCell>{item.profile_image}</TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Fab
        color="primary"
        aria-label="Adicionar"
        className={classes.fab}
        component={Link}
        to="/employee/create"
      >
        <AddIcon />
      </Fab>
    </Fragment>
  );
};

export default withRouter(List);
