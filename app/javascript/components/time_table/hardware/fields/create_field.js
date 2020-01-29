import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class CreateField extends Component {
  constructor(props) {
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleValueChange = this.handleValueChange.bind(this);
  }

  state = {
    name: '',
    value: '',
  }

  static propTypes = {
    name: PropTypes.string,
    value: PropTypes.string,
  }


  handleNameChange(e) {
    this.setState({
      name: e.target.value,
    });
  }

  handleValueChange(e) {
    this.setState({
      value: e.target.value,
    });
  }

  render() {
    const { name, value } = this.state;
    if (this.props.expanded) {
      return (
        <div className="ui form">
          <div className="ui field">
            <label htmlFor="type">
              {I18n.t('apps.hardware.field.name')}
            </label>
            <input
              type="text"
              onChange={this.handleNameChange}
            />
          </div>
          <div className="ui field">
            <label htmlFor="model">
              {I18n.t('apps.hardware.field.value')}
            </label>
            <input
              type="text"
              onChange={this.handleValueChange}
            />
          </div>
          <div className="ui divider" />
          <button type="button" className="ui button positive" onClick={() => this.props.handleCreate({ name, value })}>{I18n.t('common.save')}</button>
          <button type="button" className="ui labeled icon button negative" onClick={() => this.props.toggleExpand()}>
            <i className=" inverted close icon" />
            {I18n.t('common.cancel')}
          </button>
        </div>
      );
    }
    return (
      <button type="button" className="labeled circular ui icon  positive button" onClick={() => this.props.toggleExpand()}>
        {I18n.t('apps.hardware.field.add_new')}
        <i className="plus icon" />
      </button>
    );
  }
}
