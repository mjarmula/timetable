import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import EditField from './edit_field';
import { makePutRequest } from '../../../shared/api';

export default class Field extends Component {
  constructor(props) {
    super(props);
    this.handelEdit = this.handelEdit.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleValueChange = this.handleValueChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  state = {
    edit: false,
    name: this.props.name,
    value: this.props.value,
  }

  static propTypes = {
    hardware_id: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onDelete: PropTypes.func.isRequired,
  }

  handelEdit() {
    this.setState({ edit: true });
  }

  handleSave() {
    makePutRequest({ url: `/api/hardwares/${this.props.hardware_id}/fields/${this.props.id}`, body: { field: { name: this.state.name, value: this.state.value } } }).then(() => this.setState({ edit: false }));
  }

  handleNameChange(e) {
    this.setState({ name: e.target.value });
  }

  handleValueChange(e) {
    this.setState({ value: e.target.value });
  }

  render() {
    const {
      id, onDelete,
    } = this.props;
    const { name, value, edit } = this.state;
    if (edit) { return (<EditField handleNameChange={this.handleNameChange} handleValueChange={this.handleValueChange} id={id} name={name} value={value} handleSave={this.handleSave} />); }
    return (
      <div>
        <nav className="relative-navigation">
          <div className="twelve wide column">
            <label>{name}</label>
            <p>{value}</p>
          </div>
          <ul className="items">
            <li>

              <button type="button" onClick={() => this.handelEdit()} className="ui circular icon button">
                <i className="pencil alternate icon" />
              </button>
            </li>
            <li>

              <button type="button" onClick={() => onDelete(id)} className="ui circular negative icon button">
                <i className="trash alternate outline icon" />
              </button>
            </li>
          </ul>
        </nav>
        <div className="ui divider" />
      </div>
    );
  }
}
