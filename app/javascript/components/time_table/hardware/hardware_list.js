import React from 'react';
import PropTypes from 'prop-types';
import * as Api from '../../shared/api';
import Hardware from './hardware';
import CreateHardware from './create_hardware';

export default class HardwareList extends React.Component {
  constructor() {
    super();
    this.onHardwareCreate = this.onHardwareCreate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleCreateExpand = this.handleCreateExpand.bind(this);
  }

  state = {
    hardware_list: [],
    create_expanded: false,
  }

  static propTypes = {
    hardware_list: PropTypes.array,
    create_expanded: PropTypes.bool,
  }

  componentDidMount() {
    Api.makeGetRequest({ url: '/api/hardwares' }).then((response) => {
      this.setState({
        hardware_list: response.data,
      });
    });
  }

  onHardwareCreate(hardware) {
    hardware = { ...hardware, user_id: currentUser.id };
    Api.makePostRequest({ url: '/api/hardwares', body: { hardware } }).then((response) => {
      this.setState({ hardware_list: [...this.state.hardware_list, response.data], create_expanded: false });
    }).catch(err => console.log(err));
  }

  handleDelete(id) {
    Api.makeDeleteRequest({ url: `/api/hardwares/${id}` }).then(() => {
      this.setState({ hardware_list: this.state.hardware_list.filter(el => el.id !== id) });
    });
  }

  handleCreateExpand() {
    this.setState({ create_expanded: !this.state.create_expanded });
  }

  render() {
    return (
      <div>
        <div style={{
          position: 'fixed', right: '10px', bottom: '10px', zIndex: '2',
        }}
        >
          <CreateHardware expanded={this.state.create_expanded} handleExpand={this.handleCreateExpand} create_hardware={this.onHardwareCreate} />
        </div>
        <div className="container">
          <div className="row">
            {this.state.hardware_list.map((hardware) => {
              return (
                <Hardware key={hardware.id} handleDelete={this.handleDelete} hardware={hardware} fields={hardware.fields || []} />
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
