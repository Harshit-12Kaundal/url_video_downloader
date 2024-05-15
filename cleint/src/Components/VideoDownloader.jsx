import React, { useState } from 'react';
import axios from 'axios';

const VideoDownloader = () => {
    const [url, setUrl] = useState('');
    const [message, setMessage] = useState('');

    const handleDownload = async () => {
        try {
            const response = await axios.post('http://localhost:5001/api/video/download', { url });
            const blob = new Blob([response.data], { type: 'video/mp4' });
            const downloadUrl = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = 'video.mp4';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link); // Clean up the DOM
            setMessage('Download successfully!');
        } catch {
            setMessage('Download failed');
        }
    };

    return (
        <div>
            <input
                type="text"
                value={url} // Corrected the syntax here
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter the URL"
            />
            <button onClick={handleDownload}>Download</button>

            {message && <p>{message}</p>}
        </div>
    );
};

export default VideoDownloader; // Corrected the component name
