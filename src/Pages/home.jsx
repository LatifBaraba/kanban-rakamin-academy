import React from 'react'
import Card from '../Components/card'
import { getTodos, setLogin } from '../Api'
import { useMutation, useQueries, useQuery } from 'react-query'
import Toast from '../Utils/toast'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const token = localStorage.getItem('token')
    const navigate = useNavigate()

    const { mutate: mutateLogin } = useMutation(setLogin, {
        onSuccess: data => {
            Toast('success', 'Login Success')
            localStorage.setItem('isLoggedin', true)
            localStorage.setItem('token', data.auth_token)
            refetchTodos()
            navigate(0)
        },
    })

    const {
        data: todos,
        isLoading,
        refetch: refetchTodos,
    } = useQuery(['list-todos', token], () => getTodos({ token }), {
        onSuccess: data => {
            data.length == 0 && Toast('warning', 'Todos is empty')
        },
        onError: async () => {
            Toast('error', 'Unauthorized')
            // localStorage.clear()
            await mutateLogin()
        },
        retry: 1,
    })

    return (
        <div className='p-6 flex flex-wrap gap-4'>
            {!isLoading && todos.map((todo, idx) => <Card key={idx} todos={todo} idTodos={todo.id} />)}
            <button
                className='text-white bg-[#01959F] font-bold px-4 py-1 text-sm outline-none focus:outline-none rounded-lg mr-[10px] ease-linear transition-all duration-150 absolute bottom-2 left-2 z-1'
                type='button'
                onClick={() => mutateLogin()}
            >
                Login
            </button>
        </div>
    )
}

export default Home
