import { cloneElement, createContext, useContext, useState } from "react";
import { useData } from "../useData";

const TextareaContext = createContext();
export const useTextareaContext = () => useContext(TextareaContext);

function Textarea({ children }) {
  const [textarea, setTextarea] = useState("");
  const [openId, setOpenId] = useState("");
  const { dataApi } = useData();
  const { currentUser } = dataApi;
  const open = setOpenId;
  const close = () => setOpenId("");
  return (
    <TextareaContext.Provider
      value={{ textarea, setTextarea, openId, open, close, currentUser }}
    >
      {children}
    </TextareaContext.Provider>
  );
}

function Open({ id, children }) {
  const { openId, open, close } = useContext(TextareaContext);
  function handleClick() {
    openId === "" || openId !== id ? open(id) : close();
  }
  return cloneElement(children, { onClick: handleClick });
}

function Text({ defaultValue, children, id, alwaysVisible }) {
  const { setTextarea, openId, currentUser } = useContext(TextareaContext);
  if (!alwaysVisible && openId !== id) return null;
  return (
    <div className="mt-2 ml-auto grid grid-cols-[auto_auto] rounded-sm bg-white p-4 sm:grid-cols-[auto_1fr_auto] sm:gap-3">
      <textarea
        onChange={(e) => setTextarea(e.target.value)}
        // value={textarea}
        className="col-span-full mb-4 field-sizing-content min-h-24 w-full cursor-pointer resize-none rounded-md border-1 border-gray-900 p-4 text-gray-950 sm:col-span-1 sm:col-start-2 sm:text-lg"
        placeholder="Add a comment..."
        defaultValue={defaultValue && `@${defaultValue}, `}
      ></textarea>

      <img
        className="h-8 w-8 rounded-full sm:col-start-1 sm:row-start-1"
        src={currentUser.avatar_png}
        alt="your avatar"
      />
      <div className="ml-auto sm:col-start-3 sm:row-start-1">{children}</div>
    </div>
  );
}

Textarea.Text = Text;
Textarea.Open = Open;

export default Textarea;
