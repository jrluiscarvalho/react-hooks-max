import React , {useState, useEffect, useReducer, useRef, useMemo} from 'react'
import axios from 'axios';

import List from './List';
import {useFormInput} from '../hooks/forms'

export default function Todo(props){
  const [inputIsValid, setInputIsValid] = useState(false)
  const todoInput = useFormInput()

  function todoListReducer(state, action){
    switch (action.type) {
      case 'ADD':
        return state.concat(action.payload);
      case 'SET':
        return action.payload;
      case 'REMOVE':
        return state.filter((todo) => todo.id !== action.payload)
      default:
        return state;
    }
  }
  const [todoList, dispatch] = useReducer(todoListReducer, [])

  useEffect(() => {
    axios.
      get('https://myapp-9ac9b.firebaseio.com/todos.json').
      then(result => {
        console.log(result)
        const todoData = result.data;
        const todos = [];
        for (const key in todoData) {
          todos.push({id: key, name: todoData[key].name})
        }
        dispatch({type: 'SET', payload: todos})
      })
  }, [])

  function todoAddHandler(){
    const todoName = todoInput.value;
    axios.
      post('https://myapp-9ac9b.firebaseio.com/todos.json', {name: todoName}).
      then(res => {
        const todoItem = {id: res.data.name, name:todoName}
        dispatch({type: 'ADD', payload: todoItem})
        console.log(res)
      }).
      catch(err => {
        console.log(err)
      })
  }

  function todoRemoveHandler(todoId){
    axios.
      delete(`https://myapp-9ac9b.firebaseio.com/todos/${todoId}.json`).
      then(res => {
        dispatch({type: 'REMOVE', payload: todoId});
      }).
      catch(err => console.log(err))
  }

  return (
    <React.Fragment>
      <input
        type="text"
        placeholder="Todo"
        onChange={todoInput.onChange}
        value={todoInput.value}
        style={{backgroundColor: todoInput.validity ? 'transparent' : 'red'}}
      />
      <button type="button" onClick={() => todoAddHandler()}>Add</button> 
      { useMemo(() => <List items={todoList} onClick={todoRemoveHandler}/>, [todoList])}
    </React.Fragment>
  )
}