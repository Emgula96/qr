import { useLwDevManager } from './useLwDevManager';

export const useTicketPrinter = () => {
  const { getSignalRConn } = useLwDevManager();

  const printTicket = (ticketData, isHtml, cb) => {
    getSignalRConn((proxy) => {
      proxy
        .invoke('TicketPrinter_Print', ticketData, isHtml)
        .done((res) => {
          cb(res);
        })
        .fail((err) => {
          console.error(JSON.stringify(err));
          cb(null);
        });
    });
  };

  return {
    printTicket,
  };
};
