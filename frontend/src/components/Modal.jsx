import React from 'react';

const Modal = ({ id, show, buttonShow, onClose, title, children, buttonMessage, buttonColor, activateFunction }) => {
  if (!show.show || id !== show.id) {
    return null;
  }
  return (
    <div className="modal is-active" onClick={onClose}>
      <div className="modal-background"></div>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <header className="modal-card-head neon-blue">
          <h4 className="modal-card-title text-magnolia">{title}</h4>
          <button onClick={onClose} className="delete is-large" aria-label="close"></button>
        </header>
        <section className="modal-card-body magnolia">
          {children}
          {buttonShow && (
            <footer>
              <form>
                <button type="submit" onClick={activateFunction} className={`button mt-5 ${buttonColor}`}>
                  {buttonMessage}
                </button>
                <button onClick={onClose} className="button mt-5 magnolia has-text-weight-semibold">
                  Tidak
                </button>
              </form>
            </footer>
          )}
        </section>
      </div>
    </div>
  );
};

export default Modal;
