import { useRef, useState, useEffect } from "react";
import uploadCloud from "../../assets/Upload cloud.svg";
import deepreadAI from "../../assets/deepai.webp";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import type { UploadResponse } from "../../Service/interface";
import { _post } from "../../Service/ApiService";
import { UPLOADFILE } from "../../Service/useApiService";

const Upload: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileURL, setFileURL] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setFileURL(url);
    }
  };
  
const handleContinue = async () => {
  if (!selectedFile) {
    toast("Please select a file before continuing");
    return;
  }

  setLoading(true);

  try {
    const formData = new FormData();
    formData.append("file", selectedFile);
    
    const { data } = await _post<UploadResponse>(UPLOADFILE, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    });
    
    if (data) {
      toast.success(data.message || "File Uploaded Successfully");
      navigate(`/chat/${data.session_id}`);
    } else {
      toast.error("No data received from the server");
    }
  } catch (error: any) {
    console.error("Upload Error:", error);
    toast.error(error?.response?.data?.detail || "Upload failed");
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    return () => {
      if (fileURL) URL.revokeObjectURL(fileURL);
    };
  }, [fileURL]);

  const ContinueButton = () => (
    <button
      onClick={handleContinue}
      className="bg-[#128455] text-white font-medium lg:font-semibold w-[200px] lg:w-[352px] h-[52px] flex justify-between items-center shadow-lg cursor-pointer rounded-lg"
    >
      <span className="text-lg ml-4">Continue</span>
      <span className="lg:text-[3rem] text-[2rem] leading-none lg:mr-4 mr-2">→</span>
    </button>
  );

  return (
    <div className="h-screen w-full bg-white flex flex-col justify-start p-4 lg:p-8 gap-6">
      {/* Top row: DeepreadAI logo */}
      <div className="w-full flex justify-center">
        <img
          src={deepreadAI}
          alt="logo"
          className="h-[100px] w-[100px] mix-blend-multiply"
        />
      </div>

      <div className="flex flex-col lg:flex-row justify-center items-start gap-6 w-full">
        {/* Left Upload Box */}
        <div
          className={`flex flex-col items-center relative transition-all duration-500 ${
            selectedFile ? "lg:w-[30%]" : "w-full lg:w-[1500px]"
          }`}
        >
          <div
            onClick={handleUploadClick}
            className="cursor-pointer h-[500px] sm:h-[600px] lg:h-[700px] border-dotted border-2 border-[#525050] rounded-[20px] bg-[#F7F6F6] flex flex-col justify-center items-center gap-3 p-4 sm:p-8 w-full"
          >
            <img
              src={uploadCloud}
              alt="upload cloud"
              className="h-[80px] sm:h-[100px] lg:h-[120px] w-[80px] sm:w-[100px] lg:w-[120px]"
            />
            <div className="text-[24px] sm:text-[32px] lg:text-[40px] font-bold text-[#525050] text-center">
              Upload Your File Here
            </div>
            <p className="font-bold text-[12px] sm:text-[14px] lg:text-[16px] text-[#525050] text-center w-[80%] sm:w-[70%]">
              Uploaded file is safe and secure, we are not sharing with anyone
            </p>

            {selectedFile && (
              <p className="mt-2 sm:mt-4 text-[#128455] font-semibold text-sm sm:text-lg">
                Selected File: {selectedFile.name}
              </p>
            )}
          </div>

          {/* Continue button below upload box if no file selected */}
          {!selectedFile && (
            <div className="flex justify-end w-full mt-4">
              <ContinueButton />
            </div>
          )}
        </div>

        {/* Right PDF Preview */}
        {fileURL && (
          <div className="flex flex-col w-full lg:w-[60%] gap-4">
            <div className="h-[400px] sm:h-[500px] lg:h-[700px] overflow-auto border-dotted border-2 border-[#525050] bg-[#F7F6F6] rounded-[20px] p-2 flex justify-center items-start">
              <iframe
                src={fileURL}
                frameBorder={0}
                scrolling="auto"
                className="h-full w-full"
              ></iframe>
            </div>

            <div className="flex justify-end mt-4">
              <ContinueButton />
            </div>
          </div>
        )}
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
        accept="application/pdf"
      />
    </div>
  );
};

export default Upload;
