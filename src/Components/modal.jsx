import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import closeSvg from '../Assets/Icons/close.svg'
import seruSvg from '../Assets/Icons/seru.svg'
import { toggleCreate, toggleDelete, toggleEdit, toggleNew } from '../Store/modal'
import { useMutation } from 'react-query'
import { createTask, deleteTask, updateTask } from '../Api'
import { useForm } from 'react-hook-form'
import Toast from '../Utils/toast'
import { useNavigate } from 'react-router-dom'

const Modal = ({ mode, task, idTodos }) => {
    const navigate = useNavigate()
    const token = localStorage.getItem('token')
    const isShowNew = useSelector(state => state.counter.isOpenNew)
    const isShowCreate = useSelector(state => state.counter.isOpenCreate)
    const isShowEdit = useSelector(state => state.counter.isOpenEdit)
    const isShowDelete = useSelector(state => state.counter.isOpenDelete)
    const dispatch = useDispatch()
    
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const {
        register: registerCreate,
        handleSubmit: handleSumbitCreate,
        formState: { errors: errorsCreate },
    } = useForm()

    const { mutate: mutateUpdate } = useMutation(updateTask, {
        onSuccess: data => {
            Toast('success', 'Update Success')
            dispatch(toggleEdit())
            setTimeout(() => {
                navigate(0)
            }, 2000);
        },
    })

    const { mutate: mutateCreate } = useMutation(createTask, {
        onSuccess: data => {
            Toast('success', 'Create Success')
            dispatch(toggleCreate())
            setTimeout(() => {
                navigate(0)
            }, 2000);
        },
    })

    const { mutate: mutateDelete } = useMutation(deleteTask, {
        onSuccess: data => {
            Toast('success', 'Deleting Success')
            dispatch(toggleDelete())
        },
    })

    const onSubmit = data => {
        const payload = {
            name: data.name,
            progress: data.progress,
        }
        mutateUpdate({ token, idTodos, idTask: task.id, payload })
    }

    const onSubmitCreate = data => {
        const payload = {
            name: data.name,
            progress: data.progress,
        }

        mutateCreate({ token, idTodos, payload })
    }

    if (isShowNew && mode === 'new') {
        return (
            <>
                <div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
                    <div className='relative w-[420px] my-6 mx-auto'>
                        {/*content*/}
                        <div className='border-0 rounded-lg shadow-md relative flex flex-col w-full bg-white outline-none focus:outline-none'>
                            {/*header*/}
                            <div className='flex items-start justify-between p-6'>
                                <h3 className='text-lg text-[#404040]'>Add New Group</h3>
                                <button className='fill-black w-[24px]' onClick={() => dispatch(toggleNew())}>
                                    <img src={closeSvg} alt='' />
                                </button>
                            </div>
                            {/*body*/}
                            <div className='relative px-6 gap-4 flex flex-col'>
                                <div className=''>
                                    <div className='form-control w-full gap-2'>
                                        <label className='label'>
                                            <span className='label-text text-xs text-[#404040]'>Title</span>
                                        </label>
                                        <input
                                            type='text'
                                            placeholder='Type your Task'
                                            className='input w-full bg-transparent border-[2px] border-[#EDEDED] rounded-lg py-2 px-4 text-xs font-normal text-[#404040] leading-5'
                                        />
                                    </div>
                                </div>
                                <div className=''>
                                    <div className='form-control w-full gap-2'>
                                        <label className='label'>
                                            <span className='label-text text-xs text-[#404040]'>Description</span>
                                        </label>
                                        <textarea
                                            className='textarea textarea-bordered bg-transparent border-[2px] border-[#EDEDED] rounded-lg py-2 px-4 text-xs font-normal text-[#404040] leading-5'
                                            placeholder='Placeholder'
                                        ></textarea>
                                    </div>
                                </div>
                            </div>
                            {/*footer*/}
                            <div className='flex items-center justify-end p-6 rounded-[10px]'>
                                <button
                                    className='text-[#1D1F20] background-transparent font-bold px-4 py-1 text-sm border-[1px] border-[#E0E0E0] outline-none focus:outline-none rounded-lg mr-[10px] ease-linear transition-all duration-150'
                                    type='button'
                                    onClick={() => dispatch(toggleNew())}
                                >
                                    Cancel
                                </button>
                                <button
                                    className='text-white bg-[#01959F] font-bold px-4 py-1 text-sm outline-none focus:outline-none rounded-lg mr-[10px] ease-linear transition-all duration-150'
                                    type='button'
                                    onClick={() => dispatch(toggleNew())}
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='opacity-25 fixed inset-0 z-40'></div>
            </>
        )
    } else if (isShowCreate && mode === 'create') {
        return (
            <>
                <div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
                    <div className='relative w-[420px] my-6 mx-auto'>
                        {/*content*/}
                        <div className='border-0 rounded-lg shadow-md relative flex flex-col w-full bg-white outline-none focus:outline-none'>
                            {/*header*/}
                            <div className='flex items-start justify-between p-6'>
                                <h3 className='text-lg font-bold text-[#404040]'>Create Task</h3>
                                <button className='fill-black w-[24px]' onClick={() => dispatch(toggleCreate())}>
                                    <img src={closeSvg} alt='' />
                                </button>
                            </div>
                            {/*body*/}
                            <div className='relative px-6 gap-4 flex flex-col'>
                                <div className=''>
                                    <div className='form-control w-full gap-2'>
                                        <label className='label'>
                                            <span className='label-text text-xs font-bold text-[#404040]'>Task Name</span>
                                        </label>
                                        <input
                                            type='text'
                                            placeholder='Type your Task'
                                            className='input w-full bg-transparent border-[2px] border-[#EDEDED] rounded-lg py-2 px-4 text-xs font-normal text-[#404040] leading-5'
                                            {...register('name', { required: true })}
                                        />
                                    </div>
                                </div>
                                <div className=''>
                                    <div className='form-control w-full gap-2'>
                                        <label className='label'>
                                            <span className='label-text text-xs font-bold text-[#404040]'>Progress</span>
                                        </label>
                                        <input
                                            type='text'
                                            placeholder='70%'
                                            className='input w-[143px] bg-transparent border-[2px] border-[#EDEDED] rounded-lg py-2 px-4 text-xs font-normal text-[#404040] leading-5'
                                            {...register('progress', { required: true })}
                                        />
                                    </div>
                                </div>
                            </div>
                            {/*footer*/}
                            <div className='flex items-center justify-end p-6 rounded-[10px]'>
                                <button
                                    className='text-[#1D1F20] background-transparent font-bold px-4 py-1 text-sm border-[1px] border-[#E0E0E0] outline-none focus:outline-none rounded-lg mr-[10px] ease-linear transition-all duration-150'
                                    type='button'
                                    onClick={() => dispatch(toggleCreate())}
                                >
                                    Cancel
                                </button>
                                <button
                                    className='text-white bg-[#01959F] font-bold px-4 py-1 text-sm outline-none focus:outline-none rounded-lg mr-[10px] ease-linear transition-all duration-150'
                                    type='button'
                                    onClick={handleSumbitCreate(onSubmitCreate)}
                                >
                                    Save Task
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='opacity-25 fixed inset-0 z-40'></div>
            </>
        )
    } else if (isShowEdit && mode === 'edit') {
        return (
            <>
                <div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
                    <div className='relative w-[420px] my-6 mx-auto'>
                        {/*content*/}
                        <div className='border-0 rounded-lg shadow-md relative flex flex-col w-full bg-white outline-none focus:outline-none'>
                            {/*header*/}
                            <div className='flex items-start justify-between p-6'>
                                <h3 className='text-lg font-bold text-[#404040]'>Edit Task</h3>
                                <button className='fill-black w-[24px]' onClick={() => dispatch(toggleEdit())}>
                                    <img src={closeSvg} alt='' />
                                </button>
                            </div>
                            {/*body*/}
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className='relative px-6 gap-4 flex flex-col'>
                                    <div className=''>
                                        <div className='form-control w-full gap-2'>
                                            <label className='label'>
                                                <span className='label-text text-xs font-bold text-[#404040]'>Task Name</span>
                                            </label>
                                            <input
                                                type='text'
                                                placeholder='Type your Task'
                                                defaultValue={task.name}
                                                className='input w-full bg-transparent border-[2px] border-[#EDEDED] rounded-lg py-2 px-4 text-xs font-normal text-[#404040] leading-5'
                                                {...register('name', { required: true })}
                                            />
                                        </div>
                                    </div>
                                    <div className=''>
                                        <div className='form-control w-full gap-2'>
                                            <label className='label'>
                                                <span className='label-text text-xs font-bold text-[#404040]'>Progress</span>
                                            </label>
                                            <input
                                                type='text'
                                                placeholder='70%'
                                                defaultValue={task.progress_percentage}
                                                className='input w-[143px] bg-transparent border-[2px] border-[#EDEDED] rounded-lg py-2 px-4 text-xs font-normal text-[#404040] leading-5'
                                                {...register('progress', { required: true })}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </form>
                            {/*footer*/}
                            <div className='flex items-center justify-end p-6 rounded-[10px]'>
                                <button
                                    className='text-[#1D1F20] background-transparent font-bold px-4 py-1 text-sm border-[1px] border-[#E0E0E0] outline-none focus:outline-none rounded-lg mr-[10px] ease-linear transition-all duration-150'
                                    type='button'
                                    onClick={() => dispatch(toggleEdit())}
                                >
                                    Cancel
                                </button>
                                <button
                                    className='text-white bg-[#01959F] font-bold px-4 py-1 text-sm outline-none focus:outline-none rounded-lg mr-[10px] ease-linear transition-all duration-150'
                                    type='button'
                                    onClick={handleSubmit(onSubmit)}
                                >
                                    Save Task
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='opacity-25 fixed inset-0 z-40'></div>
            </>
        )
    } else if (isShowDelete && mode === 'delete') {
        return (
            <>
                <div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
                    <div className='relative w-[420px] my-6 mx-auto'>
                        {/*content*/}
                        <div className='border-0 rounded-lg shadow-md relative flex flex-col w-full bg-white outline-none focus:outline-none'>
                            {/*header*/}
                            <div className='flex items-start justify-between p-6'>
                                <div className='flex gap-[11px]'>
                                    <img className='' src={seruSvg} alt='' />
                                    <h3 className='text-lg font-bold text-[#404040]'>Delete Task</h3>
                                </div>
                                <button className='fill-black w-[24px]' onClick={() => dispatch(toggleDelete())}>
                                    <img src={closeSvg} alt='' />
                                </button>
                            </div>
                            {/*body*/}
                            <span className='text-sm leading-6 text-[#404040] px-6'>
                                Are you sure want to delete this task? your action can’t be reverted.
                            </span>
                            {/*footer*/}
                            <div className='flex items-center justify-end p-6 rounded-[10px]'>
                                <button
                                    className='text-[#1D1F20] background-transparent font-bold px-4 py-1 text-sm border-[1px] border-[#E0E0E0] outline-none focus:outline-none rounded-lg mr-[10px] ease-linear transition-all duration-150'
                                    type='button'
                                    onClick={() => dispatch(toggleDelete())}
                                >
                                    Cancel
                                </button>
                                <button
                                    className='text-white bg-[#E11428] font-bold px-4 py-1 text-sm outline-none focus:outline-none rounded-lg mr-[10px] ease-linear transition-all duration-150'
                                    type='button'
                                    onClick={() => mutateDelete({ token, idTodos: task.todo_id, idTask: task.id })}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='opacity-25 fixed inset-0 z-40'></div>
            </>
        )
    }
}

export default Modal
