class Control extends React.Component {
    password = React.createRef()
    handleClick = () => {
      console.log(this.username.value);
      console.log(this.password.current.value);
    }
    render() {
      return (
        <div>
            <input type="text" name="username" ref={
              (dom) => {
                console.log(dom);
                this.username = dom
              }
            }></input>
            <input type="text" ref={this.password} name="password" ></input>
            <button onClick={
              this.handleClick
            }>
              添加
            </button>
        </div>
      )
    }

  }
  render(<Control></Control>,window.root)