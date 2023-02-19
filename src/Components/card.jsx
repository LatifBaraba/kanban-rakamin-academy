import React, { useState } from 'react'
import PlusSvg from '../Assets/Icons/plus.svg'
import Task from './task'
import { getTasks } from '../Api'
import { useQuery } from 'react-query'
import Modal from './modal'
import { useDispatch, useSelector } from 'react-redux'
import { toggleCreate } from '../Store/modal'

const Card = ({ todos, idTodos }) => {
    const token = localStorage.getItem('token')
    const isShowCreate = useSelector(state => state.counter.isOpenCreate)
    const dispatch = useDispatch()

    const { data: tasks, isLoading } = useQuery(['list-tasks', token], () => getTasks({ token, idTodos }), {
        onSuccess: data => {
        },
        onError: () => {
            // Toast('error', 'Unauthorized')
            // localStorage.clear()
        },
        enabled: !!idTodos,
        // retry: 1,
    })

    return (
        <div className='w-[326px] border-[1px] border-[#01959F] p-4 bg-[#F7FEFF] rounded flex flex-col gap-2 relative'>
            {isShowCreate && <Modal mode={'create'} idTodos={todos.id} />}
            <div className='w-[88px] rounded border-[1px] border-[#01959F] px-2 py-[2px] text-xs text-center text-[#01959F] whitespace-nowrap'>
                {todos.title}
            </div>
            <div className='font-bold text-xs text-[#404040]'>{todos.description}</div>
            <div className='relative'>
                {!isLoading && tasks.map((task, idx) => <Task key={idx} task={task} idTodos={todos.id} draggable />)}
            </div>
            <button className='flex gap-[6px]'>
                <img src={PlusSvg} alt='' />
                <span className='text-xs text-[#1D1F20]' onClick={() => dispatch(toggleCreate())}>
                    New Task
                </span>
            </button>
        </div>
    )
}

export default Card
