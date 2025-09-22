import React, { useState, useEffect } from 'react';

export const useDeviceManager = () => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Initial connection
    initConnection();

    // Set up interval for reconnection attempts
    const intervalId = setInterval(() => {
      initConnection();
    }, 10000);

    // Cleanup on unmount
    return () => clearInterval(intervalId);
  }, []);

  const initConnection = () => {
    window.LWDeviceManager.init(
      () => {
        checkConnection(() => {
          console.log('Connected to the service!');
          setIsConnected(true);
        });
      },
      (err) => {
        console.error(err);
        setIsConnected(false);
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

  const printTicket = (fgl) => {
    return new Promise((resolve, reject) => {
      window.LWDeviceManager.TicketPrinter_PrintTicket(
        1,
        "TicketPrinter_Gen2.Boca.Lemur",
        fgl,
        true,
        (res) => {
          console.log(res);
          resolve(res);
        },
        () => {
          const error = 'Failed to invoke method on Device Manager';
          console.error(error);
          reject(error);
        }
      );
    });
  };

  return {
    initConnection,
    checkConnection,
    listAllComponents,
    getLowStatus,
    printTicket,
    isConnected
  };
};
