import React from "react";
import { useRef, useEffect, useState } from "react";
import "./newPrompt.css";
import Upload from "../upload/Upload";
import { IKImage } from "imagekitio-react";
import model from "../../lib/gemini";
import Markdown from "react-markdown";

const NewPrompt = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [img, setImg] = useState({
    isLoading: false,
    error: "",
    dbData: {},
    aiData: {},
  });

  const chat = model.startChat({
    history: [
      {
        role: "user",
        parts: [{ text: "Hello" }],
      },
      {
        role: "model",
        parts: [{ text: "hai juga" }],
      },
    ],
    generationConfig: {},
  });

  const endRef = useRef(null);

  useEffect(() => {
    endRef.current.scrollIntoView({ behavior: "smooth" });
  }, [question, answer, img.dbData]);

  const add = async (text) => {
    setQuestion(text);

    // Tambahan konteks untuk mempersempit ruang lingkup pertanyaan
    const enhancedPrompt = `
     Anda adalah asisten AI spesialis pengadaan barang/jasa pemerintah di Indonesia. Tugas Anda adalah membantu masyarakat memahami dan menanyakan informasi terkait proses pengadaan barang/jasa pemerintah, termasuk proyek pembangunan dan pengadaan layanan publik. 
     Anda dapat memberikan penjelasan tentang:
     - Regulasi dan prosedur pengadaan barang/jasa (misalnya, Perpres 16/2018).
     - Tahapan proses lelang atau tender.
     - Cara masyarakat dapat mengawasi proyek pembangunan pemerintah.
     - Informasi umum tentang proyek yang sedang berlangsung atau direncanakan pemerintah.
     Jika pengguna memberikan data atau pertanyaan yang tidak relevan dengan pengadaan barang/jasa atau proyek pemerintah, berikan jawaban: "Maaf, saya hanya dapat membantu terkait pengadaan barang/jasa pemerintah atau proyek pemerintah."
     Jika pengguna mengakhiri percakapan, tutup dengan: "Terima kasih telah menggunakan layanan saya. Sampai jumpa!"
     Berikut adalah pertanyaan pengguna:
     "${text}"
        `;

    try {
      const result = await chat.sendMessageStream(
        enhancedPrompt,
        Object.entries(img.aiData).length ? [img.aiData, text] : [text]
      );
      let accumutatedText = "";
      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        console.log(chunkText);
        accumutatedText += chunkText;
        setAnswer(accumutatedText);
      }
    } catch (eeror) {
      setAnswer("Maaf, saya belum bisa memproses permintaan Anda.");
    }
    setImg({ isLoading: false, error: "", dbData: {}, aiData: {} });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const text = e.target.text.value;
    if (!text) return;
    add(text);
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

      {question && <div className="message user">{question}</div>}
      {answer && (
        <div className="message">
          <Markdown>{answer}</Markdown>
        </div>
      )}

      <div className="endChat" ref={endRef}></div>
      <form className="newForm" onSubmit={handleSubmit}>
        <Upload setImg={setImg} />
        <input id="file" type="file" multiple={false} hidden />
        <input type="text" name="text" placeholder="Tanya lah..." />
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
