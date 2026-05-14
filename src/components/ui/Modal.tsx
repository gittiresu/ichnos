// components/ui/Modal.tsx
import { useEffect, useState } from "react";

export default function Modal({ isOpen, onClose, content, type }: { isOpen: boolean; onClose: () => void; content: any; type: string }) {
  if (!isOpen) return null;

  const [htmlContent, setHtmlContent] = useState("");
  let files: any;
  if(type === "news") {
    files = import.meta.glob(`../../utils/news/*.html`, {
      query: "?raw",
      import: "default",
      eager: true
    });
  } else if (type === "positions") {
    files = import.meta.glob(`../../utils/positions/*.html`, {
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

      <style>{`
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);

          display: flex;
          justify-content: center;
          align-items: center;

          padding: 20px; /* evita che tocchi i bordi */
          z-index: 999;
        }

        .modal-content {
          background: white;

          width: 100%;
          max-width: 600px;

          max-height: 90vh; /* limite altezza */
          overflow-y: auto; /* scroll interno */

          padding: 2rem;
          border-radius: 12px;

          position: relative;

          animation: fadeIn 0.25s ease;
        }

        .close-btn {
          position: absolute;
          top: 10px;
          right: 15px;

          border: none;
          background: transparent;

          font-size: 24px;
          cursor: pointer;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}