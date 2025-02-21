import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TodoInterface {
    show: boolean
}

const initialState: TodoInterface = {
    show: false
}

const TodoSlice = createSlice({
    name: "showTodo",
    initialState,
    reducers: {
        visibility(state, action: PayloadAction<boolean>){
            state.show = action.payload
        }
    }
})

export const {visibility} = TodoSlice.actions
export default TodoSlice.reducer