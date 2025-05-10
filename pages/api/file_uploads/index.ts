import { IncomingForm } from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false, // Required for formidable
  },
};

export default function handler(req: any, res: any) {
  const form = new IncomingForm({
    keepExtensions: true,
    multiples: false, // Set to true if uploading multiple files
  });

  form.parse(req, async (err: any, fields: any, files: any) => {
    if (err) {
      return res.status(500).json({ error: 'File upload failed', details: err });
    }

    const uploadedFile = files.file?.[0]; // `file` must match the formData key
    const relativePath = fields.path?.[0]; // e.g., /uploads/language_images
    const customFileName = fields.file_name?.[0]; // e.g., image.png

    if (!uploadedFile || !relativePath || !customFileName) {
      return res.status(400).json({ error: 'Missing file or path or filename' });
    }

    const targetDir = path.join(process.cwd(), 'public', relativePath);

    // Ensure the target directory exists
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    const finalPath = path.join(targetDir, customFileName);

    try {
      // Move uploaded file to the new location with desired name
      fs.renameSync(uploadedFile.filepath, finalPath);

      // Return only the relative path (public URL)
      return res.status(200).json({ path: `${relativePath}/${customFileName}` });
    } catch (moveError) {
      return res.status(500).json({ error: 'Failed to move file', details: moveError });
    }
  });
}
