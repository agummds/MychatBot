import './upload.css'
import React from 'react'
import { IKContext, IKImage } from 'imagekitio-react';

const urlEndpoint =import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
;
const publicKey = import.meta.env.IMAGE_KIT_PUBLIC_KEY; 
const authenticator =  async () => {
    try {
        const response = await fetch('http://localhost:2000/api/upload');

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Request failed with status ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        const { signature, expire, token } = data;
        return { signature, expire, token };
    } catch (error) {
        throw new Error(`Authentication request failed: ${error.message}`);
    }
};

const Upload = () => {
  return (
    <div>
      
    </div>
  )
}

export default Upload
