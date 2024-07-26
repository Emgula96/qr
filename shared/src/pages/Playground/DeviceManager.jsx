import React, { useEffect, useState } from 'react';
import _ from 'underscore';

const DeviceManager = () => {
  const [ticketIdx, setTicketIdx] = useState(0);
  const [ticketDevInterface, setTicketDevInterface] = useState('');
  const [printStatus, setPrintStatus] = useState('');

  useEffect(() => {
    const loadScripts = async () => {
      if (typeof window !== 'undefined') {
        // Dynamically load jQuery from the local file
        const script = document.createElement('script');
        script.src = '../../util/jquery-1.6.4.min.js';
        script.onload = async () => {
          const $ = window.jQuery;
          await import('../../util/jquery.signalR-2.0.3.min');

          const devMgrConnStr = "http://localhost:60559/signalr"; // Device Manager URL
          const conn = $.hubConnection(devMgrConnStr);
          const proxy = conn.createHubProxy('deviceManagerHub');

          // SignalR connection lifecycle callbacks
          conn.reconnecting(() => {
            console.log('attempting to reconnect');
          });

          conn.reconnected(() => {
            console.log('reconnected');
          });

          conn.disconnected(() => {
            console.error('disconnected');
            setTimeout(() => {
              conn.start().done(() => {
                console.log('Connected');
              }).fail((err) => {
                console.error(JSON.stringify(err));
              });
            }, 5000);
          });

          // Register a dummy event called: '_a'
          proxy.on('_a', () => {});

          // Start the initial connection
          conn.start().done(() => {
            // Get all of the device components
            proxy.invoke('GetAllComponents').done((comps) => {
              console.log(comps);
              const accItems = _.filter(comps, (c) => c.ComponentTypeName === "Ticket_Printer_Gen2" && c.IsActive);
              if (accItems.length > 0) {
                const ticketPrnItem = accItems[0];
                setTicketIdx(ticketPrnItem.CompIdx);
                setTicketDevInterface(ticketPrnItem.DeviceManagerInterface);
                defineEvents(proxy);
              } else {
                console.error("A ticket printer component wasn't found in the configuration.");
              }
            }).fail((err) => {
              console.error(JSON.stringify(err));
            });
          }).fail((err) => {
            console.error(JSON.stringify(err));
          });

          const defineEvents = (proxy) => {
            proxy.off('onTicketPrinterSetDelayedACK_Event');
            proxy.off('onTicketPrinterGetStatus_Event');
            proxy.off('onTicketPrinterPrinted_Event');

            proxy.on('onTicketPrinterSetDelayedACK_Event', (evt) => {
              console.log('Delayed ACK Set');
              console.log(evt.Payload);
            });

            proxy.on('onTicketPrinterGetStatus_Event', (evt) => {
              console.log('Low Paper Status');
              console.log(JSON.stringify(evt));
            });

            proxy.on('onTicketPrinterPrinted_Event', (evt) => {
              console.log('Print');
              console.log(evt.Payload);
              setPrintStatus('Printing finished successfully.');
            });
          };
        };
        document.body.appendChild(script);
      }
    };

    loadScripts();

    return () => {
      if (typeof window !== 'undefined') {
        const $ = window.jQuery;
        if ($ && $.hubConnection) {
          const conn = $.hubConnection();
          conn.stop();
        }
      }
    };
  }, []);

  const handleSetDelayedACK = () => {
    const $ = window.jQuery;
    const proxy = $.connection.deviceManagerHub;
    proxy.invoke('TicketPrinter_SetDelayedACK', ticketIdx, ticketDevInterface).done(() => {
    }).fail((err) => {
      console.error(JSON.stringify(err));
    });
  };

  const handleLowPaperStatus = () => {
    const $ = window.jQuery;
    const proxy = $.connection.deviceManagerHub;
    proxy.invoke('TicketPrinter_GetLowPaperStatus', ticketIdx, ticketDevInterface).done(() => {
    }).fail((err) => {
      console.error(JSON.stringify(err));
    });
  };

  const handlePrintNoCut = () => {
    const $ = window.jQuery;
    const proxy = $.connection.deviceManagerHub;
    proxy.invoke('TicketPrinter_Print', ticketIdx, ticketDevInterface, "<HW1,1><RC5,5>Test", false).done(() => {
      setPrintStatus('');
    }).fail((err) => {
      console.error(JSON.stringify(err));
    });
  };

  const handlePrintCut = () => {
    const $ = window.jQuery;
    const proxy = $.connection.deviceManagerHub;
    proxy.invoke('TicketPrinter_Print', ticketIdx, ticketDevInterface, "<HW1,1><RC5,5>Test", true).done(() => {
      setPrintStatus('');
    }).fail((err) => {
      console.error(JSON.stringify(err));
    });
  };

  return (
    <div id="topEle">
      <h2>Device Manager</h2>
      <h3>Ticket Printer Gen2 Example</h3>
      <p>
        <div>Step 1: Call 'TicketPrinter_SetDelayedACK'. This only needs to be called once on the printer to change its internal setting. If this was already called on this printer, then skip to step 2.</div>
        <input type="button" id="setDelayedACKBtn" value="Set Delayed ACK" onClick={handleSetDelayedACK} />
      </p>
      <p>
        <div>Step 2: Call 'TicketPrinter_GetLowPaperStatus' then Wait for the LowPaper event</div>
        <input type="button" id="lowPaperStatusBtn" value="Low Paper Status" onClick={handleLowPaperStatus} />
      </p>
      <p>
        <div>Step 3a: Call 'TicketPrinter_Print' (with no cut option)</div>
        <input type="button" id="ticketPrinterNoCutBtn" value="Print (no cut)" onClick={handlePrintNoCut} />
      </p>
      <p>
        <div>Step 3b: Call 'TicketPrinter_Print' (with cut option)</div>
        <input type="button" id="ticketPrinterCutBtn" value="Print (with cut)" onClick={handlePrintCut} />
      </p>
      {printStatus && <p>{printStatus}</p>}
    </div>
  );
};

export default DeviceManager;