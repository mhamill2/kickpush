const FormModal = ({ title, formContent, onSubmit }) => {
  return (
    <div className="flex flex-col justify-center items-center my-8 mx-auto bg-white w-80 p-4 border-2 rounded-tl-md rounded-br-md rounded-tr-3xl rounded-bl-3xl shadow">
      <h1 className="text-2xl mb-4 font-semibold text-gray-900">{title}</h1>
      <form className="w-full flex flex-col items-center modal-form" action="" onSubmit={onSubmit}>
        {formContent}
      </form>
    </div>
  );
};

export default FormModal;
