import React, { Component } from 'react';
import TypesSelect from './types_select';

export default class EditHardware extends Component {
  constructor(props) {
    super(props);
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleManufacturerChange = this.handleManufacturerChange.bind(this);
    this.handleModelChange = this.handleModelChange.bind(this);
    this.handleSerialNumberChange = this.handleModelChange.bind(this);
    const {
      type, manufacturer, model, serial_number,
    } = this.props.hardware;
    this.state = {
      type,
      manufacturer,
      model,
      serial_number,
    };
  }


  handleTypeChange(e) {
    this.setState({ type: e.target.value });
  }

  handleManufacturerChange(e) {
    this.setState({ manufacturer: e.target.value });
  }

  handleModelChange(e) {
    this.setState({ model: e.target.value });
  }

  handleSerialNumberChange(e) {
    this.setState({ model: e.target.value });
  }

  render() {
    const {
      type, manufacturer, model, serial_number,
    } = this.state;
    return (
      <div className="col-md-4">
        <div className="card">
          <div className="ui form">

            <div className="ui field">
              <label>{I18n.t('apps.hardware.type')}</label>
              <TypesSelect changeType={this.handleTypeChange} selected={type} />
            </div>
            <div className="ui divider" />
            <div className="ui field">
              <label>
                {I18n.t('apps.hardware.manufacturer')}
              </label>
              <input type="text" onChange={this.handleManufacturerChange} value={manufacturer} />
            </div>
            <div className="ui divider" />
            <div className="ui field">
              <label>{I18n.t('apps.hardware.model')}</label>
              <input type="text" onChange={this.handleModelChange} value={model} />
            </div>
            <div className="ui divider" />
            <div className="ui field">
              <label>{I18n.t('apps.hardware.serial_number')}</label>
              <input type="text" onChange={this.handleSerialNumberChange} value={serial_number} />
            </div>
            <div className="ui divider" />

            <button type="button" onClick={() => this.props.handleSave(this.state)} className="ui button positive">{I18n.t('common.save')}</button>
            <button type="button" onClick={() => this.props.handleEdit()} className="ui button negative">{I18n.t('common.cancel')}</button>
          </div>
        </div>
      </div>
    );
  }
}
