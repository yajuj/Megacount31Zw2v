import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

const portalDiv = document.getElementById('portal')!;

interface IModal {
  isOpen?: boolean;
  isDisabled?: boolean;
  onCancel?: () => void;
  onSubmit?: () => void;
  title?: string;
  btnAceptTitle?: string;
  btnCancelTitle?: string;
}

const Modal: React.FC<IModal> = ({
  children,
  isOpen = false,
  onCancel = () => {},
  onSubmit = () => {},
  title = '',
  btnAceptTitle = '',
  btnCancelTitle = '',
  isDisabled = false,
}) => {
  const modalRef = useRef(null);

  const handleOutsideClick = (e: MouseEvent) => {
    if (modalRef.current && !e.composedPath().includes(modalRef.current)) {
      onCancel();
    }
  };

  useEffect(() => {
    modalRef.current && document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className='modalOverlay'>
      <div ref={modalRef} className='customModal'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title'>{title}</h5>
              <button
                type='button'
                onClick={onCancel}
                className='btn-close'
              ></button>
            </div>
            {children && <div className='modal-body'>{children}</div>}
            <div className='modal-footer'>
              <button
                type='button'
                onClick={onCancel}
                className='btn btn-secondary'
              >
                {btnCancelTitle}
              </button>
              <button
                disabled={isDisabled}
                type='button'
                onClick={onSubmit}
                className='btn btn-primary'
              >
                {btnAceptTitle}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>,
    portalDiv
  );
};

export default Modal;
