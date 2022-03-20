import React from 'react';
import ReactDOM from 'react-dom';

const portalDiv = document.getElementById('portal')!;

interface IModal {
  isOpen?: boolean;
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
}) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className='modalOverlay'>
      <div className='customModal'>
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
