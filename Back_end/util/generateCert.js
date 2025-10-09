const path = require("path");
const { createCanvas, loadImage } = require("canvas");
const cloudinary = require("../config/coudinary");
const stream = require("stream");

module.exports = async function generateAndUploadCertificate(
  firstName,
  lastName
) {
  try {
    // 2️⃣ Load certificate template from Canva
    const templatePath = path.join(
      require.main.path,
      "Certificate_of_Completion.png"
    );
    const template = await loadImage(templatePath);

    // 3️⃣ Create canvas and draw template
    const canvas = createCanvas(template.width, template.height);
    const ctx = canvas.getContext("2d");
    ctx.drawImage(template, 0, 0);

    // 4️⃣ Draw student's name
    const studentName = `${firstName} ${lastName}`;
    ctx.font = "48px Arial Bold";
    ctx.fillStyle = "#000000";
    ctx.textAlign = "center";
    const x = canvas.width / 2;
    const y = canvas.height / 2; // adjust as needed
    ctx.fillText(studentName, x, y);

    // 5️⃣ Export as PNG buffer
    const buffer = canvas.toBuffer("image/png");

    // 6️⃣ Upload buffer to Cloudinary
    const uploadedUrl = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: "image",
          folder: "certificates",
          public_id: `certificate-${firstName}-${lastName}`,
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result.secure_url);
        }
      );
      // Pipe buffer into Cloudinary upload stream
      const bufferStream = new stream.PassThrough();
      bufferStream.end(buffer);
      bufferStream.pipe(uploadStream);
    });

    console.log("✅ Certificate uploaded:", uploadedUrl);
    return uploadedUrl; // Save this URL in your DB
  } catch (err) {
    console.error("❌ Error generating/uploading certificate:", err);
    throw err;
  }
};
