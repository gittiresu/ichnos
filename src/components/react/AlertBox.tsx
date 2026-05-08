import { useState, forwardRef, useImperativeHandle } from "react";
import type { AlertHandle } from "../../utils/types";

const AlertBox = forwardRef<AlertHandle>((props, ref) => {
  const [visible, setVisible] = useState(false);
  const [type, setType] = useState("success");
  const [message, setMessage] = useState("");

  useImperativeHandle(ref, () => ({
    show(msg, t = "success") {
      setMessage(msg);
      setType(t);
      setVisible(true);

      const el = document.getElementById("contact-us");
      el?.scrollIntoView();
    },
    hide() {
      setVisible(false);
    },
  }));

  if (!visible) return null;

  
  return (
    <div className={`alert ${type}`}>
      <button onClick={() => setVisible(false)}>×</button>
      {message}
    </div>
  );
});

export default AlertBox;