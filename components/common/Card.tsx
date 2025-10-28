import React from 'react';

interface CardProps {
  title: string;
  value: string | number;
  // Fix: Changed JSX.Element to React.ReactNode to resolve "Cannot find namespace 'JSX'" error.
  icon: React.ReactNode;
  color: string;
}

const Card: React.FC<CardProps> = ({ title, value, icon, color }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm flex items-center">
      <div className={`p-3 rounded-full mr-4 ${color}`}>
        {icon}
      </div>
      <div>
        <p className="text-sm text-text-light">{title}</p>
        <p className="text-2xl font-bold text-text-main">{value}</p>
      </div>
    </div>
  );
};

export default Card;
