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
import { getLogin, postSignup } from "../../api";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { FormHelperText } from "@mui/material";
import { withFormik, FormikProps, FormikErrors, Form, Field } from "formik";
import Button from "../../componnets/Auth/Button";
import Separator from "../../componnets/Auth/Separator";
import { Link, Navigate, NavigateFunction, redirect } from "react-router-dom";
import InstagramTextLogo from "../../assest/InstagramTextLogo2.png";
import { useDispatch } from "react-redux";
import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
interface FormState {
  showPassword: boolean;
  showPasswordConfirmation: boolean;
}

// Shape of form values
interface FormValues {
  email: string;
  password: string;
  passwordConfirmation: string;
  userNickName: string;
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
    showPasswordConfirmation: false,
  });

  const handleClickShowPassword = (name: string) => {
    setFormValues({
      ...formValues,
      [name]:
        name == "showPassword"
          ? !formValues.showPassword
          : !formValues.showPasswordConfirmation,
    });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const handleSubmit = () => {
    console.log("benim handle");
    // getLogin({
    //   email: values.email,
    //   password: values.password,
    // })
    //   .then((user) => {
    //     console.log(user.data.user);
    //     if (user.data.user) {
    //       dispatch(setUser(user.data.user));
    //       toast.success("Successfully toasted!");
    //     }
    //   })
    //   .catch((err) => {
    //     toast.error("This didn't work.");
    //   });
  };

  return (
    <Form className="grid gap-y-4">
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
        label=" email"
        value={values.email}
        onChange={handleChange}
        name="email"
      />
      <TextField
        className="bg-zinc-50"
        fullWidth
        inputProps={{
          style: {
            height: "15px",
            alignItems: "center",
          },
        }}
        error={touched.userNickName && Boolean(errors.userNickName)}
        helperText={touched.userNickName && errors.userNickName}
        id="outlined-textarea_1"
        label="user name "
        value={values.userNickName}
        onChange={handleChange}
        name="userNickName"
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
          error={touched.password && Boolean(errors.password)}
          onChange={handleChange}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => handleClickShowPassword("showPassword")}
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
          htmlFor="outlined-adornment-passwordConfirmation"
        >
          password Confirmation
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
          id="outlined-adornment-passwordConfirmation"
          type={formValues.showPasswordConfirmation ? "text" : "password"}
          name="passwordConfirmation"
          error={
            touched.passwordConfirmation && Boolean(errors.passwordConfirmation)
          }
          onChange={handleChange}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() =>
                  handleClickShowPassword("showPasswordConfirmation")
                }
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {formValues.showPasswordConfirmation ? (
                  <VisibilityOff />
                ) : (
                  <Visibility />
                )}
              </IconButton>
            </InputAdornment>
          }
        />
        {touched.passwordConfirmation && errors.passwordConfirmation && (
          <FormHelperText error id="accountId-error">
            {errors.passwordConfirmation}
          </FormHelperText>
        )}
      </FormControl>

      <p className="text-[10px] font-semibold text-[#8e8e8e] text-center mt-3">
        Hizmetimizi kullanan kişiler senin iletişim bilgilerini Instagram'a
        yüklemiş olabilir. Daha Fazla Bilgi Al
      </p>

      <p className="text-[10px] font-semibold text-[#8e8e8e] text-center my-3">
        Hizmetimizi kullanan kişiler senin iletişim bilgilerini Instagram'a
        yüklemiş olabilir. Daha Fazla Bilgi Al
      </p>
      <Button
        type="submit"
        disabled={
          !values.email ||
          !values.password ||
          !values.passwordConfirmation ||
          !values.userNickName
        }
        onClick={handleSubmit}
      >
        Sign Up
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
  initialPasswordConfirmation?: string;
  initialUserNickName?: string;
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
  userNickName: Yup.string()
    .min(3, "Too Short!")
    .max(20, "Too Long!")
    .required("Required"),
  passwordConfirmation: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
});
// Wrap our form with the withFormik HoC
const MyForm = withFormik<MyFormProps, FormValues>({
  // Transform outer props into form values
  mapPropsToValues: (props) => {
    return {
      email: props.initialEmail || "",
      password: props.initialPassword || "",
      passwordConfirmation: props.initialPasswordConfirmation || "",
      userNickName: props.initialUserNickName || "",
    };
  },

  validationSchema: SignInSchema,
  handleSubmit: (values, actions) => {
    // console.log("geldi");

    postSignup({
      email: values.email,
      password: values.password,
      userNickName: values.userNickName,
    })
      .then((user) => {
        console.log(user.data.user);
        if (user.data.user) {
          //   <Navigate to={"/SignIn"}></Navigate>;
          console.log("girmedi");
          actions.props.navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message || "error");
      });
    // getLogin();
    // actions.props
    //   .dispatch(
    //     setUser({
    //       email: values.email,
    //       password: values.password,
    //     })
    //   )
    //   .then((res) => {
    //     console.log(res);
    //   });
  },
})(InnerForm);

// Use <MyForm /> wherevs

const SignUpPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="h-full  w-full gap-x-8 flex items-center justify-center">
      {/* Form */}
      <div className="w-[351px] grid gap-y-3">
        <div className="w-[351px] bg-white border   p-[40px]  pt-6">
          <div className="flex justify-center">
            <img className="h-[51px]" src={InstagramTextLogo} alt="" />
          </div>
          <p className="text-[17px] font-semibold text-[#8e8e8e] text-center mb-6">
            Arkadaşlarının fotoğraf ve videolarını görmek için kaydol.
          </p>
          <Button>
            <AiFillFacebook size={20} /> Login with facebook
          </Button>
          <Separator></Separator>

          <div className="grid gap-y-3">
            <MyForm message="Sign In" dispatch={dispatch} navigate={navigate} />
          </div>
        </div>

        <div className="w-[351px] bg-white border p-4 text-sm text-center ">
          you Have a account?{" "}
          <Link to={"SignIn"}>
            <span className="font-semibold text-brand">Sign In</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
