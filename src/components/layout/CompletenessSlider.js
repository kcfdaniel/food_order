import React from 'react'
import Slider from '@material-ui/lab/Slider';

const CompletenessSlider = (props) => {
    const { name, value, handleChange } = props;
    return (
      <div>
        {name}: {value}%
        <Slider
          classes=""
          value={value}
          min={0}
          max={100}
          step={1}
          onChange={handleChange}
        />
      </div>
    )
}

export default CompletenessSlider