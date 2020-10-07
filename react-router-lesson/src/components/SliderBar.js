import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class sliderBar extends Component {
    render() {
        console.log(this.props.sliderBarData);
        return (
            <div className="nav nav-stacked">
                {
                    this.props.sliderBarData.map((slide,index)=>{
                        return (<li key={index}>
                            <Link to={slide.path}>{slide.content}</Link>
                        </li>)
                    })
                }
            </div>
        );
    }
}

export default sliderBar;