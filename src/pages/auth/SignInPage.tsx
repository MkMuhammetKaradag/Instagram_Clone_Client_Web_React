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
import { setLike, setLikes } from "../../context/User/userSlice";
import textLogo from "../../assest/instagramtextlogo.png";
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
          actions.props.dispatch(setLikes(user.data.user.userLikes || []));
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
    // console.log("neden");
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
            <img className="h-[51px]" src={textLogo} alt="" />
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
