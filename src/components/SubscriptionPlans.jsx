import React from 'react';
import SubscriptionPlan from '../components/SubscriptionPlan';

const currentPlan = {
  duration: "3 Months",
  price: "₦8,000",
  description: "Informational or Small Business Website (8-16 pages)",
  isCurrent: true,
};

const otherPlans = [
  {
    duration: "1 Month",
    price: "₦3,000",
    description: "Informational or Small Business Website (8-16 pages)",
  },
  {
    duration: "3 Months",
    price: "₦8,000",
    description: "Informational or Small Business Website (8-16 pages)",
  },
  {
    duration: "6 Months",
    price: "₦15,000",
    description: "Informational or Small Business Website (8-16 pages)",
  },
];

const SubscriptionPlans = () => {
  const hasCurrentPlan = currentPlan && Object.keys(currentPlan).length > 0;
  const hasOtherPlans = otherPlans && otherPlans.length > 0;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-center">Subscription Plans</h2>
      <p className="mt-2 text-gray-500 font-normal text-center">
        Lorem ipsum amet minim non deserunt ullamco est sit aliqua dolor do amet sint amet minim non deserunt ullamco est
        sit aliqua dolor do
      </p>
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {hasCurrentPlan && (
          <div className="grid grid-cols-1">
            <h3 className="text-xl font-semibold">Current Subscription Plan</h3>
            <SubscriptionPlan plan={currentPlan} />
          </div>
        )}
        {hasOtherPlans && (
          <div className={`lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4`}>
            {hasCurrentPlan && (
              <h3 className="text-xl font-semibold col-span-1 md:col-span-3">Other Subscriptions Plans</h3>
            )}
            {otherPlans.map((plan, index) => (
              <SubscriptionPlan key={index} plan={plan} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SubscriptionPlans;
