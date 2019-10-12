import React, { Component } from 'react';
import Gantt from './components/Gantt';
import Toolbar from './components/Toolbar';
import MessageArea from './components/MessageArea';
// import './App.css';

/* static data for our gantt chart
const data = {
  data: [
    { id: 1, text: 'Task #1', start_date: '2019-04-15', duration: 3, progress: 0.6 },
    { id: 2, text: 'Task #2', start_date: '2019-04-18', duration: 3, progress: 0.9 }
  ],
  links: [
    { id: 1, source: 1, target: 2, type: '0' }
  ]
};*/


class charts extends Component {
  state = {
    currentZoom: 'Days',
    messages: [],
    data: {
        data: [
          { id: 1, text: 'Task #1', start_date: '2019-04-15', duration: 3, progress: 0.6 },
          { id: 2, text: 'Task #2', start_date: '2019-04-18', duration: 3, progress: 0.9 },
          { id: 3, text: 'Task #3', start_date: '2019-04-20', duration: 5, progress: 0.1 }
        ],
        links: [
          { id: 1, source: 1, target: 2, type: '0' },
          { id: 2, source: 1, target: 3, type: '1' }
        ]
      },
  };

  addMessage(message) {
    const maxLogLength = 5;
    const newMessate = { message };
    const messages = [
      newMessate,
      ...this.state.messages
    ];

    if (messages.length > maxLogLength) {
      messages.length = maxLogLength;
    }
    this.setState({ messages });
  }

  logDataUpdate = (type, action, item, id) => {
    let text = item && item.text ? ` (${item.text})` : '';
    let message = `${type} ${action}: ${id} ${text}`;
    if (type === 'link' && action !== 'delete') {
      message += ` ( source: ${item.source}, target: ${item.target} )`;
    }
    this.addMessage(message);
  }

  handleZoomChange = (zoom) => {
    this.setState({
      currentZoom: zoom
    });
  }

  render() {
    const { currentZoom, messages, data } = this.state;
    return (
      <div>
        <div className="zoom-bar">
          <Toolbar
            zoom={currentZoom}
            onZoomChange={this.handleZoomChange}
          />
        </div>
        <div className="gantt-container">
          <Gantt
            tasks={data}
            zoom={currentZoom}
            onDataUpdated={this.logDataUpdate}
          />
        </div>
        <MessageArea
          messages={messages}
        />
      </div>
    );
  }
}

export default {
    routeProps: {
        path: '/charts',
        component: charts
    },
    name: 'Charts',
}