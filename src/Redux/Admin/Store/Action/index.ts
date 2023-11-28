import * as ActionTypes from '../ActionTypes'

/**
 * get api action candidates
 */

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





/**
 * adi Api action candidates
 */


export const addCandidate = (params: any) => {
    return {
        type: ActionTypes.ADD_CANDIDATES,
        payload: params,
    };
 };