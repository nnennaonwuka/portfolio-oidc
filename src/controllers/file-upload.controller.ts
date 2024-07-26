import {
  GCS_PROJECT_ID,
  GCS_PRIVATE_KEY,
  GCS_CLIENT_EMAIL,
  GCS_BUCKET,
  GCS_AUDIOS_PATH,
  GCS_PICTURES_PATH,
  GCS_PAYMENT_COLLECTION_PATH,
} from "@config";
import { Storage } from "@google-cloud/storage";

class FileUploadController {
  storage = new Storage({
    projectId: GCS_PROJECT_ID,
    credentials: {
      client_email: GCS_CLIENT_EMAIL,
      private_key: GCS_PRIVATE_KEY,
    },
  });
  bucket = this.storage.bucket(GCS_BUCKET);

  public uploadFile = async (req, res) => {
    if (!req.file) {
      return res.status(400).send({ message: "Please upload a file!" });
    }

    const filePath = req.file.path;
    const fileName = req.file.originalname.split(/\s+/).join("_");
    const destinationPathPictures = GCS_PICTURES_PATH;
    const destinationPathAudios = GCS_AUDIOS_PATH;

    const fileIsPicture = req.file.mimetype.includes("image");
    const fileIsAudio = req.file.mimetype.includes("audio");
    try {
      if (fileIsPicture) {
        await this.bucket.upload(filePath, {
          destination: destinationPathPictures + fileName,
        });
      } else if (fileIsAudio) {
        await this.bucket.upload(filePath, {
          destination: destinationPathAudios + fileName,
        });
      } else {
        return res.status(400).send({
          message: "Please upload the correct file type - audio or image!",
        });
      }
    } catch (err) {
      return res.status(500).send({
        message: err,
      });
    }
    const baseURL = `https://storage.googleapis.com/${this.bucket.name}/`;
    const midURL = fileIsAudio
      ? destinationPathAudios
      : destinationPathPictures;
    res.status(200).send({
      message: "Uploaded the file successfully: " + fileName,
      publicURL: baseURL + midURL + fileName,
    });
  };

  public uploadPaymentColectionFile = async (req, res) => {
    if (!req.file) {
      return res.status(400).send({ message: "Please upload a file!" });
    }

    const filePath = req.file.path;
    const fileName = req.file.originalname.split(/\s+/).join("_");
    const destinationPath = GCS_PAYMENT_COLLECTION_PATH;

    const fileIsPicture = req.file.mimetype.includes("image");
    try {
      if (fileIsPicture) {
        await this.bucket.upload(filePath, {
          destination: destinationPath + fileName,
        });
      } else {
        return res.status(400).send({
          message: "Please upload the correct file type - image!",
        });
      }
    } catch (err) {
      return res.status(500).send({
        message: err,
      });
    }
    const baseURL = `https://storage.googleapis.com/${this.bucket.name}/`;
    const midURL = destinationPath;
    res.status(200).send({
      message: "Uploaded the file successfully: " + fileName,
      publicURL: baseURL + midURL + fileName,
    });
  };

  public bulkUploadFiles = async (req, res) => {
    if (req.files.length < 1) {
      return res.status(400).send({ message: "Please upload a file!" });
    }

    const destinationPathPictures = GCS_PICTURES_PATH;
    const destinationPathAudios = GCS_AUDIOS_PATH;

    const uploadedFiles = [];

    for (const file of req.files) {
      const filePath = file.path;
      const fileName = file.originalname.split(/\s+/).join("_");

      console.log(fileName);

      const fileIsPicture = file.mimetype.includes("image");
      const fileIsAudio = file.mimetype.includes("audio");
      try {
        if (fileIsPicture) {
          await this.bucket.upload(filePath, {
            destination: destinationPathPictures + fileName,
          });
        } else if (fileIsAudio) {
          await this.bucket.upload(filePath, {
            destination: destinationPathAudios + fileName,
          });
        } else {
          uploadedFiles.push({
            message: "Please upload the correct file type - audio or image!",
            status: 0,
          });
        }
      } catch (err) {
        uploadedFiles.push({
          message: file.originalname + " file not uploaded",
          status: 0,
          err,
        });
      }

      if (fileIsAudio || fileIsPicture) {
        const baseURL = `https://storage.googleapis.com/${this.bucket.name}/`;
        const midURL = fileIsAudio
          ? destinationPathAudios
          : destinationPathPictures;
        uploadedFiles.push({
          message: "Uploaded the file successfully: " + fileName,
          publicURL: baseURL + midURL + fileName,
          status: 1,
        });
      }
    }

    res.status(200).send({
      message: "Uploaded the files successfully",
      data: uploadedFiles,
    });
  };
}

export default FileUploadController;
