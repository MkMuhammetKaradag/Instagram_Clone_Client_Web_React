import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setUser, User } from "../../context/Auth/authSlice";
import screenshot1 from "../../assest/screenshot1.png";
import screenshot2 from "../../assest/screenshot2.png";
import screenshot3 from "../../assest/screenshot3.png";
import screenshot4 from "../../assest/screenshot4.png";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { AiFillFacebook } from "react-icons/ai";
import { getLogin } from "../../api";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { FormHelperText } from "@mui/material";
import { withFormik, FormikProps, FormikErrors, Form, Field } from "formik";
import Button from "../../componnets/Auth/Button";
import Separator from "../../componnets/Auth/Separator";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
// import { Helmet } from "react-helmet";
import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
interface FormState {
  showPassword: boolean;
}

// Shape of form values
interface FormValues {
  email: string;
  password: string;
}

interface OtherProps {
  message: string;
}

// Aside: You may see InjectedFormikProps<OtherProps, FormValues> instead of what comes below in older code.. InjectedFormikProps was artifact of when Formik only exported a HoC. It is also less flexible as it MUST wrap all props (it passes them through).
const InnerForm = (props: OtherProps & FormikProps<FormValues>) => {
  const { touched, errors, isSubmitting, message, values, handleChange } =
    props;

  const dispatch = useAppDispatch();

  // console.log(isSubmitting);
  const [formValues, setFormValues] = React.useState<FormState>({
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setFormValues({
      ...formValues,
      showPassword: !formValues.showPassword,
    });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  // const handleSubmit = () => {};

  return (
    <Form className="grid gap-y-1.5">
      <TextField
        className="bg-zinc-50"
        fullWidth
        inputProps={{
          style: {
            height: "15px",
            alignItems: "center",
          },
        }}
        error={touched.email && Boolean(errors.email)}
        helperText={touched.email && errors.email}
        id="outlined-textarea"
        label="user name or email"
        value={values.email}
        onChange={handleChange}
        name="email"
      />

      <FormControl
        className="w-full bg-zinc-50"
        sx={{ alignItems: "center" }}
        variant="outlined"
      >
        <InputLabel
          sx={[
            { marginTop: "-3px", textAlign: "center", fontSize: 15 },
            // Boolean(errors.password) && { color: "red" },
          ]}
          htmlFor="outlined-adornment-password"
        >
          Password
        </InputLabel>
        <OutlinedInput
          fullWidth
          inputProps={{
            style: {
              height: "30px",
              alignItems: "center",
            },
          }}
          size="small"
          label="Password"
          id="outlined-adornment-password"
          type={formValues.showPassword ? "text" : "password"}
          name="password"
          autoComplete="on"
          error={touched.password && Boolean(errors.password)}
          onChange={handleChange}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {formValues.showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
        {touched.password && errors.password && (
          <FormHelperText error id="accountId-error">
            {errors.password}
          </FormHelperText>
        )}
      </FormControl>

      <Button
        type="submit"
        disabled={!values.email || !values.password}
        // onClick={handleSubmit}
      >
        Log In
      </Button>
      {/* <button
        type="submit"
        disabled={!values.email || !values.password}
        className="h-[32px] rounded-sm font-semibold bg-brand text-white text-sm disabled:opacity-50"
        onClick={handleSubmit}
      >
        Log In
      </button> */}
    </Form>
  );
};

// The type of props MyForm receives
interface MyFormProps {
  initialEmail?: string;
  initialPassword?: string;
  message: string; // if this passed all the way through you might do this or make a union type
  dispatch: Dispatch<AnyAction>;
  navigate: NavigateFunction;
}
const SignInSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(6, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});
// Wrap our form with the withFormik HoC
const MyForm = withFormik<MyFormProps, FormValues>({
  // Transform outer props into form values
  mapPropsToValues: (props) => {
    return {
      email: props.initialEmail || "",
      password: props.initialPassword || "",
    };
  },

  validationSchema: SignInSchema,
  handleSubmit: (values, actions) => {
    getLogin({
      email: values.email,
      password: values.password,
    })
      .then((user) => {
        console.log(user.data.user);
        if (user.data.user) {
          actions.props.dispatch(setUser(user.data.user));
          toast.success("Successfully toasted!");
          actions.props.navigate("/");
        }
      })
      .catch((err) => {
        toast.error("This didn't work.");
      });
  },
})(InnerForm);

// Use <MyForm /> wherevs

const SignInPage = () => {
  const ref = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    console.log("neden");
    let images = ref.current?.querySelectorAll("img"),
      total = images?.length || 0,
      current = 0;

    const loginPageScreenShotSlider = () => {
      if (images != undefined) {
        if (current > 0) {
          images[current - 1]?.classList.add("opacity-0");
        } else {
          images[total - 1]?.classList.add("opacity-0");
        }
        images[current]?.classList.remove("opacity-0");
      }
      if (current == total - 1) {
        current = 0;
      } else {
        current += 1;
      }
    };
    loginPageScreenShotSlider();
    let interval = setInterval(loginPageScreenShotSlider, 2500);
    return () => {
      clearInterval(interval);
    };
  }, [ref]);

  return (
    <div className="h-full  w-full gap-x-8 flex items-center justify-center">
      {/* <Helmet>
        <title>Login Instagram</title>
      </Helmet> */}
      <div className="hidden md:block w-[380px] h-[581px] bg-login-pattern relative  bg-[length:468.32px_634.15px] bg-[top_left_-46px]">
        <div
          className="w-[250px] h-[538px] absolute top-[27px] right-[18px]"
          ref={ref}
        >
          <img
            className="w-full h-full absolute top-0 left-0 opacity-0 transition-opacity duration-500 ease-linear"
            src={screenshot1}
          />

          <img
            className="w-full h-full absolute top-0 left-0 opacity-0 transition-opacity duration-500 ease-linear"
            src={screenshot2}
            alt=""
          />
          <img
            className="w-full h-full absolute top-0 left-0 opacity-0 transition-opacity duration-500 ease-linear"
            src={screenshot3}
            alt=""
          />
          <img
            className="w-full h-full absolute top-0 left-0 opacity-0 transition-opacity duration-500 ease-linear"
            src={screenshot4}
            alt=""
          />
        </div>
      </div>

      {/* Form */}
      <div className="w-[351px] grid gap-y-3">
        <div className="w-[351px] bg-white border   p-[40px]  pt-6">
          <div className="flex justify-center">
            <img
              className="h-[51px]"
              src="data:image/jpeg;base64,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"
              alt=""
            />
          </div>
          <div className="grid gap-y-3">
            <MyForm message="Sign In" dispatch={dispatch} navigate={navigate} />

            <Separator></Separator>
          </div>
          <div>
            <div className="flex justify-center items-center mt-2 gap-x-2 text-sm  text-facebook font-semibold">
              <AiFillFacebook size={20} /> Login with facebook
            </div>
            <div className="text-xs flex  items-center justify-center mt-3  text-link">
              Forgot password
            </div>
          </div>
        </div>
        <div className="w-[351px] bg-white border p-4 text-sm text-center ">
          Don't Have a account?{" "}
          <Link to={"SignUp"}>
            <span className="font-semibold text-brand">Sign up</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
