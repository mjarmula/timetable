import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FieldsList from './fields/fields_list';
import EditHardware from './edit_hardware';
import { makePutRequest } from '../../shared/api';

export default class Hardware extends Component {
  constructor(props) {
    super(props);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleSave = this.handleSave.bind(this);
    const {
      type, manufacturer, model, serial_number, id,
    } = this.props.hardware;
    this.state = {
      id,
      type,
      manufacturer,
      model,
      serial_number,
      edit: false,
    };
  }

  handleSave(hardware) {
    makePutRequest({ url: `/api/hardwares/${this.state.id}`, body: { hardware } }).then((response) => {
      const {
        type, id, model, manufacturer, serial_number,
      } = response.data;
      this.setState({
        type, id, model, manufacturer, serial_number, edit: false,
      });
    });
  }

  handle

  handleEdit() {
    this.setState({ edit: !this.state.edit });
  }

  render() {
    const {
      type, model, serial_number, id, manufacturer, edit,
    } = this.state;
    const hardware = {
      type, model, serial_number, id, manufacturer,
    };
    if (edit) { return (<EditHardware handleEdit={this.handleEdit} handleSave={this.handleSave} hardware={hardware} />); }


    return (
      <div className="col-md-4">
        <div className="card">
          <div>
            <label>{I18n.t('apps.hardware.type')}</label>
            <p>{I18n.t(`apps.hardware.types.${type}`)}</p>
          </div>
          <div className="ui divider" />
          <div>
            <label>
              {I18n.t('apps.hardware.manufacturer')}
            </label>
            <p>{manufacturer}</p>
          </div>
          <div className="ui divider" />
          <div>
            <label>{I18n.t('apps.hardware.model')}</label>
            <p>{model}</p>
          </div>
          <div className="ui divider" />
          <div>
            <label>{I18n.t('apps.hardware.serial_number')}</label>
            <p>{serial_number}</p>
          </div>
          <div className="ui divider" />
          <h3>Dodatkowe pola</h3>
          <FieldsList hardware_id={id} fields={this.props.fields} />
          <div className="ui divider" />

          <button type="button" onClick={() => this.handleEdit()} className="ui button">{I18n.t('common.edit')}</button>
          <button type="button" onClick={() => this.props.handleDelete(id)} className="ui button negative">{I18n.t('common.destroy')}</button>
        </div>
      </div>
    );
  }
}
