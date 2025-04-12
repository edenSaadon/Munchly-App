const axios = require('axios');
const fs = require('fs'); 

// קריאת ה-Base64 מקובץ
const base64Image = fs.readFileSync('image_base64.txt', 'utf8'); 

if (!base64Image) {
  console.error("❌ Base64 image is empty or invalid");
  process.exit(1);  // יצא אם אין תמונה
}

const apiToken = 'ya29.c.c0ASRK0GYS5b3AbYyusJ6-amXUUxPWqPsEpqZ2uSd7XBySppNAsGMDyN15VEpeEssH3Ofc-VWIwo6loasz_nHgYgHSCcGLLNAY2LonD9zSmeMT1aAfzuO-1r2vtBqaIFTBzZSDUwHOxkVKW7_PQzjV5rCCl4XcsVnVrDJMzJW9h1VJqtoBQzI9f5xTLaPpJibZyalKAETgA49b2TUxQCROc9m4W8dPO88RjclG-cMhObjIgd8-vONL0AlLR9EgDKjS2UCxKKmAwbem17vqoa2lKouFws9QrXSvXQxhtB773FNEyQp5smZgnA_nfMEjQ6J1SHEeAcJ2eLfNaXfwyUmNCrp4U4Pfuarkc5j4Ssa4PRgjqpDjCph7LtUL384AO8b9syJnyiYRpQhnYaFIyjxymlzzp64iOOwmykzqgSfW5Ujk1U_5UyzaQ96I2Vr4Wmq6boXtvW850Z2R_0mU3rbeYeIr6ebFR7cyZRJYOwykBx1-0qoi4plilWtXS9enodfkbpsa2fXZ8S28Ie0cw2UtXZFz0eySW3WiYJ8UIc-jroymmrq3td9SZ_I-tvtsljbYef9RXddSrOqVguu9tfa9_dbxJe-nfV-vF9Ya4pkRo45YQcd1S-oY2aovgmeWc4-3zuIm_JoFfhs8V3SpWQrB84wtdi4_V3qmOktYIO8V8Vv-ttcWdp2SSfJ_caQh8atytdXZzY5Zt-p_69IQZjylM6h4ex2r2gkumRB7YBpXhjoMB3dxkvV0oOSY5si6yQqzy0uJmyddagpOljo4OgrZ5e-RpYQxZUZM1R9dQr1wfe2wxqBSqBW64ijbIf64By6krm886VivVc8pBhShjbqOvqxU1vy9puzhdkB4hdqe7pge8rdtxx45dIaqIVmVMi5Yz6ZuJ3bFo3I0-l0emQlF-equ9jz8_xu5MWvYlv3Y2_8pf_ir10zVQWlabr4ckYZy2ehBvUq-MVf2BRMxQ3Xo970436apW8XocvdV_sFR2W97B9s5JZmw54Q'; // הכנס כאן את ה-Access Token שלך


// נתיב ה-API של Google Vision
const visionApiUrl = 'https://vision.googleapis.com/v1/images:annotate';

// גוף הבקשה כולל את התמונה ב-Base64
const requestBody = {
  requests: [
    {
      image: {
        content: base64Image // כאן מכניסים את ה-Base64
      },
      features: [
        {
          type: 'LABEL_DETECTION', // סריקה לזיהוי תוויות בתמונה
          maxResults: 10
        }
      ]
    }
  ]
};

// שליחת הבקשה ל-Google Vision API
axios.post(visionApiUrl, requestBody, {
  headers: {
    Authorization: `Bearer ${apiToken}`,
    'Content-Type': 'application/json'
  }
})
  .then(response => {
    if (response.data.responses[0] && response.data.responses[0].labelAnnotations) {
      console.log('Google Vision Response:', response.data.responses[0].labelAnnotations);
    } else {
      console.error('❌ No labels detected or response is empty');
    }
  })
  .catch(error => {
    console.error('Error with Google Vision API:', error.response ? error.response.data : error.message);
  });
