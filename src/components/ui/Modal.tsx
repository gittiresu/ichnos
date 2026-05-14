// components/ui/Modal.tsx
import { useEffect, useState } from "react";

export default function Modal({ isOpen, onClose, content, type }: { isOpen: boolean; onClose: () => void; content: any; type: string }) {
  if (!isOpen) return null;

  const [htmlContent, setHtmlContent] = useState("");
  let files: any;
  if(type === "news") {
    files = import.meta.glob(`../../customizations/news/*.html`, {
      query: "?raw",
      import: "default",
      eager: true
    });
  } else if (type === "positions") {
    files = import.meta.glob(`../../customizations/positions/*.html`, {
      query: "?raw",
      import: "default",
      eager: true
    });
  } 
  
  useEffect(() => {
    if (!content?.htmlText || !isOpen) return;
    const html = getFileContent(content.htmlText);
    if (html.length > 0) {
      setHtmlContent(html);
    } else {
      console.error("Error loading HTML: File not found", content.htmlText);
      setHtmlContent("<p>Content not available.</p>");
    }
  }, [content?.htmlText, isOpen]);

  function getFileContent(filename: string): string {
    const keys = Object.keys(files);
    let entry = "";
    keys.forEach((key) => {
      let name = key.split("/").pop() || "";
      if (name.length > 0 && name === filename) entry = files[key] as string;
    });
    return entry;
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content prose max-w-none"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="close-btn" onClick={onClose}>
          ×
        </button>

        <h2 style={{ position: 'absolute', margin: '0' }}>{content?.title}</h2>
        {/* Safe HTML rendering */}
        <div
          style={{ paddingTop: '2rem' }}
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </div>

    </div>
  );
}