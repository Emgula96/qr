import { useState, useEffect } from 'react';

export const useLwDevManager = () => {
  const [connection, setConnection] = useState(null);
  const [proxy, setProxy] = useState(null);
  const [currConnState, setCurrConnState] = useState(4); // Default to 'Disconnected'

  useEffect(() => {
    const $ = window.$; // Access jQuery from the global window object
    const conn = $.hubConnection('http://localhost:60559/'); // Replace with your actual URL
    const proxyObj = conn.createHubProxy('deviceManager');

    conn
      .start()
      .done(() => {
        setCurrConnState(1); // 'Connected'
        setConnection(conn);
        setProxy(proxyObj);
      })
      .fail(() => {
        setCurrConnState(4); // 'Disconnected'
      });
  }, []);

  const getSignalRConn = (callback, errorCallback) => {
    if (currConnState === 1) {
      callback(proxy);
    } else {
      errorCallback('Connection not established');
    }
  };

  const getConnState = () => {
    return currConnState;
  };

  return {
    startConnection: () => connection && connection.start(),
    getSignalRConn,
    getConnState,
  };
};
