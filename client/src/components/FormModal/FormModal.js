import './FormModal.scss';

const FormModal = ({ title, formContent, onSubmit }) => {
  return (
    <div className="modal">
      <h1 className="modal-header">{title}</h1>
      <form className="modal-form" action="" onSubmit={onSubmit}>
        {formContent}
      </form>
    </div>
  );
};

export default FormModal;
