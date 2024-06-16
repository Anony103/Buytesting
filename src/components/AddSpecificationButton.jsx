import { useState, useEffect } from 'react';
import InputField from './InputFieldComponents';
import CustomButton from './CustomButton';

function SpecificationForm({initialSpecifications = [], onAddSpecification}) {
  const [specifications, setSpecifications] = useState(initialSpecifications);

  const addSpecification = () => {
    setSpecifications([...specifications, { id: Date.now(), name: '', value: '' }]);
  };

  const removeSpecification = (idToRemove) => {
    setSpecifications(prevSpecifications => {
    const updatedSpecifications = prevSpecifications.filter(specification => specification.id !== idToRemove);
    onAddSpecification(updatedSpecifications);
    return updatedSpecifications;
  });
  };

  const handleInputChange = (e, id) => {
    const { name, value } = e.target;
    setSpecifications(prevSpecifications => {
      const updatedSpecifications = prevSpecifications.map(specification =>
        specification.id === id ? { ...specification, [name]: value } : specification
      );
      onAddSpecification(updatedSpecifications);
      return updatedSpecifications;
    });
  }


  return (
    <div>
        <button onClick={addSpecification} className='flex items-center gap-5'>Add Specification <i class='bx bx-plus text-[#00753E] text-[1.5rem]'></i></button>
        {specifications.map((specification, index) => (
            <div className='flex flex-col gap-2 mt-4' key={`${specification.id}`}>
                <div className="input-box flex flex-col gap-1 lg:gap-2 macScreens:gap-2  macScreens:text-[1rem] lg:text-[.8rem] w-[70%]">
                    <InputField label="" name="name" placeholder="Title" type="text" onChange={(e) => {
                      handleInputChange(e,specification.id)
                    }} />
                </div>
                <div className="input-box flex items-center gap-1 lg:gap-2 macScreens:gap-2  macScreens:text-[1rem] lg:text-[.8rem]">
                    <div className="w-[70%]">
                        <InputField label="" name="value" placeholder="Text" type="text" onChange={(e) => {
                          handleInputChange(e,specification.id)
                          
                          }} />
                    </div>
                    <CustomButton buttonText="X" btnClassName="bg-[#ff3030] text-[#FFF] rounded-[15px] border-[1px] border-[#00753E] lg:rounded-[10px] flex justify-center items-center w-[10px] lg:py-2 lg:-mb-2" onClick={() => removeSpecification(specification.id)} />
                </div>
            </div>
        ))}
    </div>
  );
}

export default SpecificationForm;