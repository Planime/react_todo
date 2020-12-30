import React, {Component} from "react"


class Tabs extends Component {
    render() {
        const {currentTab}= this.props;
        return (
            <div
                onClick={this.props.tabsOnClickHandler}
                className="tabs_wrapper">
                <button data-tab="all" className={currentTab==="all" ? `tabs_btn selected_tab` : "tabs_btn"}>All</button>
                <button data-tab="completed" className={currentTab==="completed" ? `tabs_btn selected_tab` : "tabs_btn"}>Completed</button>
                <button data-tab="missed" className={currentTab==="missed" ? `tabs_btn selected_tab` : "tabs_btn"}>Missed</button>
            </div>
        )
    }


}

export default Tabs