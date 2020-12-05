/*
 * Copyright 2020 WICKLETS LLC
 *
 * This file is part of Wick Editor.
 *
 * Wick Editor is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Wick Editor is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Wick Editor.  If not, see <https://www.gnu.org/licenses/>.
 */

import React, { Component } from 'react';

import MobileInspectorInput from '../MobileInspectorInput/MobileInspectorInput';

import '../_mobileinspectorrow.scss';

class MobileInspectorColor extends Component {
  render() {
    let idLabel = this.props.tooltip.replace(/\s+/g, '-').toLowerCase();
    return(
      <div className="mobile-inspector-row">
      {/* Identifier */} 
      <label htmlFor={idLabel + "-input"} className="mobile-inspector-row-identifier mobile-inspector-row-identifier-color">
        {this.props.tooltip}
      </label>

      {/* Input */}
      <div className="mobile-inspector-small-input-container">
        <MobileInspectorInput 
          inputProps={{id: idLabel + "-input"}}
          input={
            {
              type: "color",
              color: this.props.val,
              onChange: this.props.onChange,
              id: this.props.id,
              stroke: !this.props.stroke ? false : this.props.stroke,
              placement: "left",
              colorPickerType: this.props.colorPickerType,
              changeColorPickerType:this.props.changeColorPickerType,
              updateLastColors:this.props.updateLastColors,
              lastColorsUsed:this.props.lastColorsUsed,
            }
          }
        />
      </div>
    </div>
    );
  }
}

export default MobileInspectorColor
