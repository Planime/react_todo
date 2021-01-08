import React, {Component, Fragment} from "react";
import Form from "./Form";
import List from "./List";
import Tabs from "./Tabs";


class Main extends Component {


    state = {
        toDoList: [],
        formInput: "Hello, my name is Hanry",
        currentTab: "all",
        editableText: "",
        editableTaskId: null,
    };


    componentDidMount() {
        console.log('did mount')
        fetch("https://5fec128e573752001730b0f1.mockapi.io/todo")
            .then(response => response.json())
            .then(response => this.setState(
                {
                    toDoList: response
                }
            ))

    }

    componentDidUpdate(){
        console.log('did update')
    }


    inputHandler = ({target: {name, value}}) => {
        this.setState({
            [name]: value
        })
    };

    handlerOnSubmit = (e) => {
        e.preventDefault();

        const options = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                description: this.state.formInput,
                completed: false
            })
        };

        fetch("https://5fec128e573752001730b0f1.mockapi.io/todo", options)
            .then(res => res.json())
            .then(res => {
                this.setState((prevState) => {
                    return {
                        formInput: "",
                        toDoList: [
                            res,
                            ...prevState.toDoList]
                    }
                });
            });


    };

    deleteBtnHandler = (target) => {
        const options = {
            method: "DELETE"
        };
        fetch(`https://5fec128e573752001730b0f1.mockapi.io/todo/${target.dataset.id}`, options)
            .then(res => res.json())
            .then(res => {
                this.setState((prevState) => {
                    return {
                        toDoList: prevState.toDoList.filter((task) => {
                            return task.id !== res.id
                        })
                    }
                })
            })
            .catch((error) => console.error(error))

    };

    okBtnHandler = (target) => {

        let currentTask = this.state.toDoList.find((task) => task.id === target.dataset.id);

        const options = {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                completed: !currentTask.completed
            })
        };

        fetch(`https://5fec128e573752001730b0f1.mockapi.io/todo/${target.dataset.id}`, options)
            .then(res => res.json())
            .then(res => {
                this.setState((prevState) => {
                    return {
                        toDoList: prevState.toDoList.map(({id, description, completed}) => {
                            if (id === res.id) {
                                return {
                                    id,
                                    description,
                                    completed: !completed,
                                }
                            }
                            return {
                                id,
                                description,
                                completed,
                            }
                        })
                    }
                })
            })
            .catch((error) => console.error(error))


    };


    editBtnHandler = (target) => {

        this.setState({
            editableTaskId: target.dataset.id,
            editableText: this.state.toDoList.find((task) => task.id === target.dataset.id).description
        })

    };


    saveBtnHandler = (target) => {

        const options = {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                description: this.state.editableText
            })
        };

        fetch(`https://5fec128e573752001730b0f1.mockapi.io/todo/${target.dataset.id}`, options);

        this.setState((prevState) => {
            return {
                editableTaskId: null,
                toDoList: prevState.toDoList.map((task) => {
                    const {id, description, completed} = task;
                    if (+id === +prevState.editableTaskId) {
                        return {
                            id,
                            description: prevState.editableText,
                            completed,
                        }
                    } else {
                        return task
                    }
                })
            }

        })


    };


    onClickListHandler = ({target}) => {
        const btnAttr = target.dataset.btn;

        switch (btnAttr) {
            case 'ok':
                this.okBtnHandler(target);
                break;
            case 'delete':
                this.deleteBtnHandler(target);
                break;
            case 'edit':
                this.editBtnHandler(target);
                break;
            case 'save':
                this.saveBtnHandler(target);
                break;
        }

    };


    tabsOnClickHandler = ({target}) => {
        const tabAttr = target.dataset.tab;
        if (tabAttr) {
            this.setState({
                currentTab: tabAttr
            })
        }
    };

    onChangeEditableText = ({target}) => {
        this.setState({
            editableText: target.value
        })
    };


    render() {
        return (
            <>
                <div className="create_todo_wrapper">
                    <h1 className="todo_title">New todo</h1>
                    <Form formInput={this.state.formInput}
                          inputHandler={this.inputHandler}
                          handlerOnSubmit={this.handlerOnSubmit}
                    />
                </div>
                <Tabs
                    tabsOnClickHandler={this.tabsOnClickHandler}
                    currentTab={this.state.currentTab}
                />
                <List editableText={this.state.editableText}
                      editableTaskId={this.state.editableTaskId}
                      currentTab={this.state.currentTab}
                      onClickListHandler={this.onClickListHandler}
                      onChangeEditableText={this.onChangeEditableText}
                      list={this.state.toDoList}
                />
            </>
        )
    }
}

export default Main