const BaseURL = "http//localhost:3000";

async function PostImage() {
  const formData = new FormData();
  formData.append("file", image);

  const response = await fetch(`${BaseURL}/upload`, {
    method: "POST",
    body: formData,
  });

  console.log(response);
  //   const data = await response.json();
}

PostImage();
