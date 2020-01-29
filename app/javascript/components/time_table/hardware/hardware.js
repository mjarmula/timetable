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
      errors: {},
    };
  }

  static propTypes = {
    handleDelete: PropTypes.func.isRequired,
    hardware: PropTypes.object.isRequired,
    fields: PropTypes.array.isRequired,
  }

  handleSave(hardware) {
    makePutRequest({ url: `/api/hardwares/${this.state.id}`, body: { hardware } }).then((response) => {
      const {
        type, id, model, manufacturer, serial_number,
      } = response.data;
      this.setState({
        type, id, model, manufacturer, serial_number, edit: false,
      });
    }).catch(response => this.setState({ errors: response.errors }));
  }


  handleEdit() {
    this.setState({ edit: !this.state.edit });
  }

  render() {
    const {
      type, model, serial_number, id, manufacturer, edit, errors,
    } = this.state;
    const hardware = {
      type, model, serial_number, id, manufacturer,
    };
    if (edit) { return (<EditHardware handleEdit={this.handleEdit} errors={errors} handleSave={this.handleSave} hardware={hardware} />); }


    return (
      <div className="col-md-4">
        <div className="card">
          <nav className="relative-navigation">
            <h3>
              {manufacturer}
              {' '}
              {model}
            </h3>
            <ul className="items">
              <li>
                <button type="button" onClick={() => this.handleEdit()} className="ui circular icon button">
                  <i className="pencil alternate icon" />
                </button>
              </li>
              <li>
                <button type="button" onClick={() => this.props.handleDelete(id)} className="ui circular negative icon button">
                  <i className="trash alternate outline icon" />
                </button>
              </li>
            </ul>
          </nav>
          <div className="ui two column grid">
            <div className="column">
              <label>{I18n.t('apps.hardware.type')}</label>
              <p>{I18n.t(`apps.hardware.types.${type}`)}</p>
            </div>
            <div className="column">
              <label>{I18n.t('apps.hardware.serial_number')}</label>
              <p>{serial_number}</p>
            </div>
          </div>
          <div className="ui divider" />
          <FieldsList hardware_id={id} fields={this.props.fields} />
        </div>
      </div>
    );
  }
}
