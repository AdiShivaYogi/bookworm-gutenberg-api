
import React, { ReactNode } from 'react';

interface SectionHeaderProps {
  title: string;
  icon: ReactNode;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, icon }) => {
  return (
    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
      {icon}
      {title}
    </h2>
  );
};

export default SectionHeader;
