import React from 'react';
import PropTypes from 'prop-types';
import { makePostRequest } from '../../shared/api';
import TypesSelect from './types_select';
import Errors from './errors';

export default class CreateHardware extends React.Component {
  constructor(props) {
    super(props);
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleManufacturerChange = this.handleManufacturerChange.bind(this);
    this.handleModelChange = this.handleModelChange.bind(this);
    this.handleSerialNumberChange = this.handleSerialNumberChange.bind(this);
    this.handleHardwareCreate = this.handleHardwareCreate.bind(this);
  }

  state = {
    type: '',
    manufacturer: '',
    model: '',
    serial_number: '',
    errors: {},
  }

  static propTypes = {
    onHardwareCreate: PropTypes.func.isRequired,
  }

  handleHardwareCreate() {
    const {
      type, manufacturer, model, serial_number,
    } = this.state;
    const hardware = {
      type, manufacturer, model, serial_number, user_id: currentUser.id,
    };
    makePostRequest({ url: '/api/hardwares', body: { hardware } }).then((response) => {
      this.props.onHardwareCreate(response.data);
      this.setState({
        type: '',
        manufacturer: '',
        model: '',
        serial_number: '',
        errors: {},
      });
    }).catch((response) => {
      this.setState({ errors: response.errors });
    });
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
      type, manufacturer, model, serial_number, errors,
    } = this.state;

    return (

      <div className="card">
        <div className="ui form">
          <div className="field">
            <div className="four fields">
              <div className="field">
                <label htmlFor="type">
                  {I18n.t('apps.hardware.type')}
                </label>
                <TypesSelect selected={type} changeType={this.handleTypeChange} />
                {errors.type ? <Errors errors={errors.type} /> : null}
              </div>
              <div className="ui field">
                <label htmlFor="manufacturer">{I18n.t('apps.hardware.manufacturer')}</label>
                <input type="text" value={manufacturer} onChange={this.handleManufacturerChange} />
                {errors.manufacturer ? <Errors errors={errors.manufacturer} /> : null}
              </div>
              <div className="ui field">
                <label htmlFor="model">
                  {I18n.t('apps.hardware.model')}
                </label>
                <input
                  type="text"
                  value={model}
                  onChange={this.handleModelChange}
                />
                {errors.model ? <Errors errors={errors.model} /> : null}
              </div>
              <div className="ui field">
                <label htmlFor="serial_number">
                  {I18n.t('apps.hardware.serial_number')}
                </label>
                <input
                  type="text"
                  value={serial_number}
                  onChange={this.handleSerialNumberChange}
                />
                {errors.serial_number ? <Errors errors={errors.serial_number} /> : null}
              </div>
            </div>
          </div>

          <button
            type="button"
            className="ui right floated positive large labeled icon button"
            onClick={() => this.handleHardwareCreate()}
          >
            <i className="save icon" />
            {I18n.t('common.save')}
          </button>
        </div>
      </div>
    );
  }
}
