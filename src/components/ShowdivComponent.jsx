import { useState } from 'react';

const ShowDivComponent = ({ buttonText, content, showDivClassName, ShowdivBtnClass }) => {
  const [showDiv, setShowDiv] = useState(false);

  const handleClick = () => {
    setShowDiv(!showDiv); // Toggle the state when clicked
  };

  return (
    <div className='w-full'>
      <button onClick={handleClick} className={`${ShowdivBtnClass}`}>
        {buttonText}
        <i className={`bx ${showDiv ? 'bx-chevron-up' : 'bx-chevron-down'}`}></i>
      </button>
      <div className={`${showDivClassName} ${showDiv ? 'show' : 'hide'}`}>
        
        {content}
      </div>
    </div>
  );
}

export default ShowDivComponent;
