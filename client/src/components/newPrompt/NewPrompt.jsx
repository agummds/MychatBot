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
        Anda adalah asisten AI spesialis deteksi anomali dalam pengadaan barang/jasa pemerintah di Indonesia. Tugas Anda adalah membantu pengguna mengidentifikasi potensi penyimpangan dalam proses pengadaan dengan menganalisis data yang diberikan. 
        Fokuskan analisis Anda pada harga, kuantitas, spesifikasi, dan rekam jejak penyedia. Jika ada teks dalam data, lakukan analisis sentimen untuk mendeteksi potensi masalah. 
        Bandingkan data yang diberikan dengan data historis dan regulasi yang berlaku (misalnya, Perpres 16/2018). 
        Jika data tidak lengkap, ajukan pertanyaan lanjutan untuk mendapatkan informasi yang lebih akurat. 
        Sampaikan hasil analisis Anda dengan bahasa yang jelas, ringkas, dan objektif.    
        
        Hal yang perlu disampaikan :     
        1. Harga barang yang terlalu tinggi atau tidak sesuai dengan harga pasar.
        2. Kuantitas barang yang tidak wajar dibandingkan dengan kebutuhan proyek.
        3. Perbedaan signifikan dalam harga barang yang serupa di dokumen lain.
        4. Pola transaksi yang mencurigakan atau laporan pengadaan yang tidak konsisten.
        
        Cara kerja:
        - Jika pengguna memberikan data terkait pengadaan barang, analisis data tersebut dan identifikasi apakah ada anomali.
        - Jika ditemukan anomali, berikan laporan detail, seperti: "Harga barang ini 50% lebih tinggi dari rata-rata pasar."
        - Jika tidak ditemukan anomali, berikan jawaban: "Data pengadaan ini tidak menunjukkan adanya anomali."
        - Jika pertanyaan tidak relevan dengan pengadaan barang atau deteksi anomali, jawab: "Maaf, saya hanya dapat membantu dengan analisis pengadaan barang dan deteksi anomali."
        - Jika ada inputan gambar, silahkan lihat da analisa gambar itu. Jika dia berupa inputan gambar yang berhubungan dengan uang, barang dan juga masih berkaitan dengan pengadaaan barang
        maka jawab inputan itu dengan baik. Namun, jika inputan gambar tidak berhubungan dengan yang disebutkan diatas silahkan jawab bahwa gambar itu tidak ada kaitan dengan konteks dan akhiri percakapan

        Cara Menjawab:
        1. Mulai dengan kesimpulan singkat berdasarkan informasi awal.
        2. Jika informasi kurang lengkap, minta data tambahan secara spesifik.
        3. Hindari memberikan penjelasan panjang tanpa data pendukung.
        4. Sampaikan dengan gaya bahasa yang profesional namun mudah dipahami.
        
        Berikut adalah data atau pertanyaan yang diberikan pengguna:
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
