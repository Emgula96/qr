import $ from 'jquery';

class LwDevManagerService {
  constructor() {
    this.connState = [
      'Connecting',
      'Connected',
      'Reconnecting',
      'Disconnecting',
      'Disconnected',
    ];
    this.currConnState = 4; // Default to 'Disconnected'

    this.connection = $.hubConnection('http://localhost:60559/');
    this.proxy = this.connection.createHubProxy('deviceManagerHub');

    // Register an event before connection.start() is called.
    this.proxy.on('_a', function () {});

    this.connection.stateChanged((t) => {
      this.currConnState = t.newState;
      console.log(
        'DeviceManager state changed from: ' +
          this.connState[t.oldState] +
          ' to ' +
          this.connState[t.newState]
      );
    });

    this.connection.disconnected(() => {
      setTimeout(() => {
        this.connection.start().done(() => {
          // Connection re-established
        });
      }, 50);
    });
  }

  getServiceStatus() {
    return this.currConnState;
  }

  getSignalRConn(success, fail) {
    this.connection
      .start()
      .done(() => {
        success(this.proxy);
      })
      .fail((err) => {
        fail(err);
      });
  }
}

export default LwDevManagerService;
