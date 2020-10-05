
function School(props) {
    console.log(this);
  return <h1>学校 {props.color} && {props.size}</h1>
  }


let Clock = () => {
    return <h1>
      当前时间是 ： {
        new Date().toLocaleString()
      }
    </h1>
  }
//   render(<div>
//     <School color="red" size="100"></School>
//     <School></School>
//     <School {...{color:'green',size:20}}></School>
//   </div>,window.root);