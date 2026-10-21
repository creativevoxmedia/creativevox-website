import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { getLenis } from '../../lib/scroll';

/**
 * Pop-up window built on the browser's native <dialog>.
 * Closes with the X, the Esc key, or a click outside. While it is open the
 * page behind it stops scrolling.
 */
export const Modal = ({ open, onClose, kicker, title, image, children }) => {
  const ref = useRef(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      getLenis()?.stop();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  useEffect(() => () => getLenis()?.start(), []);

  const handleClose = () => {
    getLenis()?.start();
    onClose();
  };

  return (
    <dialog
      ref={ref}
      className="mdialog"
      data-lenis-prevent
      aria-label={title}
      onClose={handleClose}
      onClick={(e) => { if (e.target === ref.current) ref.current.close(); }}
    >
      <div
        className={`mdialog__head${image ? ' mdialog__head--img' : ''}`}
        style={image ? { '--dialog-image': `url("${image}")` } : undefined}
      >
        <button type="button" className="mdialog__close" aria-label="Close" onClick={() => ref.current?.close()}>
          <X size={20} />
        </button>
        <span className="mdialog__kicker">{kicker}</span>
        <h2 className="mdialog__title">{title}</h2>
      </div>
      <div className="mdialog__body">{children}</div>
    </dialog>
  );
};

export default Modal;