import React from "react";
import "./App.css";
import contacts from "./contacts.json";

class App extends React.Component {
  state = {
    contacts: contacts.slice(0, 5),
  };

  randomUser = () => {
    const randomContact = contacts[Math.floor(Math.random() * contacts.length)];
    this.setState((state) => {
      return { contacts: [randomContact, ...state.contacts] };
    });
  };

  sortByName = () => {
    const sortedContacts = [...this.state.contacts].sort((a, b) => {
      if (a.name === b.name) {
        return 0;
      }
      return a.name < b.name ? -1 : 1;
    });
    this.setState({ contacts: sortedContacts });
  };

  sortByPopularity = () => {
    const sortedPopularity = [...this.state.contacts].sort((a, b) => {
      if (a.popularity === b.popularity) {
        return 0;
      }
      return a.popularity > b.popularity ? -1 : 1;
    });
    this.setState({ contacts: sortedPopularity });
  };

  deleteUser = (id) => {
    const identifyUser = this.state.contacts.findIndex(
      (user) => user.id === id
    );

    this.setState(this.state.contacts.splice(identifyUser, 1));
  };

  render() {
    return (
      <div className="App">
        <button onClick={() => this.randomUser()}>Add random user</button>
        <button onClick={() => this.sortByName()}>Sort by name</button>
        <button onClick={() => this.sortByPopularity()}>
          Sort by popularity
        </button>
        <table>
          <thead>
            <tr>
              <th>Picture</th>
              <th>Name</th>
              <th>Popularity</th>
            </tr>
          </thead>
          <tbody>
            {this.state.contacts.sort().map((contact) => (
              <tr key={contact.id}>
                <td>
                  <img src={contact.pictureUrl} alt="avatar" />
                </td>
                <td>{contact.name}</td>
                <td>{contact.popularity}</td>
                <td>
                  <button onClick={() => this.deleteUser(contact.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
