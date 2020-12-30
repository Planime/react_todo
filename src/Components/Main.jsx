import React, {Component, Fragment} from "react";
import Form from "./Form";
import List from "./List";
import Tabs from "./Tabs";


class Main extends Component {


    state = {
        toDoList: JSON.parse(localStorage.getItem("toDoList")) || [],
        formInput: "Hello, my name is Hanry",
        currentTab: "all",
        editableText: "",
        editableTaskId: null,
    };


    oneUnloadHandler = () => {
        localStorage.setItem("toDoList", JSON.stringify(this.state.toDoList))
    };


    componentDidMount() {
        window.addEventListener("beforeunload", this.oneUnloadHandler)
    }

    componentWillUnmount() {
        window.removeEventListener("beforeunload", this.oneUnloadHandler)
    }


    inputHandler = ({target: {name, value}}) => {
        this.setState({
            [name]: value
        })
    };

    handlerOnSubmit = (e) => {
        e.preventDefault();

        this.setState((prevState) => {
            return {
                formInput: "",
                toDoList: [
                    {
                        description: prevState.formInput,
                        id: Math.random(),
                        completed: false,
                        editable: false
                    },
                    ...prevState.toDoList]
            }
        });

    };

    deleteBtnHandler = (target) => {
        this.setState((prevState) => {
            return {
                toDoList: prevState.toDoList.filter((task) => task.id !== +target.dataset.id)
            }
        })
    };

    okBtnHandler = (target) => {
        this.setState((prevState) => {
            return {
                toDoList: prevState.toDoList.map(({id, description, completed, editable}) => {
                    if (id === +target.dataset.id) {
                        return {
                            id,
                            description,
                            completed: !completed,
                            editable
                        }
                    }
                    return {
                        id,
                        description,
                        completed,
                        editable
                    }
                })
            }
        })
    };


    editBtnHandler = (target) => {

        this.setState({
            editableTaskId: target.dataset.id,
            editableText: this.state.toDoList.find((task) => task.id === +(target.dataset.id)).description
        })

    };


    saveBtnHandler = (target) => {
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
                      list={this.state.toDoList}/>
            </>
        )
    }
}

export default Main