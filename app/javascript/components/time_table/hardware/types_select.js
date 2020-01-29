import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { makeGetRequest } from '../../shared/api';

export default class TypesSelect extends Component {
  state = { types: [] }

  static propTypes = {
    selected: PropTypes.string.isRequired,
    changeType: PropTypes.func.isRequired,
  }

  componentDidMount() {
    makeGetRequest({ url: '/api/hardwares/types' }).then((response) => {
      this.setState({ types: response.data.types });
    });
  }

  render() {
    return (
      <select name="type" onChange={this.props.changeType}>
        <option value="" />
        {this.state.types.map(type => <option value={type}>{I18n.t(`apps.hardware.types.${type}`)}</option>)}
      </select>
    );
  }
}
