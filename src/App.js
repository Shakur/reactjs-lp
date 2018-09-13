import React, {Component} from 'react';
import classes from './App.css';
import './person/Person.css';
import Person from './person/Person';

class App extends Component {

    render() {
        const style = {
            backgroundColor: 'green',
            color: 'white',
            font: 'inherit',
            border: '1px solid blue',
            padding: '8px',
            cursor: 'pointer'
        }


        let assignedClasses = [];

        if (this.state.persons.length <= 2) {
            assignedClasses.push(classes.red);
        }

        if (this.state.persons.length <= 1) {
            assignedClasses.push(classes.bold);
        }

        if (this.state.showPersons) {
            style.backgroundColor = 'red'
        }

        return (
            <div className={classes.App}>
                <h1>Hi I am React app</h1>
                <p className={assignedClasses.join(" ")}>This is really working</p>
                <button
                    style={style}
                    onClick={this.togglePersonsHandler}>Switch name</button>
                {this.state.showPersons &&
                <div>
                    {this.state.persons.map((person, index) =>
                        <Person
                            key={person.id}
                            {...person}
                            click={() => this.deletePersonHandler(index)}
                            changed={(e) => this.nameChangedHandler(e, person.id)} />
                    )}
                </div>
                }
            </div>
        );
    }

    state = {
        persons: [
            { id: "asd1", name: 'Max', age: 28 },
            { id: "asd2", name: 'Manu', age: 29 },
            { id: "asd3", name: 'Stefanie', age: 26 }
        ],
        showPersons: false
    }

    nameChangedHandler = (e, id) => {
        const personIndex = this.state.persons.findIndex(p => p.id === id);
        const person = {...this.state.persons[personIndex]};

        person.name = e.target.value();

        const persons = [...this.state.persons];
        persons[personIndex] = person;

        this.setState({
            persons: persons
        })
    }

    deletePersonHandler = (index) => {
        const persons = [...this.state.persons];
        persons.splice(index, 1);
        this.setState({
            persons: persons
        })
    }

    togglePersonsHandler = () => {
        const doesShow = !this.state.showPersons;
        this.setState({
            showPersons: doesShow
        })
    }
}

export default App;
