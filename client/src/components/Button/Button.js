const Button = ({ content, isPrimary, isSecondary, size, extraClasses, onClick }) => {
  let className = 'rounded-3xl cursor-pointer';

  if (isPrimary) {
    className += ' bg-primary text-white border border-primary hover:bg-primaryDark hover:border-primaryDark';
  } else if (isSecondary) {
    className += ' bg-white text-primary border border-primary hover:bg-gray-100 hover:border-primaryDark hover:text-primaryDark';
  } else {
    className += ' bg-white border';
  }

  if (size === 'large') {
    className += ' h-10 w-full';
  } else {
    className += ' h-10 w-1/2';
  }

  if (extraClasses) {
    className += ` ${extraClasses}`;
  }

  return (
    <button className={className} onClick={onClick ? onClick : null}>
      {content}
    </button>
  );
};

export default Button;
