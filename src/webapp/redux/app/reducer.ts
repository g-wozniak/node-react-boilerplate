interface State {

}

export default (state: State = {}, action: any): State => {
  console.log(action)
  return state 
}