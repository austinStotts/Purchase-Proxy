import React, { Component, PureComponent } from 'react';
import ReactDOM from 'react-dom';
import Button from './comps/button';
import Axios from 'axios';
import styles from './styles';

class App extends PureComponent {
  constructor (props) {
    super(props);
    this.state = {
      pet_id: "1113",
      pet: '',
      number: ''
    }
    this.getPet = this.getPet.bind(this);
  }

  getPet () {
    Axios.get('http://localhost:4000/buy', {
      headers: {
        "pet_id":this.state.pet_id
      }
    })
    .then(res => {
      this.setState(() => {
        return {pet:res.data}
      })
    })
  }

  componentDidMount () {
    //this.getPet()
    window.setInterval(() => {
      this.setState(_=> {
        return {number:1}
      });
    },500)
  } 

  render () {
    console.log("RENDER !!")
    return (
      <div>
        <h1>{this.state.number}</h1>
        <Button text={'i am a button'} function={()=>{console.log('click')}}/>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));