import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TypesSelect from './types_select';
import Errors from './errors';

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

  static propTypes = {
    errors: PropTypes.object.isRequired,
    handleEdit: PropTypes.func.isRequired,
    handleSave: PropTypes.func.isRequired,
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
    const { errors, handleEdit, handleSave } = this.props;
    return (
      <div className="col-md-4">
        <div className="card">
          <nav className="relative-navigation">
            <ul className="items">
              <li>
                <button type="button" onClick={() => handleSave(this.state)} className="ui circular positive icon button">
                  <i className="check icon" />
                </button>
              </li>
              <li>
                <button type="button" onClick={() => handleEdit()} className="ui circular negative icon button">
                  <i className="times icon" />
                </button>
              </li>
            </ul>
          </nav>
          <div className="ui form">
            <div className="ui field">
              <label>{I18n.t('apps.hardware.type')}</label>
              <TypesSelect changeType={this.handleTypeChange} selected={type} />
              {errors.type ? <Errors errors={errors.type} /> : null}
            </div>
            <div className="ui divider" />
            <div className="ui field">
              <label>
                {I18n.t('apps.hardware.manufacturer')}
              </label>
              <input type="text" onChange={this.handleManufacturerChange} value={manufacturer} />
              {errors.manufacturer ? <Errors errors={errors.manufacturer} /> : null}
            </div>
            <div className="ui divider" />
            <div className="ui field">
              <label>{I18n.t('apps.hardware.model')}</label>
              <input type="text" onChange={this.handleModelChange} value={model} />
              {errors.modle ? <Errors errors={errors.model} /> : null}
            </div>
            <div className="ui divider" />
            <div className="ui field">
              <label>{I18n.t('apps.hardware.serial_number')}</label>
              <input type="text" onChange={this.handleSerialNumberChange} value={serial_number} />
              {errors.serial_number ? <Errors errors={errors.serial_number} /> : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
