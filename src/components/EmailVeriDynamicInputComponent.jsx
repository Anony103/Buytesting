import React, { useState } from 'react';

// ... (other imports and code)

const DynamicInputContainer = ({ numberOfInputs = 7 }) => {
  const [inputValues, setInputValues] = useState(Array(numberOfInputs).fill(''));

  const handleInputChange = (index, value) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = value;
    setInputValues(newInputValues);

    if (value.length === 1 && index < numberOfInputs - 1) {
      document.getElementById(`input-${index + 1}`).focus();
    } else if (value.length === 0 && index > 0) {
      document.getElementById(`input-${index - 1}`).focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && inputValues[index] === '' && index > 0) {
      const prevInput = document.getElementById(`input-${index - 1}`);
      prevInput.focus();
      prevInput.value = ''; // Clear the value of the previous input
    } else if (e.key === 'Backspace' && inputValues[index] === '' && index === 0) {
      // Clear the value of the current input when it's the first input
      const currentInput = document.getElementById(`input-${index}`);
      currentInput.value = '';
    }
  };

  return (
    <div className="inputs-container macScreens:mt-[4rem] flex gap-2 lg:gap-5 justify-center w-full">
      {Array.from({ length: numberOfInputs }, (_, index) => (
        <input
          key={index}
          id={`input-${index}`}
          value={inputValues[index]}
          onChange={(e) => handleInputChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          className="input ps-5 macScreens:text-[2rem] lg:text-[1.5rem] macScreens:w-[55px] w-[30px] h-[35px] macScreens:h-[60px] lg:w-[50px] lg:h-[55px] rounded-[5px] border-[1px] border-[#848484]"
        />
      ))}
    </div>
  );
};

export default DynamicInputContainer;











// const DynamicInputComponent = ({ numberOfInputs = 7 }) => {
//   const [inputValues, setInputValues] = useState(Array(numberOfInputs).fill(''));

//   const handleInputChange = (index, value) => {
//     const newInputValues = [...inputValues];
//     newInputValues[index] = value;
//     setInputValues(newInputValues);

//     if (value.length === 1 && index < numberOfInputs - 1) {
//       document.getElementById(`input-${index + 1}`).focus();
//     } else if (value.length === 0 && index > 0) {
//       document.getElementById(`input-${index - 1}`).focus();
//     }
//   };

//   const handleKeyDown = (index, e) => {
//     if (e.key === 'Backspace' && index > 0) {
//       document.getElementById(`input-${index - 1}`).focus();
//     }
//   };

//   return (
//     <div className="inputs-container macScreens:mt-[4rem] flex gap-2 lg:gap-5 justify-center w-full">
//       {Array.from({ length: numberOfInputs }, (_, index) => (
//         <input
//           key={index}
//           id={`input-${index}`}
//           value={inputValues[index]}
//           onChange={(e) => handleInputChange(index, e.target.value)}
//           onKeyDown={(e) => handleKeyDown(index, e)}
//           className="input ps-5 macScreens:text-[2rem] lg:text-[1.5rem] macScreens:w-[55px] w-[30px] h-[35px] macScreens:h-[60px] lg:w-[50px] lg:h-[55px] rounded-[5px] border-[1px] border-[#848484]"
//         />
//       ))}
//     </div>
//   );
// };

// export default DynamicInputComponent;
