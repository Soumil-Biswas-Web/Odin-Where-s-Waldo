import { useForm } from "react-hook-form"
import { FaCloudUploadAlt } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Components/Button";

export default function UploadFile() {

    const [file, setFile] = useState(null);
    const navigate = useNavigate();
    const handleFileChange = (e) => {
        setFile(e.target.files[0].name);
    };

    const {
        register,
        handleSubmit,
        watch,
        getValues,
        formState: { errors },
    } = useForm()

    let fr = new FileReader();

    fr.onload = function(e) { 
        // console.log(e);
        let result = JSON.parse(e.target.result);
        let formatted = JSON.stringify(result, null, 2);
        // console.log(formatted);

        let id = result.HardwareID;
        // console.log(id);
        // Navigate to /displaypage/:id and pass the JSON data as state
        navigate(`/display`, { state: { data: result } });
    }        
    
    const onSubmit = (data) => {
        let file = data.uploadFile[0];
        // console.log(file)
        fr.readAsText(file);
        // window.location.href = "/display";      
    }
    
    return (
        <div className="flex flex-col items-center h-[70vh] mt-32 justify-center">
          <h2 className="text-center text-2xl font-semibold text-gray-400 mb-6">
             No Account? No Problem!
          </h2>
    
          <div className="border-4 border-dashed  p-6 rounded-lg flex flex-col items-center m-4 border-gray-400">
                <FaCloudUploadAlt className=" text-4xl mb-2 text-gray-400" />
                <label
                    htmlFor="file-upload"
                    className="cursor-pointer bg-[--highlight-color] text-[--background-color] font-bold py-2 px-4 rounded-md hover:bg-[--highlight-hover-color]"
                >
                    + Choose files
                </label>
                <form 
                    className="flex flex-col items-center"
                    onSubmit={handleSubmit(onSubmit)}
                    id="file-form"
                >
                    <input
                        id="file-upload"
                        type="file"
                        accept=".json"
                        className="hidden"
                        {...register("uploadFile", { 
                            required: "Upload a data file before proceeding!", 
                            onChange: handleFileChange
                        })}
                    />
                    {errors.uploadFile && (
                        <p className="text-red-500 text-sm">{errors.uploadFile.message}</p>
                    )}
                    <p className="text-gray-400 mt-2">Add a hardware.json data file produced by the Ferrum Web desktop client.</p>
                    {file && (
                        <p className="mt-2 text-[--contrast-color-offset] font-medium">{file}</p>
                    )}
                    <Button text={"Submit"} isSubmit={true}></Button>
                </form>
          </div>
        </div>
    );
}