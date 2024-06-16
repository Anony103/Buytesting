import React, { useState } from 'react';
import Modal from './Modal';

const SubscriptionPlan = ({ plan }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className={`flex flex-col rounded-lg p-6 text-center bg-white gap-8 shadow-custom-light`}>
      <h4 className="text-lg font-semibold">{plan.duration}</h4>
      <p className="text-2xl font-bold my-2">{plan.price}</p>
      <p className="text-gray-500 font-normal">{plan.description}</p>
      {plan.isCurrent ? (
        <button onClick={openModal} className="mt-4 bg-green-600 text-white py-2 px-4 rounded">View Plan</button>
      ) : (
        <button onClick={openModal} className="mt-4 bg-green-600 text-white py-2 px-4 rounded">Buy Plan</button>
      )}

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2 className="text-2xl font-bold mb-4">{plan.isCurrent ? 'Your Current Plan' : 'Buy This Plan'}</h2>
        <p>{plan.description}</p>
        <button onClick={closeModal} className="mt-4 bg-green-600 text-white py-2 px-4 rounded">
          Close
        </button>
      </Modal>
    </div>
  );
};

export default SubscriptionPlan;
