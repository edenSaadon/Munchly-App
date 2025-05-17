const axios = require("axios");
const fs = require("fs");

const image = fs.readFileSync("fridge.jpg", { encoding: "base64" });

axios({
  method: "POST",
  url: "https://serverless.roboflow.com/group_work/2",
  params: {
    api_key: "RldnQMeIpmAdqb2XMlE3", // תכניסי את המפתח שראית או שנמצא לך ב-Account settings
  },
  data: image,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
})
  .then((res) => {
    console.log("🧊 פריטים שזוהו:");
    console.log(JSON.stringify(res.data, null, 2));
  })
  .catch((err) => {
    console.log("❌ שגיאה:");
    console.log(err.response?.data || err.message);
  });
