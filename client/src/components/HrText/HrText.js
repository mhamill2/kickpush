import './HrText.scss';

const HrText = ({ text = 'or', width }) => {
  return (
    <p className="hr-text">
      <span>{text}</span>
    </p>
  );
};

export default HrText;
