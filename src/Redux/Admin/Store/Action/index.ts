import * as ActionTypes from '../ActionTypes'


//get candidates======>>>>>>>>>>>>>>>>>


export const getCandidates = (params: any) => {
   return {
       type: ActionTypes.GET_CANDIDATES,
       payload: params,
   };
};

export const getCandidatesSuccess = (response: any) => {

   return {
       type: ActionTypes.GET_CANDIDATES_SUCCESS,
       payload: response
   }
}



export const getCandidatesFailure = (error: any) => {
   return {
       type: ActionTypes.GET_CANDIDATES_FAILURE,
       payload: error
   }
}







///ADD CANDIDATES LIST//////////////////////////////////////===>>>


export const addCandidate = (params: any) => {
    return {
        type: ActionTypes.ADD_CANDIDATES,
        payload: params,
    };
 };