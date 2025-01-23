import React, { useCallback, useState, useEffect } from 'react';
import { useLwDevManager } from './useLwDevManager';
import { useTicketPrinter } from './useTicketPrinter';
import PrinterComponent from './PrinterComponent';

// Note: You'll need to properly import your dependencies
// Make sure these scripts are included in your public/index.html or imported properly
// import './Scripts/jquery-1.6.4.min.js';
// import './Scripts/jquery.signalR-2.0.3.min.js';
// import './devmgr-wrapper-r2.min.js';

const DeviceManagerAndTicketPrinter = () => {
  const { startConnection, getSignalRConn, getConnState } = useLwDevManager();
  const { printTicket } = useTicketPrinter();

  // State variables to hold status information
  const [connectionStatus, setConnectionStatus] = useState('Initializing...');
  const [printStatus, setPrintStatus] = useState('Waiting to print...');
  const [outOfPaper, setOutOfPaper] = useState(false);

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

  useEffect(() => {
    startConnection();
    checkStatusAndPrint();
  }, []);

  const checkStatusAndPrint = () => {
    const state = getConnState();
    if (state === 1) {
      // Connection is good, proceed to initialize and print
      setConnectionStatus('Connected');
      beginInit();
      initiatePrint();
    } else {
      // Retry after 1 second if not connected
      setConnectionStatus('Connecting...');
      setTimeout(checkStatusAndPrint, 1000);
    }
  };

  const beginInit = () => {
    // Initialization logic if any
    setConnectionStatus('Initialization complete.');
  };

  const initiatePrint = () => {
    printTicket('<RC 10, 10>This is a ticket', true, (resPayload) => {
      if (resPayload) {
        setPrintStatus(
          `Print result: ${resPayload.Printed ? 'Success' : 'Failure'}`
        );
        setOutOfPaper(resPayload.OutOfPaper);
      } else {
        setPrintStatus('Print failed.');
      }
    });
  };

  const printTestReceipt = () => {
    const htmlReceiptText = `
      <!DOCTYPE html>
      <html>
      <head></head>
      <body>
        <div>This is a test receipt.<br/>A<br/>B<br/>C<br/>D<br/>E<br/>This is a test receipt.</div>
      </body>
      </html>`;

    getSignalRConn(
      (proxy) => {
        proxy
          .invoke(
            'receiptPrinter_PrintReceiptHtml',
            'test-receipt-idx',
            'receipt-interface',
            htmlReceiptText
          )
          .done(() => {
            setPrintStatus('Test receipt printed successfully.');
          })
          .fail((err) => {
            setPrintStatus('Failed to print test receipt.');
            console.error(JSON.stringify(err));
          });
      },
      (err) => {
        setPrintStatus('Error: Unable to connect to the printer.');
        console.error(err);
      }
    );
  };

  return (
    <div>
      <h1>Device Manager and Ticket Printer</h1>
      <p>Connection Status: {connectionStatus}</p>
      <p>Print Status: {printStatus}</p>
      {outOfPaper && <p style={{ color: 'red' }}>Warning: Out of Paper!</p>}

      {/* Button to print a test receipt */}
      <button onClick={printTestReceipt}>Print Test Receipt</button>

      <div id="topEle">
        <h2>Device Manager</h2>
        <p>
          <input type="button" value="Init" onClick={handleInitConnection} />
          <input type="button" value="Get Low Status" onClick={handleGetLowStatus} />
          <input type="button" value="Print Ticket" onClick={handlePrintTicket} />
        </p>
      </div>
      <PrinterComponent />
    </div>
  );
};

export default DeviceManagerAndTicketPrinter;
