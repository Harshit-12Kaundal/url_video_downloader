import React, { useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const VideoDownloader = () => {
  const [url, setUrl] = useState('');
  const [message, setMessage] = useState('');

  const handleDownload = async () => {
    try {
      const filename = `${uuidv4()}.mp4`;

      // Assuming your backend server is running on http://localhost:5001
      const response = await axios.post('http://localhost:5001/api/video/download', { url, filename });

      // Check for successful response status code (e.g., 200)
      if (response.status === 200) {
        const blob = new Blob([response.data], { type: 'video/mp4' });
        const downloadUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link); // Clean up the DOM
        setMessage('Download successfully!');
      } else {
        setMessage(`Download failed (Status code: ${response.status})`);
      }
    } catch (error) {
      setMessage('Download failed: ' + error.message); // More specific error message
    }
  };

  return (
    <div className="p-4">
      <input
        className="border border-gray-400 rounded px-4 py-2 mb-4"
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter the URL"
      />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleDownload}
        disabled={!url}
      >
        Download
      </button>
      {message && <p className="text-green-500 mt-4">{message}</p>}
    </div>
  );
};

export default VideoDownloader;
