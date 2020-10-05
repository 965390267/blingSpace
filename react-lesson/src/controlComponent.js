
class Control extends React.Component {
    state = {
      username: '你好',
      password: '123456'
    }
    handleChange = (e) => {
      console.log(e.target.name);
      this.setState({
        username: e.target.value
      })
    }
    // 受控组件 需要添加 onChange 属性
    render() {
      return <div>
        <input type="text" name="username" value={this.state.username} onChange={this.handleChange}></input>{this.state.username}
        <input type="text" name="password" value={this.state.password} onChange={this.handleChange}></input>{this.state.password}
      </div>
    }
  }
  render(<Control></Control>,window.root)