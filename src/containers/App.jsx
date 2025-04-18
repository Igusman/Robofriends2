import React from "react";
import CardList from "../component/CardList";
import SearchBox from '../component/SearchBox';
import './App.css'
import Scroll from '../component/Scroll'

class App extends React.Component {
    constructor() {
        super()
        this.state = {
            robots: [],
            searchfield: ''
        }
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => { return response.json() })
            .then(users => { this.setState({ robots: users }) })
            .catch(err => console.log(err))
    }

    onSearchChange = (event) => {
        this.setState({ searchfield: event.target.value })
    }

    render() {
        const { robots, searchfield } = this.state
        const filterRobot = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchfield.toLowerCase())
        })
        return !robots.length ?
            <h1>LOADING</h1>
            :
            ((
                <div className="tc">
                    <h1 className="f2">RoboFriends</h1>
                    <SearchBox searchChange={this.onSearchChange} />
                    <Scroll>
                        <CardList robots={filterRobot} />
                    </Scroll>
                </div>
            ))

    }
}

export default App