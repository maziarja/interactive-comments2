import { cloneElement, createContext, useContext, useState } from "react";

// 1 create context
const ModalContext = createContext();

// 2 create parent element ( logics go here )
function Modal({ children }) {
  const [openName, setOpenName] = useState("");
  const open = setOpenName;
  const close = () => setOpenName("");
  return (
    <ModalContext.Provider
      value={{
        openName,
        open,
        close,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

// 3 ceate children

function Open({ children, opens }) {
  const { open } = useContext(ModalContext);

  return cloneElement(children, { onClick: () => open(opens) });
}

function Window({ children, name }) {
  const { openName } = useContext(ModalContext);
  if (name !== openName) return;
  return (
    <div className="fixed top-0 left-0 z-1000 h-full w-full bg-gray-500/70 duration-500">
      <div className="absolute top-[50%] left-[50%] w-[90%] translate-x-[-50%] translate-y-[-50%] space-y-4 rounded-md bg-gray-800 p-4 duration-500">
        {children}
      </div>
    </div>
  );
}

function Message() {
  return (
    <>
      <h2 className="text-md font-semibold text-blue-950">Delete comment</h2>
      <p className="text-sm text-gray-950 sm:text-lg">
        Are you sure you want to delete this comment?This will remove the
        comment and can not be undone.
      </p>
    </>
  );
}

function Buttons({ handleDeleteComment }) {
  const { close } = useContext(ModalContext);
  return (
    <div className="flex justify-between">
      <button
        onClick={close}
        className="rounded-md bg-gray-950 p-2 text-xs text-gray-800 hover:cursor-pointer sm:text-lg"
      >
        NO, CANCEL
      </button>
      <button
        onClick={handleDeleteComment}
        className="rounded-md bg-red-900 p-2 text-xs text-gray-800 hover:cursor-pointer sm:text-lg"
      >
        YES, DELETE
      </button>
    </div>
  );
}

// 4 add properties

Modal.Window = Window;
Modal.Open = Open;
Modal.Message = Message;
Modal.Buttons = Buttons;

export default Modal;
