import React, { Component } from 'react';

class UserDetail extends Component {
    render() {
        return (
            <div>
                detail
                {
                    this.props.match.params.uid
                }
                ========
                {
                    this.props.location.state
                }
            </div>
        );
    }
}

export default UserDetail;