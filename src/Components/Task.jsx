import React, {Component, Fragment} from "react"

class Task extends Component {
    render() {
        const {
            id,
            description,
            completed,

        } = this.props.task;
        const {
            editableTaskId,
        } = this.props;


        return (
            <li className={`list_li ${ completed ? "list_ok_task_paint" : "Hey" }`}>

                {+editableTaskId === +id ?
                    <>
                        <input
                            onChange={this.props.onChangeEditableText}
                            value={this.props.editableText} />
                        <button
                            data-id={id}
                            data-btn="save"
                            className="list_save_btn"
                        >Save</button>
                    </>

                    :

                    <>
                        <p>{description}</p>
                        <div className="list_buttons">
                            <button
                                data-id={id}
                                data-btn="ok"
                                className="list_ok_btn"
                            >
                                OK
                            </button>
                            <button
                                data-id={id}
                                data-btn="delete"
                                className="list_delete_btn"
                            >
                                Delete
                            </button>
                            <button
                                data-id={id}
                                className="list_edit_btn"
                                data-btn="edit"
                            >
                                Edit
                            </button>
                        </div>
                    </>
                }
            </li>
        )
    }

}


export default Task