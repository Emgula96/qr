import React, { useCallback } from 'react';

import './Scripts/jquery-1.6.4.min.js';
import './Scripts/jquery.signalR-2.0.3.min.js';
import './Scripts/devmgr-wrapper-r2.min.js';

const DeviceManagerAndTicketPrinter = () => {
  const checkConnection = useCallback((readyCb) => {
    const devConnState = LWDeviceManager.getStateNumber();
    if (devConnState === 1) {
      readyCb();
    } else {
      setTimeout(() => {
        checkConnection(readyCb);
      }, 500);
    }
  }, []);

  const handleInitConnection = useCallback(() => {
    LWDeviceManager.init(
      () => {
        checkConnection(() => {
          console.log('Connected to the service!');
        });
      },
      (err) => {
        console.error(err);
      }
    );
  }, [checkConnection]);

  const handleGetLowStatus = useCallback(() => {
    LWDeviceManager.TicketPrinter_GetLowPaperStatus(
      1,
      "TicketPrinter_Gen2.Boca.Lemur",
      (res) => {
        console.log(res);
      },
      () => {
        console.error('Failed to invoke method on Device Manager');
      }
    );
  }, []);

  const handlePrintTicket = useCallback(() => {
    const fgl = `
      <RC410,10><RTF1,12><SD1> <RL>
      <RC640,200><RTF1,12><SD1>ROTATE 180<RU>
    `;
    
    LWDeviceManager.TicketPrinter_PrintTicket(
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
  }, []);

  return (
    <div id="topEle">
      <h2>Device Manager</h2>
      <p>
        <input type="button" value="Init" onClick={handleInitConnection} />
        <input type="button" value="Get Low Status" onClick={handleGetLowStatus} />
        <input type="button" value="Print Ticket" onClick={handlePrintTicket} />
      </p>
    </div>
  );
};

export default DeviceManagerAndTicketPrinter;