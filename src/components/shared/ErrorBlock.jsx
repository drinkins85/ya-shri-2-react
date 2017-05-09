import React from 'react';
import PropTypes from 'prop-types';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';


class ErrorBlock extends React.Component{
    render(){
        return(
            <div >
                {
                    this.props.errors.length > 0 ?
                        <CSSTransitionGroup transitionName="opacityappear" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
                            <div className="error-block">
                                 <span className="error-block__message">
                                {
                                    this.props.errors.map((error, index) => {
                                        return <li key={index}>{error}</li>
                                    })
                                }
                                 </span>
                                <a className="error-block__close" onClick={this.props.actions.deleteErrors} ><i>&#10761;</i></a>
                            </div>
                        </CSSTransitionGroup>
                        :
                        <div></div>
                }
            </div>
        )
    }
}


ErrorBlock.propTypes = {
    errors: PropTypes.array,
    actions: PropTypes.object
};

export default ErrorBlock;



