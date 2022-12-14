import React, { KeyboardEventHandler } from "react";
// import { useTheme } from "@mui/material/styles";
// import MobileStepper from "@mui/material/MobileStepper";
// import Paper from "@mui/material/Paper";
// import Typography from "@mui/material/Typography";
// import Button from "@mui/material/Button";
// import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
// import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { BsArrowLeft } from "react-icons/bs";
// import { Box } from "@mui/material";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Avatar, StepLabel } from "@mui/material";

import { DropzoneArea } from "material-ui-dropzone";
import DropZoneField from "../Dropzone/DropZoneField";
import { TextField } from "@mui/material";
import CreatableSelect from "react-select/creatable";
import { postUserPostCreated } from "../../api";
const steps = [
  "Resim Veya Video Seç",
  "Açıklama Etiket olutur",
  "Gönderinizi Paylaşın",
];
const components = {
  DropdownIndicator: null,
};

interface Option {
  readonly label: string;
  readonly value: string;
}

const createOption = (label: string) => ({
  label,
  value: label,
});

type createdPostPropType = {
  userImage?: string;
  userNickName?: string;
};
const CreatedPost = ({ userImage, userNickName }: createdPostPropType) => {
  //   const theme = useTheme();
  //   const [activeStep, setActiveStep] = React.useState(0);
  //   const maxSteps = 3;

  //   const handleNext = () => {
  //     setActiveStep((prevActiveStep) => prevActiveStep + 1);
  //   };

  //   const handleBack = () => {
  //     setActiveStep((prevActiveStep) => prevActiveStep - 1);
  //   };

  const [activeStep, setActiveStep] = React.useState(0);
  const [postFiles, setPostFiles] = React.useState<File[]>([]);
  const [completed, setCompleted] = React.useState<{
    [k: number]: boolean;
  }>({});

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  const [file, setFile] = React.useState<File>();
  //   const [hashtags, sethashtags] = React.useState<string[]>([]);
  const [fileType, setFileType] = React.useState<string>("IMAGE");
  const [description, setDescription] = React.useState<string>("");
  const [inputValue, setInputValue] = React.useState("");
  const [hashtags, setHashtags] = React.useState<readonly Option[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const createdPostSubmit = () => {
    // console.log("file", file);
    // console.log(
    //   "hastag:",
    //   hashtags.map((item) => item.label)
    // );
    // console.log("filetype:", file?.type.includes("video"));
    // console.log("descriptpin:", description);
    // console.log({
    //   file,
    //   hashtags: hashtags.map((item) => item.label),
    //   type: file?.type.includes("video") ? "VIDEO" : "IMAGE",
    //   description,
    // });
    if (file && description && hashtags.length > 0) {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("file", file, file.name);
      formData.append("image_url", "");
      formData.append("video_url", "");
      formData.append("description", description);
      formData.append(
        "hashtags",
        hashtags.map((item) => item.label).toString()
      );
      formData.append("type", file?.type.includes("video") ? "VIDEO" : "IMAGE");

      postUserPostCreated(formData)
        .then((res) => {
          setFile(undefined);
          setDescription("");
          setHashtags([]);
        })
        .catch((err) => console.log(err))
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const handleKeyDown: KeyboardEventHandler = (event) => {
    if (!inputValue || inputValue.length < 3 || hashtags.length > 6) return;
    switch (event.key) {
      case "Enter":
      case "Tab":
        if (!hashtags.some((item) => item["label"] === inputValue)) {
          setHashtags((prev) => [...prev, createOption(inputValue)]);
          setInputValue("");
          event.preventDefault();
        }
    }
  };
  return (
    <div>
      {/* <div className="border-b h-[40px] flex items-center justify-center w-full">
        Yeni Gönderi oluştur
      </div> */}
      {/* <Box sx={{ flexGrow: 1 }}>
        <MobileStepper
          steps={maxSteps}
          variant="text"
          position="static"
          activeStep={activeStep}
          nextButton={
            <Button
              size="small"
              onClick={handleNext}
              disabled={activeStep === maxSteps - 1}
            >
              İleri
            </Button>
          }
          backButton={
            <button onClick={handleBack} disabled={activeStep === 0}>
              {theme.direction === "rtl" ? (
                <BsArrowLeft className="disabled:bg-gray-400" size={35} />
              ) : (
                <BsArrowLeft
                  className={activeStep === 0 ? `text-gray-400` : ""}
                  size={24}
                />
              )}
            </button>
          }
        />
        <Paper
          square
          elevation={0}
          sx={{
            display: "flex",
            alignItems: "center",
            height: 50,
            pl: 2,
            bgcolor: "background.default",
          }}
        >
          <Typography>{activeStep}as</Typography>
        </Paper>
        <Box sx={{ height: 255, maxWidth: 400, width: "100%", p: 2 }}>
          {activeStep}
        </Box>
      </Box> */}
      <Box sx={{ width: "100%" }}>
        <div className="border-b h-[40px] flex items-center justify-between w-full px-2">
          <button onClick={handleBack} disabled={activeStep === 0}>
            <BsArrowLeft
              className={activeStep === 0 ? `text-gray-400` : ""}
              size={32}
            />
          </button>
          <span>{steps[activeStep]}</span>

          <button
            className="text-brand disabled:text-gray-400"
            onClick={handleNext}
            disabled={activeStep === 2}
          >
            İleri
          </button>
        </div>
        <div>
          <div className="flex">
            {activeStep >= 0 && (
              <DropZoneField file={file} setFile={setFile}></DropZoneField>
            )}
            {activeStep == 1 && (
              <div className="flex flex-col mx-2  w-[300px] ">
                <div className="my-2 flex items-center gap-x-2">
                  <Avatar
                    sx={{
                      width: 35,
                      height: 35,
                    }}
                    src={userImage}
                  ></Avatar>
                  <span>{userNickName}</span>
                </div>
                <TextField
                  id="outlined-multiline-flexible"
                  className=" outline-none  w-full px-2 placeholder:text-gray-600 text-sm  focus:placeholder:text-gray-300"
                  multiline
                  rows={4}
                  maxRows={4}
                  inputProps={{ maxLength: 200 }}
                  placeholder="Description..!!!"
                  value={description}
                  variant="standard"
                  onChange={(e) => setDescription(e.target.value)}
                />
                <div className="relative mt-2">
                  <Typography>Select Hastag: </Typography>
                  <CreatableSelect
                    className="h-[20px] w-full"
                    components={components}
                    inputValue={inputValue}
                    isClearable
                    isMulti
                    menuIsOpen={false}
                    onChange={(newValue) => setHashtags(newValue)}
                    onInputChange={(newValue) => setInputValue(newValue)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type something and press enter..."
                    value={hashtags}
                  />
                </div>
              </div>
            )}
            {activeStep == 2 && (
              <div className="flex justify-center items-center mr-2">
                <button
                  className="py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center"
                  onClick={createdPostSubmit}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div>
                      <svg
                        aria-hidden="true"
                        role="status"
                        className="inline mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="#1C64F2"
                        />
                      </svg>
                      Loading...
                    </div>
                  ) : (
                    <span>Post oluştur</span>
                  )}
                </button>
              </div>
            )}

            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}></Box>
          </div>
        </div>
      </Box>
    </div>
  );
};

export default CreatedPost;
