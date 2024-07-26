import React, { useEffect, useState } from 'react';
import _ from 'underscore';

const DeviceManager = () => {
  const [ticketIdx, setTicketIdx] = useState(0);
  const [ticketDevInterface, setTicketDevInterface] = useState('');
  const [printStatus, setPrintStatus] = useState('');
  const [loadingMessage, setLoadingMessage] = useState('Loading scripts...');
  const [connectionStatus, setConnectionStatus] = useState('Disconnected');

  useEffect(() => {
    const loadScripts = async () => {
      if (typeof window !== 'undefined') {
        // Load jQuery
        const jqueryScript = document.createElement('script');
        jqueryScript.src = '../../util/jquery-1.6.4.min.js';
        jqueryScript.onload = async () => {
          setLoadingMessage('jQuery loaded, loading SignalR script...');
          const $ = window.jQuery;

          // Load SignalR
          const signalRScript = document.createElement('script');
          signalRScript.src = '../../util/jquery.signalR-2.0.3.min.js';
          signalRScript.onload = async () => {
            setLoadingMessage('SignalR script loaded, initializing connection...');
            const devMgrConnStr = "http://localhost:60559/signalr"; // Device Manager URL
            const conn = $.hubConnection(devMgrConnStr);
            const proxy = conn.createHubProxy('deviceManagerHub');

            // SignalR connection lifecycle callbacks
            conn.reconnecting(() => {
              setConnectionStatus('Reconnecting...');
            });

            conn.reconnected(() => {
              setConnectionStatus('Reconnected');
            });

            conn.disconnected(() => {
              setConnectionStatus('Disconnected after connecting');
              setTimeout(() => {
                conn.start().done(() => {
                  setConnectionStatus('Connected');
                }).fail((err) => {
                  setConnectionStatus(`Error: ${JSON.stringify(err)}`);
                  console.error('Connection error:', err);
                });
              }, 5000);
            });

            // Register a dummy event called: '_a'
            proxy.on('_a', () => {});

            // Start the initial connection
            conn.start().done(() => {
              setConnectionStatus('Connected');
              setLoadingMessage('Connected to SignalR, loading device components...');

              // Get all of the device components
              proxy.invoke('GetAllComponents').done((comps) => {
                const accItems = _.filter(comps, (c) => c.ComponentTypeName === "Ticket_Printer_Gen2" && c.IsActive);
                if (accItems.length > 0) {
                  const ticketPrnItem = accItems[0];
                  setTicketIdx(ticketPrnItem.CompIdx);
                  setTicketDevInterface(ticketPrnItem.DeviceManagerInterface);
                  setLoadingMessage('');
                  defineEvents(proxy);
                } else {
                  setLoadingMessage("A ticket printer component wasn't found in the configuration.");
                }
              }).fail((err) => {
                setLoadingMessage(`Error: ${JSON.stringify(err)}`);
                console.error('GetAllComponents error:', err);
              });
            }).fail((err) => {
              setLoadingMessage(`Error: ${JSON.stringify(err)}`);
              console.error('Initial connection error:', err);
            });

            const defineEvents = (proxy) => {
              proxy.off('onTicketPrinterSetDelayedACK_Event');
              proxy.off('onTicketPrinterGetStatus_Event');
              proxy.off('onTicketPrinterPrinted_Event');

              proxy.on('onTicketPrinterSetDelayedACK_Event', (evt) => {
                setLoadingMessage('Delayed ACK Set');
              });

              proxy.on('onTicketPrinterGetStatus_Event', (evt) => {
                setLoadingMessage('Low Paper Status');
              });

              proxy.on('onTicketPrinterPrinted_Event', (evt) => {
                setLoadingMessage('Print completed');
                setPrintStatus('Printing finished successfully.');
              });
            };
          };
          signalRScript.onerror = () => {
            setLoadingMessage('Error loading SignalR script');
            console.error('Error loading SignalR script');
          };
          document.body.appendChild(signalRScript);
        };
        jqueryScript.onerror = () => {
          setLoadingMessage('Error loading jQuery script');
          console.error('Error loading jQuery script');
        };
        document.body.appendChild(jqueryScript);
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
      setLoadingMessage('SetDelayedACK invoked');
    }).fail((err) => {
      setLoadingMessage(`Error: ${JSON.stringify(err)}`);
      console.error('SetDelayedACK error:', err);
    });
  };

  const handleLowPaperStatus = () => {
    const $ = window.jQuery;
    const proxy = $.connection.deviceManagerHub;
    proxy.invoke('TicketPrinter_GetLowPaperStatus', ticketIdx, ticketDevInterface).done(() => {
      setLoadingMessage('GetLowPaperStatus invoked');
    }).fail((err) => {
      setLoadingMessage(`Error: ${JSON.stringify(err)}`);
      console.error('GetLowPaperStatus error:', err);
    });
  };

  const handlePrintNoCut = () => {
    const $ = window.jQuery;
    const proxy = $.connection.deviceManagerHub;
    proxy.invoke('TicketPrinter_Print', ticketIdx, ticketDevInterface, "<HW1,1><RC5,5>Test", false).done(() => {
      setPrintStatus('');
      setLoadingMessage('PrintNoCut invoked');
    }).fail((err) => {
      setLoadingMessage(`Error: ${JSON.stringify(err)}`);
      console.error('PrintNoCut error:', err);
    });
  };

  const handlePrintCut = () => {
    const $ = window.jQuery;
    const proxy = $.connection.deviceManagerHub;
    proxy.invoke('TicketPrinter_Print', ticketIdx, ticketDevInterface, "<HW1,1><RC5,5>Test", true).done(() => {
      setPrintStatus('');
      setLoadingMessage('PrintCut invoked');
    }).fail((err) => {
      setLoadingMessage(`Error: ${JSON.stringify(err)}`);
      console.error('PrintCut error:', err);
    });
  };

  return (
    <div id="topEle">
      <h2>Device Manager</h2>
      <h3>Ticket Printer Gen2 Example</h3>
      <p>{loadingMessage}</p>
      <p>{`Connection Status: ${connectionStatus}`}</p>
      <p>{`Ticket Index: ${ticketIdx}`}</p>
      <p>{`Device Interface: ${ticketDevInterface}`}</p>
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