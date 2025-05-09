import { IncomingForm } from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(req :any, res:any) {
  const uploadDir = path.join(process.cwd(), '/public/uploads');

  // ensure directory exists
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const form = new IncomingForm({
    uploadDir,
    keepExtensions: true,
  });

  form.parse(req, (err:any, fields:any, files:any) => {
    if (err) {
      return res.status(500).json({ error: 'File upload failed' });
    }

    const uploadedFile = files.file?.[0]; // 'lang_image' is the FormData key

    if (!uploadedFile) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Construct file path for public access
    const filePath = `/uploads/${uploadedFile.newFilename}`;

    return res.status(200).json({ path: filePath });
  });
}
