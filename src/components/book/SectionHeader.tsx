
import React, { ReactNode } from 'react';

interface SectionHeaderProps {
  title: string;
  icon: ReactNode;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, icon }) => {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="p-2 bg-accent/10 rounded-lg text-accent">
        {icon}
      </div>
      <h2 className="text-2xl font-semibold">
        {title}
      </h2>
    </div>
  );
};

export default SectionHeader;
