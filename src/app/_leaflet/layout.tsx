// src/app/leaflet/layout.tsx
import React from 'react';

const LeafletLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <main>
      {children}
    </main>
  );
};

export default LeafletLayout;
