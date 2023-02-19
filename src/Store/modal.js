import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isOpenNew: false,
    isOpenCreate: false,
    isOpenEdit: false,
    isOpenDelete: false,
}

export const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        toggleNew: state => {
            state.isOpenNew = !state.isOpenNew
            state.isOpenCreate = false
            state.isOpenEdit = false
            state.isOpenDelete = false
        },
        toggleCreate: state => {
            state.isOpenNew = false
            state.isOpenCreate = !state.isOpenCreate
            state.isOpenEdit = false
            state.isOpenDelete = false
        },
        toggleEdit: state => {
            state.isOpenNew = false
            state.isOpenCreate = false
            state.isOpenEdit = !state.isOpenEdit
            state.isOpenDelete = false
        },
        toggleDelete: state => {
            state.isOpenNew = false
            state.isOpenCreate = false
            state.isOpenEdit = false
            state.isOpenDelete = !state.isOpenDelete
        },
    },
})

export const { toggleNew, toggleEdit, toggleCreate, toggleDelete } = modalSlice.actions

export default modalSlice.reducer
