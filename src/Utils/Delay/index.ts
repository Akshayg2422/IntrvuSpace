/**
 * A "modern" sleep statement.
 *
 * @param ms The number of milliseconds to wait.
 */
export const delay = (ms: number) =>
  new Promise(resolve => setTimeout(() => resolve, ms));


export function matchStateToTerm(state, value) {
  
  return (
    state.name.toLowerCase().indexOf(value.toLowerCase()) !== -1
  )
}



