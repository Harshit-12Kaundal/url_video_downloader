import express from 'express';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import mime from 'mime'; 
const router = express.Router()

// Function to download the video
const downloadVideo = async (url) => {
  try {
    const response = await axios.get(url, { responseType: 'arraybuffer' });

    // Check if compression-related headers are present
    const contentEncoding = response.headers['content-encoding'];
    if (contentEncoding === 'gzip') {
      // Decompress data if gzipped
      const decompressedData = zlib.gunzipSync(response.data);
      return decompressedData;
    }

    return response.data;
  } catch (err) {
    throw new Error('Failed to download video');
  }
};

// Function to get content type
const getType = async (data) => {
  // Implement your logic to determine content type here
  // For example, you can use the 'mime' module
  return mime.getType('.mp4');
};

// Route to handle video download
router.post('/download', async (req, res) => {
  const { url, filename } = req.body;

  try {
    const videoData = await downloadVideo(url);

    // Detect content type from downloaded data
    const contentType = await getType(videoData);

    const uniqueFilename = filename || `${uuidv4()}.${mime.getExtension(contentType)}`;

    res.set({
      'Content-Disposition': `attachment; filename="${uniqueFilename}"`,
      'Content-Type': contentType, // Use detected content type
      'Cache-Control': 'no-store',
      'Pragma': 'no-cache',
      'Expires': '0',
    });

    res.send(videoData);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

export default router; // Export the router as the default export
