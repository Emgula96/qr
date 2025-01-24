import React, { useEffect, useState } from 'react';

const TicketPrintTEST = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Check if LWDeviceManager is available
    const checkDeviceManager = () => {
      if (window.LWDeviceManager) {
        setIsLoaded(true);
      } else {
        // If not available, check again in 100ms
        setTimeout(checkDeviceManager, 100);
      }
    };

    checkDeviceManager();
  }, []);

  // Don't render buttons until LWDeviceManager is available
  if (!isLoaded) {
    return <div>Loading Device Manager...</div>;
  }

  const initConnection = () => {
    window.LWDeviceManager.init(
      () => {
        checkConnection(() => {
          console.log('Connected to the service!');
        });
      },
      (err) => {
        console.error(err);
      }
    );
  };

  const checkConnection = (readyCb) => {
    const devConnState = window.LWDeviceManager.getStateNumber();
    if (devConnState === 1) {
      readyCb();
    } else {
      setTimeout(() => {
        checkConnection(readyCb);
      }, 500);
    }
  };

  const listAllComponents = () => {
    window.LWDeviceManager.getAllComponents((comps) => {
      console.log(comps);
    });
  };

  const getLowStatus = () => {
    window.LWDeviceManager.TicketPrinter_GetLowPaperStatus(
      1,
      "TicketPrinter_Gen2.Boca.Lemur",
      (res) => {
        console.log(res);
      },
      () => {
        console.error('Failed to invoke method on Device Manager');
      }
    );
  };

  const printTicket = () => {
    const fgl = `
      <RC410,10><RTF1,12><SD1> <RL>
      <RC640,200><RTF1,12><SD1>ROTATE 180<RU>
    `;
    window.LWDeviceManager.TicketPrinter_PrintTicket(
      1,
      "TicketPrinter_Gen2.Boca.Lemur",
      fgl,
      true,
      (res) => {
        console.log(res);
      },
      () => {
        console.error('Failed to invoke method on Device Manager');
      }
    );
  };

  return (
    <div>
      <h2>Device Manager</h2>
      <p>
        <button onClick={initConnection}>Init</button>
        <button onClick={getLowStatus}>Get Low Status</button>
        <button onClick={printTicket}>Print Ticket</button>
      </p>
    </div>
  );
};

export default TicketPrintTEST;
