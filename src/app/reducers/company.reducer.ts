import * as companyActions from './../actions/company.actions';

export function companyReducer(state = [], action: companyActions.Action) {
    switch (action.type) {
        case companyActions.LOAD_COMPANIES_SUCCESS: {
            return action.payload;
        }
        case companyActions.DELETE_COMPANY_SUCCESS: {
            return state.filter(company => company.id !== action.payload);
        }
        default: {
            return state;
        }
    }
}