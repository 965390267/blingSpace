
class Clock extends React.Component {
    // constructor(props) {
    //   super(props);
    //   this.state = {
    //     time: new Date().toLocaleString()
    //   };
    // }
    state = {
      time: new Date().toLocaleString()
    }
    // 生命周期
    componentDidMount() {
      this.timer = setInterval(() => {
        this.setState({
          time: new Date().toLocaleString()
        })
      }, 1000);
    }
    componentWillUnmount(){
      clearInterval(this.timer);
    }
    handleClick = ()=>{
      console.log(this);
    }
    render(){
      return <div>
        <h1>
          当前时间是：{
            new Date().toLocaleString()
          }
        </h1>
        <button onClick={
          this.handleClick
        }>
          消除时间
        </button>
      </div>
    }
  }

//   setInterval(() => {
//     render(<div>
//       <Clock></Clock>
//       <Clock></Clock>
//       <Clock></Clock>
//      </div>,window.root);
//   }, 1000);
