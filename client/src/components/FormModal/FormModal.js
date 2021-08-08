import './FormModal.scss';

const FormModal = ({ title, formContent }) => {
  return (
    <div className="modal">
      <h1 className="modal-header">{title}</h1>
      <form className="modal-form" action="">
        {formContent}
      </form>
    </div>
  );
};

export default FormModal;
