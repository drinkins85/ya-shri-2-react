import { combineReducers } from 'redux';
import schools from './schools';
import errors from './errors';
import classrooms from './classrooms';
import teachers from './teachers';
import lections from './lections';
import lectionsFilter from './lectionsFilter';

export default combineReducers({
    schools,
    classrooms,
    teachers,
    lections,
    lectionsFilter,
    errors
})