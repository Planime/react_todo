import React, {Component} from "react";


class Form extends Component {


    render() {
        return (
            <form
                onSubmit={this.props.handlerOnSubmit}
                className="form">
                <input
                    value={this.props.formInput}
                    name="formInput"
                    onChange={this.props.inputHandler}
                    className="form_input"
                    type="text"
                    placeholder="Enter text here"/>
                <button
                    className="submit_btn">Submit
                </button>
            </form>
        )
    }
}


export default Form

