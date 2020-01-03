import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CreateField from './create_field';
import Field from './field';
import * as Api from '../../../shared/api';

export default class FieldsList extends Component {
  constructor(props) {
    super(props);
    this.handleCreateField = this.handleCreateField.bind(this);
    this.handleDeleteField = this.handleDeleteField.bind(this);
    this.handleCreateFieldExpand = this.handleCreateFieldExpand.bind(this);
    this.handleFieldsExpand = this.handleFieldsExpand.bind(this);
  }

  state = {
    fields: this.props.fields || [],
    create_field_expanded: false,
    fields_expanded: false,
  }

  static propTypes = {
    fields: PropTypes.array,
    create_field_expanded: PropTypes.bool,
    fields_expanded: PropTypes.bool,
  }

  handleCreateField(field) {
    Api.makePostRequest({
      url: `/api/hardwares/${this.props.hardware_id}/fields`,
      body: { field },
    }).then((response) => {
      this.setState({
        fields: [...this.state.fields, response.data],
        create_field_expanded: false,
      });
    });
  }

  handleDeleteField(id) {
    Api.makeDeleteRequest({
      url: `/api/hardwares/${this.props.hardware_id}/fields/${id}`,
    }).then(() => {
      this.setState({
        fields: this.state.fields.filter(field => field.id !== id),
      });
    });
  }

  handleFieldsExpand() {
    this.setState({
      fields_expanded: !this.state.fields_expanded,
    });
  }

  handleCreateFieldExpand() {
    this.setState({
      create_field_expanded: !this.state.create_field_expanded,
    });
  }

  render() {
    if (this.state.fields_expanded || this.state.fields.length === 0) {
      return (
        <div>
          {this.state.fields.map((field) => {
            const { name, value, id } = field;
            return (
              <Field onDelete={this.handleDeleteField} key={id} id={id} name={name} value={value} />
            );
          })}
          <div>
            <CreateField toggleExpand={this.handleCreateFieldExpand} expanded={this.state.create_field_expanded} handleCreate={this.handleCreateField} />
            {this.state.fields.length > 0
              ? (<button onClick={() => this.handleFieldsExpand()} type="button" className="ui button">Close</button>) : '' }
          </div>
        </div>
      );
    }
    return (
      <div>
        <button onClick={() => this.handleFieldsExpand()} type="button" className="ui button">Expand</button>
      </div>
    );
  }
}
