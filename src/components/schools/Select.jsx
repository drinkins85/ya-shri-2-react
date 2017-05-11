import React from 'react';
import PropTypes from 'prop-types';

class Select extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            selected: this.props.selectedId
        };
        this.handleChange = this.handleChange.bind(this);

    }

    handleChange(event){
        let selectedId;
        if (Array.isArray(this.state.selected)){
            selectedId = [...this.refs.shcoolselect]
                .filter(option => option.selected)
                .map(option => +option.value);
        } else {
            selectedId = event.target.value;
        }
        this.setState({selected: selectedId})
    }

    render(){
        return(
            <select name="schools" onChange={this.handleChange} multiple={Array.isArray(this.state.selected)}  ref="shcoolselect"  value={this.state.selected} >
                {
                    !Array.isArray(this.state.selected) ? <option value={-1}>Школа</option> : ''
                }
                {
                    this.props.schools.map((school) => {
                        return (
                            <option key={school._id} value={school._id}>{school.title}</option>
                        )
                    })
                }
            </select>
        )
    }

}

Select.propTypes = {
    schools: PropTypes.array.isRequired,
    onChange: PropTypes.func
};


export default Select;
