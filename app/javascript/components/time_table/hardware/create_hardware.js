import React from 'react';
import PropTypes from 'prop-types';
import * as Api from '../../shared/api';
import TypesSelect from './types_select';

export default class CreateHardware extends React.Component {
  constructor(props) {
    super(props);
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleManufacturerChange = this.handleManufacturerChange.bind(this);
    this.handleModelChange = this.handleModelChange.bind(this);
    this.handleSerialNumberChange = this.handleSerialNumberChange.bind(this);
  }

  state = {
    type: '',
    manufacturer: '',
    model: '',
    serial_number: '',
    types: [],
  }

  static propTypes = {
    types: PropTypes.array,
    type: PropTypes.string,
    manufacturer: PropTypes.string,
    model: PropTypes.string,
    serial_number: PropTypes.string,
    expanded: PropTypes.bool,
  }

  handleTypeChange(e) {
    this.setState({
      type: e.target.value,
    });
  }

  handleManufacturerChange(e) {
    this.setState({
      manufacturer: e.target.value,
    });
  }

  handleModelChange(e) {
    this.setState({
      model: e.target.value,
    });
  }

  handleSerialNumberChange(e) {
    this.setState({
      serial_number: e.target.value,
    });
  }

  render() {
    const {
      type, manufacturer, model, serial_number, types,
    } = this.state;
    if (this.props.expanded) {
      return (
        <div className="card" style={{ marginBottom: 'auto' }}>
          <div className="ui form">
            <div className="ui field">
              <label htmlFor="type">
                {I18n.t('apps.hardware.type')}
              </label>
              <TypesSelect changeType={this.handleTypeChange} />
            </div>
            <div className="ui field">
              <label htmlFor="model">{I18n.t('apps.hardware.manufacturer')}</label>
              <input type="text" onChange={this.handleManufacturerChange} />
            </div>
            <div className="ui field">
              <label htmlFor="model">
                {I18n.t('apps.hardware.model')}
              </label>
              <input
                type="text"
                onChange={this.handleModelChange}
              />
            </div>
            <div className="ui field">
              <label htmlFor="serial_number">
                {I18n.t('apps.hardware.serial_number')}
              </label>
              <input
                type="text"
                onChange={this.handleSerialNumberChange}
              />
            </div>
            <div className="ui divider" />
            <button
              type="button"
              className="ui button positive"
              onClick={() => this.props.create_hardware({
                type, manufacturer, model, serial_number,
              })}
            >
              {I18n.t('common.save')}
            </button>
            <button
              type="button"
              onClick={this.props.handleExpand}
              className="ui labeled icon button negative"
            >
              <i className=" inverted close icon" />
              {I18n.t('common.cancel')}
            </button>
          </div>
        </div>
      );
    }
    return (
      <div>
        <button
          type="button"
          onClick={this.props.handleExpand}
          className="ui labeled icon button positive"
        >
          <i className="plus icon" />
          {I18n.t('apps.hardware.add_new')}
        </button>
      </div>
    );
  }
}
