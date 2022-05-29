import React from "react";
import {
  makeStyles,
  Container,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import Row from "antd/lib/grid/row";
import Col from "antd/lib/grid/col";

interface SignUp {
  email: string;
  username: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup.string().required().email(),
  username: yup.string().required().min(2).max(25),
  password: yup.string().required().min(8).max(120),
});

const useStyles = makeStyles((theme) => ({
  heading: {
    textAlign: "center",
    margin: theme.spacing(1, 0, 4),
  },
  submitButton: {
    marginTop: theme.spacing(4),
  },
}));

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUp>({
    resolver: yupResolver(schema),
  });

  const { heading, submitButton } = useStyles();

  const [json, setJson] = useState<string>();

  const onSubmit = (data: SignUp) => {
    setJson(JSON.stringify(data));
  };

  return (
    <Container maxWidth='xs'>
      <Typography className={heading} variant='h4' style={{ marginTop: "20%" }}>
        Sign Up Form
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <TextField
          {...register("email")}
          variant='outlined'
          margin='normal'
          label='Email'
          //helperText={errors.email?.message}
          //error={!!errors.email?.message}
          fullWidth
          required
        />
        <TextField
          {...register("username")}
          variant='outlined'
          margin='normal'
          label='Username'
          //helperText={errors.username?.message}
          //error={!!errors.username?.message}
          fullWidth
          required
        />
        <TextField
          {...register("password")}
          variant='outlined'
          margin='normal'
          label='Password'
          //helperText={errors.password?.message}
          //error={!!errors.password?.message}
          type='password'
          fullWidth
          required
        />
        <Row
          style={{ width: "100%", justifyContent: "center", marginTop: "10px" }}
        >
          <Col style={{ width: "40%", padding: "10px" }}>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={submitButton}
            >
              Sign Up
            </Button>
          </Col>
        </Row>
        {json && (
          <>
            <Typography variant='body1'>
              Below is the JSON that would normally get passed to the server
              when a form gets submitted
            </Typography>
            <Typography variant='body2'>{json}</Typography>
          </>
        )}
      </form>
    </Container>
  );
}

export default App;
