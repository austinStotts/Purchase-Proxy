// NPM Modules
import React, { Component, PureComponent } from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';
import Radium from 'radium';

// React components from files
import styles from './styles';
import Disclaimer from './comps/disc';
import Option from './comps/option';
import Button from './comps/button';
import Link from './comps/link';
import Buy from './comps/buy';
import Title from './comps/title';

// Root component
class App extends PureComponent {
  constructor (props) {
    super(props);
    this.state = {
      pet_id: "10163",
      pet: {
        "pet_id":"9999",
        "class":"Loading...",
        "family":"...",
        "genus":"...",
        "species":"...",
        "price":"..."
      },
      buy: true
    };

    // bind(this);
    this.getPet = this.getPet.bind(this);
    this.showBuy = this.showBuy.bind(this);
    // *** *** *** *** *** *** *** *** ***
  }

  getPet () { // server get request for pet object
    Axios.get('http://ec2-3-17-59-254.us-east-2.compute.amazonaws.com:4002/buy', {
      headers: {
        "pet_id":this.state.pet_id
      }
    }).then(res => {
      console.log(res.data);
      this.setState({
        pet:res.data
      })
    })
  }

  showBuy () { // toggle purchase options
    this.setState({buy:!this.state.buy});
  }

  componentDidMount () {
    this.getPet();
  }

  render () {
    // Show product info
    return (
      <div>
        <div hidden={!this.state.buy} style={{width:'100%'}}>
          <Title pet={this.state.pet}/>
          <Buy price={this.state.pet.price} func={this.showBuy}/>
          <Disclaimer />
        </div>
      

        {/* show purchase options: */}
        <div hidden={this.state.buy} style={{width:'100%'}}> 
          <i className={'material-icons'} style={[styles.back.base]} onClick={this.showBuy}>undo</i>
          <Link text={this.state.pet.species} size={'26px'} link={`https://en.wikipedia.org/wiki/${this.state.pet.species}`}/>
          <Option o1={'male'} o2={'female'}/>
          <Option o1={'gift wrap'} o2={'none'} default={'two'}/>
          <Option o1={'toy box'} o2={'none'} default={'two'}/>
        </div>
      </div>
    )
  }
}

App = Radium(App);

// ReactDOM Render function
ReactDOM.render(<App />, document.getElementById('root'));