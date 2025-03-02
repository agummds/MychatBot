import React, { useRef } from "react";
import { Instagram, Twitter, Linkedin } from "lucide-react";

const Contact = () => {
  return (
    <div className="Explore">
      <h1>RAKYAT by Agum Medisa</h1>
      <div className="social-media">
      <h3>Follow Me</h3>
      <div className="icons">
        <a href="https://instagram.com/agum_mds" target="_blank" rel="noopener noreferrer">
          <Instagram size={30} />
        </a>
        <a href="https://twitter.com/gumgums_" target="_blank" rel="noopener noreferrer">
          <Twitter size={30} />
        </a>
        <a href="https://linkedin.com/in/agummedisa" target="_blank" rel="noopener noreferrer">
          <Linkedin size={30} />
        </a>
      </div>
    </div>
    </div>
  );
}
export default Contact;

