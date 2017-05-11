import React from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as schoolsActions from '../actions/schoolsActions';
import * as errorsActions from '../actions/errorsActions';
import * as classroomsActions from '../actions/classroomsActions';
import * as teachersActions from '../actions/teachersActions';
import * as lectionsActions from '../actions/lectionsActions';
import Schools from './schools/Schools';
import ErrorBlock from './shared/ErrorBlock';
import Classrooms from './classrooms/Classrooms';
import Teachers from './teachers/Teachers';
import Lections from './lections/Lections';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

class Index extends React.Component{

    constructor(props){
        super(props);

        this.props.classroomsActions.loadData();
        this.props.schoolsActions.loadData();
        this.props.teachersActions.loadData();
        this.props.lectionsActions.loadData();

    }

    render(){

        return(
            <section>
                <CSSTransitionGroup transitionName="opacityappear" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
                <ErrorBlock errors={this.props.errors} actions={this.props.errorsActions}/>
                </CSSTransitionGroup>

                <Schools schools={this.props.schools}
                         actions={this.props.schoolsActions}
                         errActions={this.props.errorsActions}
                         lections={this.props.lections}
                />
                <Classrooms classrooms={this.props.classrooms}
                            actions={this.props.classroomsActions}
                            errActions={this.props.errorsActions}
                            lections={this.props.lections}
                />
                <Teachers teachers={this.props.teachers}
                          actions={this.props.teachersActions}
                          errActions={this.props.errorsActions}
                          lections={this.props.lections}
                />
                <Lections lections={this.props.lections}
                          classrooms={this.props.classrooms}
                          teachers={this.props.teachers}
                          schools={this.props.schools}
                          actions={this.props.lectionsActions}
                          errActions={this.props.errorsActions}
                          lectionsFilter={this.props.lectionsFilter}
                />
            </section>

        )
    }

}

function mapStateToProps (state) {
    return {
        schools: state.schools,
        classrooms: state.classrooms,
        teachers: state.teachers,
        lections: state.lections,
        lectionsFilter: state.lectionsFilter,
        errors: state.errors
    }
}

function mapDispatchToProps(dispatch) {
    return {
        schoolsActions: bindActionCreators(schoolsActions, dispatch),
        classroomsActions: bindActionCreators(classroomsActions, dispatch),
        teachersActions: bindActionCreators(teachersActions, dispatch),
        lectionsActions: bindActionCreators(lectionsActions, dispatch),
        errorsActions: bindActionCreators(errorsActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);