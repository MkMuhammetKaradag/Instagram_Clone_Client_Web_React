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
import { StepLabel } from "@mui/material";

import { DropzoneArea } from "material-ui-dropzone";
import DropZoneField from "../Dropzone/DropZoneField";
import { TextField } from "@mui/material";
import CreatableSelect from "react-select/creatable";
import { postUserPostCreated } from "../../api";
const steps = [
  "Yeni gönderi oluştur",
  "Yeni gönderi oluştur-1",
  "Yeni gönderi oluştur-2",
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
const CreatedPost = () => {
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
    if (file) {
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
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }
  };

  const [inputValue, setInputValue] = React.useState("");
  const [hashtags, setHashtags] = React.useState<readonly Option[]>([]);

  const handleKeyDown: KeyboardEventHandler = (event) => {
    if (!inputValue) return;
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
      <div className="border-b h-[40px] flex items-center justify-center w-full">
        Yeni Gönderi oluştur
      </div>
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
          {allStepsCompleted() ? (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>
                All steps completed - you&apos;re finished
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button onClick={handleReset}>Reset</Button>
              </Box>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {/* {activeStep == 0 && (
                // <DropzoneArea
                //   acceptedFiles={["video/*"]}
                //   maxFileSize={50_000_000}yarn remove 0
                //   initialFiles={postFiles}
                //   filesLimit={1}
                //   onChange={(file) => {
                //     setPostFiles(file);
                //   }}
                //   showPreviews={false}
                //   showFileNamesInPreview={false}
                //   dropzoneText="İçerik videosunu sürükle ve bırak."
                // />
              )} */}
              {/* <DropzoneArea
                onChange={(files) => console.log("Files:", files)}
              /> */}

              {activeStep == 0 && (
                <DropZoneField file={file} setFile={setFile}></DropZoneField>
              )}
              {activeStep == 1 && (
                <div className="flex bg-slate-300  items-center flex-col justify-center">
                  <TextField
                    id="outlined-multiline-flexible"
                    className="flex-1 outline-none  w-full px-2 placeholder:text-gray-600 text-sm  focus:placeholder:text-gray-300"
                    multiline
                    maxRows={4}
                    inputProps={{ maxLength: 200 }}
                    placeholder="Description..!!!"
                    value={description}
                    variant="standard"
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <div>naber </div>
                  <CreatableSelect
                    className="h-[20px] w-full "
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
              )}
              <button className="mt-20" onClick={createdPostSubmit}>
                Post oluştur
              </button>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}></Box>
            </React.Fragment>
          )}
        </div>
      </Box>
    </div>
  );
};

export default CreatedPost;
