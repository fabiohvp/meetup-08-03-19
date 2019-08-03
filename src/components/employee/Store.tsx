import {
  Button,
  Grid,
  TextField,
  Typography,
  makeStyles
} from "@material-ui/core";
import { Link, withRouter } from "react-router-dom";
import React, { Fragment, useLayoutEffect } from "react";

import IEmployee from "../../models/IEmployee";
import api from "../../services/api";
import { useFormState } from "react-use-form-state";

const useStyles = makeStyles(theme => ({
  buttons: {
    display: "flex",
    justifyContent: "space-between"
  },
  button: {
    marginTop: theme.spacing(3)
  }
}));

const Create = (props: any) => {
  const initialState: IEmployee = {
    id: (props.match.params as any).id || "-1",
    employee_name: "",
    employee_age: 0,
    employee_salary: 0,
    profile_image: ""
  };

  const [formState, { number, text }] = useFormState<IEmployee>(initialState);
  const classes = useStyles();

  useLayoutEffect(() => {
    const employeeId = parseInt(formState.values.id);

    if (employeeId > 0) {
      getEmployee(employeeId);
    }
  }, []);

  async function getEmployee(employeeId: number) {
    const response = await api.get("/employee/" + employeeId);
    const {
      employee_name,
      employee_age,
      employee_salary
      /*profile_image,*/
    } = response.data;

    formState.setField("id", employeeId);
    formState.setField("employee_name", employee_name);
    formState.setField("employee_age", employee_age);
    formState.setField("employee_salary", response.data.employee_salary);
    // formState.setField("profile_image", profile_image);
  }
  //   useLayoutEffect(() => {
  //     getMunicipios();
  //   }, [formState.values.employee_salary]);

  function handleSubmit(formState: any) {
    console.log(formState);
    // if (errors) {
    //   console.log("error", errors);
    // } else {
    //   await api.post("employee", values);
    //   props.history.push("/employee");
    // }
  }

  return (
    <Fragment>
      <Typography component="h1" variant="h4" align="center">
        Employee
      </Typography>
      <Fragment>
        <div>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Nome"
                fullWidth
                {...text({
                  name: "employee_name",
                  validate: (value, values, event) => {
                    if (!value.trim()) {
                      return "Name is required";
                    }
                  }
                })}
              />
              {/* <span className="error">{formState.errors.employee_name}</span> */}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Idade" fullWidth {...number("employee_age")} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Salário"
                fullWidth
                {...number("employee_salary")}
              />
            </Grid>
          </Grid>
        </div>

        <div className={classes.buttons}>
          <Button component={Link} to="/employee" className={classes.button}>
            Cancelar
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleSubmit(formState)}
            className={classes.button}
          >
            Salvar
          </Button>
        </div>
      </Fragment>
    </Fragment>
  );
};

export default withRouter(Create);
