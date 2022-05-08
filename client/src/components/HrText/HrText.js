const HrText = ({ text = 'or', width }) => {
  return (
    <p className="w-52 text-center border-b border-gray-500 my-3 leading-1 text-gray-500">
      <span className="bg-white px-2"> {text} </span>
    </p>
  );
};

export default HrText;
