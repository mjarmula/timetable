import React from 'react';
import { makeGetRequest, makeDeleteRequest } from '../../shared/api';
import Hardware from './hardware';
import CreateHardware from './create_hardware';

export default class HardwareList extends React.Component {
  constructor() {
    super();
    this.onHardwareCreate = this.onHardwareCreate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.onHardwareCreate = this.onHardwareCreate.bind(this);
  }

  state = {
    hardware_list: [],
  }

  componentDidMount() {
    makeGetRequest({ url: '/api/hardwares' }).then((response) => {
      this.setState({
        hardware_list: response.data,
      });
    });
  }

  onHardwareCreate(hardware) {
    this.setState({ hardware_list: [...this.state.hardware_list, hardware] });
  }

  handleDelete(id) {
    makeDeleteRequest({ url: `/api/hardwares/${id}` }).then(() => {
      this.setState({ hardware_list: this.state.hardware_list.filter(el => el.id !== id) });
    });
  }

  render() {
    return (
      <div className="container">
        <CreateHardware onHardwareCreate={this.onHardwareCreate} />
        <div className="row">
          {this.state.hardware_list.map(hardware => (
            <Hardware key={hardware.id} handleDelete={this.handleDelete} hardware={hardware} fields={hardware.fields || []} />
          ))}
        </div>
      </div>
    );
  }
}
