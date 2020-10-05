class Counter extends React.Component {
    constructor(props) {
      super()
      this.props = props;
      console.log(this.props);
      this.state.num = props.n;
    }
    state = {
      num: ''
    }
    handleClick = () => {
      console.log(this.state.num);
      this.setState({
        num:this.state.num+1
      })

    }
    render() {
      return (
        <div>
          {this.state.num}
          <button onClick={this.handleClick}>
            添加


          </button>
        </div>
      )
    }
  }

  ReactDOM.render(
    <Counter n={100}></Counter>,window.root
  )