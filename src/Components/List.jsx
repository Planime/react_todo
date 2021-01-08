import React, {Component, Fragment} from "react";
import Task from "./Task";


function forMap(task,
                onChangeEditableText,
                editableText,
                editableTaskId) {
    return (
        <Task
            onChangeEditableText={onChangeEditableText}
            editableText={editableText}
            editableTaskId={editableTaskId}
            key={task.id}
            task={task}/>

    )
}



class List extends Component {


    render() {
        const {
            currentTab,
            list,
            onChangeEditableText,
            editableText,
            editableTaskId
        } = this.props;

        return (

            <ul
                onClick={this.props.onClickListHandler}
                className="list_ul">
                {currentTab === 'all' && list.map(task => forMap(
                    task,
                    onChangeEditableText,
                    editableText,
                    editableTaskId))}

                {currentTab === "completed" && list.filter(({completed}) => completed).map(task => forMap(
                    task,
                    onChangeEditableText,
                    editableText,
                    editableTaskId))}

                {currentTab === "missed" && list.filter(({completed}) => !completed).map(task => forMap(task,
                    onChangeEditableText,
                    editableText,
                    editableTaskId))}
            </ul>
        )
    }

}

export default List