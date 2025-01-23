import { useState, useEffect } from 'react';

export const useDeviceManager = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const checkDeviceManager = () => {
      if (window.LWDeviceManager) {
        setIsLoaded(true);
      } else {
        setTimeout(checkDeviceManager, 100);
      }
    };

    checkDeviceManager();
  }, []);

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

  const initializeDeviceManager = () => {
    return new Promise((resolve, reject) => {
      if (!window.LWDeviceManager) {
        reject('Device Manager not available');
        return;
      }

      window.LWDeviceManager.init(
        () => {
          checkConnection(() => {
            setIsInitialized(true);
            resolve();
          });
        },
        (err) => {
          reject(err);
        }
      );
    });
  };

  const printBadge = async (deviceId, content) => {
    if (!window.LWDeviceManager) {
      throw new Error('Device Manager not available');
    }

    return new Promise((resolve, reject) => {
      window.LWDeviceManager.TicketPrinter_PrintTicket(
        deviceId,
        "TicketPrinter_Gen2.Boca.Lemur",
        content,
        true,
        (res) => resolve(res),
        (err) => reject(err)
      );
    });
  };

  return {
    isLoaded,
    isInitialized,
    initializeDeviceManager,
    printBadge
  };
};