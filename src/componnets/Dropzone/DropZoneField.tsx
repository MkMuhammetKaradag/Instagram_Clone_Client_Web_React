import React, { useState, useCallback, ReactNode } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";

type DropZoneFieldPropsType = {
  setFile: React.Dispatch<React.SetStateAction<File | undefined>>;
  file: File | undefined;
};
const DropZoneField = ({ setFile, file }: DropZoneFieldPropsType) => {
  const [files, setFiles] = useState<File[]>([]);
  const [fileUrl, setFileUrl] = useState("");
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [], "video/*": [] },
    onDrop: (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        console.log("accept:", acceptedFiles);
        setFiles(acceptedFiles.map((file) => file));
        setFileUrl(URL.createObjectURL(acceptedFiles[0]));
        setFile(acceptedFiles[0]);
      }
    },
  });
  //   console.log("mami:", files);
  //   console.log(files, "file url:", fileUrl);
  const fileList = (): ReactNode => {
    console.log(file);
    if (file) {
      return (
        <div className="max-w-[799px] max-h-[580px]">
          {file.type.includes("image") && (
            <img
              className="max-w-[799px] max-h-[580px]"
              src={URL.createObjectURL(file)}
            ></img>
          )}
          {file.type == "video/mp4" && (
            <div className="relative w-[799px] h-[580px]">
              <video
                className="h-full w-full"
                style={{
                  contain: "strict",
                }}
                src={URL.createObjectURL(file)}
              ></video>
              <div className="absolute top-0 right-0 text-red-900 font-semibold bg-white">
                video
              </div>
            </div>
          )}
        </div>
      );
    }
  };

  return (
    <div>
      <div className="flex justify-center items-center w-[800px]  p-2  h-[600px]">
        <label className="flex flex-col justify-center items-center w-full h-[580px]  mt-4 border-gray-300 border-dashed cursor-pointer dark:hover:bg-gray-100  hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 ">
          <div className="flex flex-col justify-center items-center pt-5 pb-6">
            {file ? (
              <aside>{fileList()}</aside>
            ) : (
              <svg
                aria-hidden="true"
                className="mb-3 w-10 h-10 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                ></path>
              </svg>
            )}

            <div {...getRootProps({ className: "dropzone" })}>
              <input {...getInputProps()} />
              {/* <p>Drag 'n' drop some files here, or click to select files</p> */}
            </div>

            {/* <img src={fileUrl} alt={"as"} />
            <video src={fileUrl}></video> */}
          </div>

          {/* <input id="dropzone-file" type="file" className="hidden" /> */}
        </label>
      </div>
    </div>
  );
};

export default DropZoneField;
