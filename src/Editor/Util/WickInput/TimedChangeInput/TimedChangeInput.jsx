import React, {Component} from 'react'

var classNames = require('classnames'); 

/**
 * This is an input which will fire its onChange event after a specific delay has passed since 
 * the last change, when the input is blurred, or when the enter key is pressed while the input 
 * is focused.
 * 
 * props
 * 
 * delay {number} milliseconds to wait before attempting update. Default: 500
 * 
 * onChange {function} function to call when delay has passed.
 */
class TimedChangeInput extends Component {
    constructor (props) {
        super(props);

        let cleanValue = this.props.value ? this.props.value : ""; 
        this.state = {
            value: cleanValue,
            lastUpdatedValue: cleanValue,
            lastChange: 0,
        }

        this.delay = this.props.delay ? this.props.delay : 500; // milliseconds
    }

    componentWillUnmount = () => {
        this.wrappedOnChange(); 
    }

    /**
     * Wrapped onChange prop which is passed the clean value. Only fires if the value
     * has changed since the last update.
     */
    wrappedOnChange = () => {
        if (this.props.onChange && (this.state.value !== this.state.lastUpdatedValue)) {
            this.props.onChange(this.state.value); 

            this.setState({
                lastUpdatedValue: this.state.value, 
            });
        }
    }

    /**
     * Called when the delay has passed. 
     */
    onTimeComplete = () => {
        let date = new Date(); 
        let currentTime = date.getTime(); 
        let timePassed = currentTime - this.state.lastChange; 
        if (timePassed >= this.delay) {
            this.wrappedOnChange(); 
        }
    }

    /**
     * Called on every change. 
     */
    internalOnChange = (e) => {
        let date = new Date(); 
        this.setState({
            value: e.target.value,
            lastChange: date.getTime(), 
        },
        () => (setTimeout(this.onTimeComplete, this.delay))
        ); 
    }

    /**
     * Called on every key press while input is focused.
     */
    handleKeyDown = (e) => {
        // Check when enter is pressed. 
        if (e.charCode === 13) {
            this.wrappedOnChange(); 
        }
    }

    render() {
        return (
            <input
            className={classNames(this.props.className)}
            {...this.props}
            value={this.state.value}
            type="text"
            onChange={this.internalOnChange}
            onBlur={this.wrappedOnChange}
            onKeyPress={this.handleKeyDown}
          />
        )
    }
}
    
export default TimedChangeInput