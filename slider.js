import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  settings: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
};


export default class TimeSelector extends PureComponent {
	
  _renderDaySlider(){
    console.log(this.props.features)
    return (
	  <div className="input-group">
        <label className="label" htmlFor="Day">
          Day
        </label>
	    <div>
  	      <input
	        type="range"
	        id="Day"
	        min={1}
		    max={7}
            step={1}
		    value={this.props.features['File Date']}
		    onChange={ e => this.props.onChange({['File Date']: e.target.value}) }
		  />
        </div>
      </div>
    );
  }

  _renderHourSlider(){
    return (
	  <div className="input-group">
        <label className="label" htmlFor="Hour">
          Hour
        </label>
		<div>
		  <input
		  type="range"
		  id="Hour"
		  min={0}
		  max={23}
		  step={1}
		  value={this.props.features['File Date']}
		  onChange={ e => this.props.onChange({['File Date']: e.target.value}) }
		/>
        </div>
      </div>
	);
  }

  render(){
    return (
	  <div>
		{this._renderDaySlider()}
		{this._renderHourSlider()}
	  </div>
    );
  }
}

TimeSelector.propTypes = propTypes;