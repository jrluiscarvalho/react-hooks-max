import React from 'react';

export default function list(props){
  return (
    <ul>
      {props.items.map(todo => {
        return <li key={todo.id} onClick={() => props.onClick(todo.id)}>{todo.name}</li>
      })}
    </ul>
  )
}