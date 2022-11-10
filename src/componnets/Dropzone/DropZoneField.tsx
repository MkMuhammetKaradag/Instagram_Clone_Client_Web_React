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
        <div>
          {file.type == "image/png" && (
            <img className="w-[50px]" src={URL.createObjectURL(file)}></img>
          )}
          {file.type == "video/mp4" && (
            <video className="w-[50px]" src={URL.createObjectURL(file)}></video>
          )}
        </div>
      );
    }
  };

  return (
    <div>
      <div className="flex justify-center items-center w-full">
        <label className="flex flex-col justify-center items-center w-full h-64 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
          <div className="flex flex-col justify-center items-center pt-5 pb-6">
            {file ? (
              <aside>
                <h4>Files</h4>
                {fileList()}
              </aside>
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
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
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
