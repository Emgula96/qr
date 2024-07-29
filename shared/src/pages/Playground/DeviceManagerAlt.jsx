import React, { useEffect, useState } from 'react';

const DeviceManagerAlt = () => {
  const [ticketIdx, setTicketIdx] = useState(0);
  const [ticketDevInterface, setTicketDevInterface] = useState('');
  const [connection, setConnection] = useState(null);
  const [statusMessages, setStatusMessages] = useState([]);

  const addStatusMessage = (message) => {
    setStatusMessages(prevMessages => [...prevMessages, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  useEffect(() => {
    const devMgrConnStr = "http://localhost:60559/signalr";
    const conn = $.hubConnection(devMgrConnStr);

    setConnection(conn);

    conn.reconnecting(() => {
      addStatusMessage('Attempting to reconnect');
    });

    conn.reconnected(() => {
      addStatusMessage('Reconnected');
    });

    conn.disconnected(() => {
      addStatusMessage('Disconnected');
      setTimeout(() => {
        conn.start().done(() => {
          addStatusMessage('Connected');
        }).fail((err) => {
          addStatusMessage(`Connection error: ${JSON.stringify(err)}`);
        });
      }, 5000);
    });

    const proxy = conn.createHubProxy('deviceManagerHub');
    proxy.on('_a', () => {});

    conn.start().done(() => {
      proxy.invoke('GetAllComponents').done((comps) => {
        addStatusMessage(`Components received: ${JSON.stringify(comps)}`);
        const accItems = _.filter(comps, (c) => c.ComponentTypeName === "Ticket_Printer_Gen2" && c.IsActive);
        if (accItems.length > 0) {
          const ticketPrnItem = accItems[0];
          setTicketIdx(ticketPrnItem.CompIdx);
          setTicketDevInterface(ticketPrnItem.DeviceManagerInterface);
          addStatusMessage(`Ticket printer found. Index: ${ticketPrnItem.CompIdx}, Interface: ${ticketPrnItem.DeviceManagerInterface}`);
          defineEvents(proxy);
        } else {
          addStatusMessage("A ticket printer component wasn't found in the configuration.");
        }
      }).fail((err) => {
        addStatusMessage(`Error getting components: ${JSON.stringify(err)}`);
      });
    }).fail((err) => {
      addStatusMessage(`Connection start error: ${JSON.stringify(err)}`);
    });

    return () => {
      if (conn) {
        conn.stop();
      }
    };
  }, []);

  const defineEvents = (proxy) => {
    proxy.off('onTicketPrinterSetDelayedACK_Event');
    proxy.off('onTicketPrinterGetStatus_Event');
    proxy.off('onTicketPrinterPrinted_Event');

    proxy.on('onTicketPrinterSetDelayedACK_Event', (evt) => {
      addStatusMessage(`Delayed ACK Set: ${JSON.stringify(evt.Payload)}`);
    });

    proxy.on('onTicketPrinterGetStatus_Event', (evt) => {
      addStatusMessage(`Low Paper Status: ${JSON.stringify(evt)}`);
    });

    proxy.on('onTicketPrinterPrinted_Event', (evt) => {
      addStatusMessage(`Print: ${JSON.stringify(evt.Payload)}`);
    });
  };

  const setDelayedACK = () => {
    connection.createHubProxy('deviceManagerHub').invoke('TicketPrinter_SetDelayedACK', ticketIdx, ticketDevInterface)
      .fail((err) => addStatusMessage(`Error setting delayed ACK: ${JSON.stringify(err)}`));
  };

  const getLowPaperStatus = () => {
    connection.createHubProxy('deviceManagerHub').invoke('TicketPrinter_GetLowPaperStatus', ticketIdx, ticketDevInterface)
      .fail((err) => addStatusMessage(`Error getting low paper status: ${JSON.stringify(err)}`));
  };

  const printNoCut = () => {
    connection.createHubProxy('deviceManagerHub').invoke('TicketPrinter_Print', ticketIdx, ticketDevInterface, "<HW1,1><RC5,5>Test", false)
      .fail((err) => addStatusMessage(`Error printing (no cut): ${JSON.stringify(err)}`));
  };

  const printWithCut = () => {
    connection.createHubProxy('deviceManagerHub').invoke('TicketPrinter_Print', ticketIdx, ticketDevInterface, "<HW1,1><RC5,5>Test", true)
      .fail((err) => addStatusMessage(`Error printing (with cut): ${JSON.stringify(err)}`));
  };

  return (
    <div id="topEle">
      <h2>Device Manager</h2>
      <h3>Ticket Printer Gen2 Example</h3>
      <p>
        <div>Step 1: Call 'TicketPrinter_SetDelayedACK'. This only needs to be called once on the printer to change it's internal setting. If this was already called on this printer, then skip to step 2.</div>
        <button onClick={setDelayedACK}>Set Delayed ACK</button>
      </p>
      <p>
        <div>Step 2: Call 'TicketPrinter_GetLowPaperStatus' then Wait for the LowPaper event</div>
        <button onClick={getLowPaperStatus}>Low Paper Status</button>
      </p>
      <p>
        <div>Step 3a: Call 'TicketPrinter_Print' (with no cut option)</div>
        <button onClick={printNoCut}>Print (no cut)</button>
      </p>
      <p>
        <div>Step 3b: Call 'TicketPrinter_Print' (with cut option)</div>
        <button onClick={printWithCut}>Print (with cut)</button>
      </p>
      <h3>Status Messages:</h3>
      <div style={{height: '300px', overflowY: 'scroll', border: '1px solid #ccc', padding: '10px'}}>
        {statusMessages.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
      </div>
    </div>
  );
};

export default DeviceManagerAlt;