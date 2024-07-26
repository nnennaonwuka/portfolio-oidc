import { NextFunction, Request, Response } from "express";

// Import the Google Cloud Storage SDK and the csv-writer package
const { Storage } = require("@google-cloud/storage");
const csv = require("csv-writer").createObjectCsvStringifier;

// Create a new instance of the Storage class
const storage = new Storage();

// Define the name of the bucket you want to extract the object names from
const bucketName = "babbangona-prod-bucket-2";

const folderName = "agrios/portfolio_manager_prod/payment_collection/";
const currentDate = new Date();
const timestamp = currentDate.getTime();
// Construct the download path

class PaymentReceiptDownloadController {
  public downloadObjectName = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const [files] = await storage.bucket(bucketName).getFiles({
        prefix: `${folderName}`,
      });

      // Map over the files to create an array of objects with the name property
      const fileObjects = files.map((file) => {
        return {
          name: file.name.slice(74, 84),
          link: `https://storage.googleapis.com/babbangona-prod-bucket-2/${file.name}`,
        };
      });

      // Create a new instance of the csv-writer and define the headers and path to the CSV file
      const csvStringifier = csv({
        header: [
          { id: "name", title: "IK Number" },
          { id: "link", title: "Image Download Links" },
        ],
      });

      // Generate the CSV data in memory
      const csvData =
        csvStringifier.getHeaderString() +
        csvStringifier.stringifyRecords(fileObjects);
      // Set the headers for the response
      res.setHeader("Content-Type", "text/csv");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename=payment-collection_${timestamp}.csv`
      );

      res.send(csvData);
    } catch (err) {
      console.error("Error listing objects:", err);
      next(err);
    }
  };
}

// Call the listObjects function to extract the object names and export them to a CSV file
export default PaymentReceiptDownloadController;
