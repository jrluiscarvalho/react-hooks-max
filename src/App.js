import React, {useState} from 'react';
import Todo from './components/Todo'
import Header from './components/Header';
import Auth from './components/Auth';
import AuthContext from './auth-context'

export default function App() {

  const [page, setPage] = useState('auth')
  const [authStatus, setAuthStatus] = useState(false)

  function switchPage(pageName){
    setPage(pageName);
  };

  function login(){
    setAuthStatus(true)
  }

  return (
    <div className="App">
      <AuthContext.Provider value={{status: authStatus, login}}>
        <Header
          onLoadTodos={() => switchPage('todos')}
          onLoadAuth={() => switchPage('auth')}
        />
        <hr/>
        {page === 'auth' ? <Auth/> : <Todo/>}
      </AuthContext.Provider>
    </div>
    
  );
}