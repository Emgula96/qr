import React, { useEffect, useState } from 'react';
import { useLwDevManager } from './useLwDevManager';
import { useTicketPrinter } from './useTicketPrinter';

const DeviceManagerAndTicketPrinter = () => {
  const { startConnection, getSignalRConn, getConnState } = useLwDevManager();
  const { printTicket } = useTicketPrinter();
  
  // State variables to hold status information
  const [connectionStatus, setConnectionStatus] = useState('Initializing...');
  const [printStatus, setPrintStatus] = useState('Waiting to print...');
  const [outOfPaper, setOutOfPaper] = useState(false);

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
    printTicket("<RC 10, 10>This is a ticket", true, (resPayload) => {
      if (resPayload) {
        setPrintStatus(`Print result: ${resPayload.Printed ? 'Success' : 'Failure'}`);
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
    
    getSignalRConn((proxy) => {
      proxy.invoke('receiptPrinter_PrintReceiptHtml', 'test-receipt-idx', 'receipt-interface', htmlReceiptText)
        .done(() => {
          setPrintStatus('Test receipt printed successfully.');
        })
        .fail((err) => {
          setPrintStatus('Failed to print test receipt.');
          console.error(JSON.stringify(err));
        });
    }, (err) => {
      setPrintStatus('Error: Unable to connect to the printer.');
      console.error(err);
    });
  };

  return (
    <div>
      <h1>Device Manager and Ticket Printer</h1>
      <p>Connection Status: {connectionStatus}</p>
      <p>Print Status: {printStatus}</p>
      {outOfPaper && <p style={{ color: 'red' }}>Warning: Out of Paper!</p>}
      
      {/* Button to print a test receipt */}
      <button onClick={printTestReceipt}>Print Test Receipt</button>
    </div>
  );
};

export default DeviceManagerAndTicketPrinter;
