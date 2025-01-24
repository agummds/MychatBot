import React from "react";
import { useRef, useEffect, useState } from "react";
import "./newPrompt.css";
import Upload from "../upload/Upload";
import { IKImage } from "imagekitio-react";
import model from "../../lib/gemini";

const NewPrompt = () => {
  const [img, setImg] = useState({
    isLoading: false,
    error: "",
    dbData: {},
  });

  const endRef = useRef(null);

  useEffect(() => {
    endRef.current.scrollIntoView({ behavior: "smooth" });
  }, []);

  const add = async () => {
    const prompt =
      "Anda adalah chatbot khusus pengadaan barang dan harga pasar. Tolong jawab hanya jika pertanyaan relevan dengan pengadaan barang atau informasi harga pasar. Jika tidak, jawab dengan 'Maaf, saya hanya dapat membantu dengan pengadaan barang dan harga pasar'";
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);
  };

  return (
    <>
      {img.isLoading && <div className="">Loading...</div>}
      {img.dbData?.filePath && (
        <IKImage
          urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
          path={img.dbData?.filePath}
          width="200"
        />
      )}
      <button onClick={add}>Test dulu</button>
      <div className="endChat" ref={endRef}></div>
      <form className="newForm">
        <Upload setImg={setImg} />
        <input id="file" type="file" multiple={false} hidden />
        <input type="text" placeholder="Tanya lah..." />
        <button>
          <img
            src="https://www.pngmart.com/files/3/Up-Arrow-PNG-Transparent-Image.png"
            alt=""
          />
        </button>
      </form>
    </>
  );
};

export default NewPrompt;
