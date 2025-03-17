import React from "react";
import { useRef, useEffect, useState, formRef } from "react";
import "./newPrompt.css";
import Upload from "../upload/Upload";
import { IKImage } from "imagekitio-react";
import model from "../../lib/gemini";
import Markdown from "react-markdown";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const NewPrompt = ({ data }) => {
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
  const formRef = useRef(null);

  useEffect(() => {
    endRef.current.scrollIntoView({ behavior: "smooth" });
  }, [data, question, answer, img.dbData]);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => {
      return fetch(`${import.meta.env.VITE_API_URL}/api/chats/${data._id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: question.length ? question : undefined,
          answer,
          img: img.dbData?.filePath || undefined,
        }),
      }).then((res) => res.json());
    },
    onSuccess: () => {
      queryClient
        .invalidateQueries({ queryKey: ["chat", data._id] })
        .then(() => {
          formRef.current.reset();
          setQuestion("");
          setAnswer("");
          setImg({
            isLoading: false,
            error: "",
            dbData: {},
            aiData: {},
          });
        });
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const add = async (text, isInitial) => {
    if(!isInitial) setQuestion(text);

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
      mutation.mutate();
    } catch (eror) {
      setAnswer("Maaf, saya belum bisa memproses permintaan Anda.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const text = e.target.text.value;
    if (!text) return;

    add(text, false);
  };

  const hasRun = useRef(false)
  useEffect(() => {
    if (!hasRun.current){

      if (data?.history?.length === 1) {
        add(data.history[0].parts[0].text, true);
      }
    }
    hasRun.current = true;
  },[]);

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
      <form className="newForm" onSubmit={handleSubmit} ref={formRef}>
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
