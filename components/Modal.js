function Modal({ show, onClose, children }) {
  return (
    <div
      className="absolute top-0 left-0 w-full h-full z-10 transition-all duration-500"
      style={{ transform: show ? "translateX(0%)" : "translateX(-200%)" }}
    >
      <div className="h-[80vh] rounded-3xl bg-slate-800 container max-w-2xl px-4 py-6 mx-auto">
        <button
          className="w-10 h-10 mb-4 font-bold rounded-full bg-slate-600"
          onClick={() => {
            onClose(false);
          }}
        >
          X
        </button>
        <h3>{children}</h3>
      </div>
    </div>
  );
}

export default Modal;
