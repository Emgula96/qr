import React from 'react';
import { useDeviceManager } from '../../hooks/useDeviceManager';

const PrinterTest = () => {
  const { isLoaded, isInitialized, initializeDeviceManager, printBadge } = useDeviceManager();

  const handleTestPrint = async () => {
    const testContent = `
      <RC410,10><RTF1,12><SD1>Test Print<RL>
      <RC640,200><RTF1,12><SD1>ROTATE 180<RU>
    `;

    try {
      await printBadge(1, testContent);
      console.log('Test print successful');
    } catch (error) {
      console.error('Test print failed:', error);
    }
  };

  if (!isLoaded) {
    return <div>Loading Device Manager...</div>;
  }

  return (
    <div>
      <h2>Printer Test</h2>
      <button onClick={() => initializeDeviceManager()}>Initialize Printer</button>
      <button onClick={handleTestPrint} disabled={!isInitialized}>
        Print Test Page
      </button>
      <p>Status: {isInitialized ? 'Initialized' : 'Not Initialized'}</p>
    </div>
  );
};

export default PrinterTest; 