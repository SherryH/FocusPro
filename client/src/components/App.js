import React from 'react';
import Sidebar from './Sidebar';


export default class App extends React.Component {

  render() {
    // pass auth to all children elements
    let children = null;
    if (this.props.children) {
      // add the auth property to each of children
      children = React.cloneElement(this.props.children, {
        auth: this.props.route.auth,
      });
    }
    return (
      <div>
        <Sidebar auth={this.props.route.auth} />
        <main>
          <div className="main">
            {children}
          </div>
        </main>
      </div>
    );
  }
}
