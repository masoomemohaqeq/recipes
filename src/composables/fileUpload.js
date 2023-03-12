import axios from "axios";

import { config } from "@/configurations/config";
import { authHeader } from "@/helpers/authHeader";

async function uploadImage(file) {
  const uploadResult = {
    success: false,
    url: null,
    message: null,
  };

  if (file && file.length > 0) {
    throw new Error("Please select image");
  }
  const formData = new FormData();

  formData.append("file", file);

  await axios
    .post(`${config.apiUrl}/FileUploader/Upload?folder=recipes`, formData, {
      mode: "cors",
      headers: authHeader(),
    })
    .then((response) => {
      if (response.data.message) {
        uploadResult.message = response.data.message;
      } else {
        uploadResult.success = true;
        uploadResult.url = response.data.url;
      }
    })
    .catch((err) => {
      uploadResult.message = err;
      return uploadResult;
    });

  return uploadResult;
}

export default uploadImage;
