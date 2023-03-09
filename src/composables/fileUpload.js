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

  await fetch(`${config.apiUrl}/FileUploader?folder=recipes`, {
    method: "POST",
    mode: "cors",
    body: formData,
    headers: authHeader(),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Image can not be uploaded");
      }

      return response.json();
    })
    .then((data) => {
      if (data.message) {
        uploadResult.message = data.message;
      } else {
        uploadResult.success = true;
        uploadResult.url = data.url;
      }
    })
    .catch((err) => {
      uploadResult.message = err.message;
      return uploadResult;
    });

  return uploadResult;
}

export default uploadImage;
