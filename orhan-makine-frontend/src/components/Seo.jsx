import { useEffect } from "react";

const Seo = ({ title, description, canonical }) => {
  useEffect(() => {
    // Title güncelle
    if (title) {
      document.title = title;
    }

    // Meta description güncelle
    if (description) {
      let meta = document.querySelector("meta[name='description']");
      if (!meta) {
        meta = document.createElement("meta");
        meta.name = "description";
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", description);
    }

    // Canonical link ekle/güncelle
    if (canonical) {
      let link = document.querySelector("link[rel='canonical']");
      if (!link) {
        link = document.createElement("link");
        link.rel = "canonical";
        document.head.appendChild(link);
      }
      link.setAttribute("href", canonical);
    }
  }, [title, description, canonical]);

  return null;
};

export default Seo;