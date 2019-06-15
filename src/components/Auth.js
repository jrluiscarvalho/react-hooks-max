import React, {useContext} from 'react';

import AuthContext from '../auth-context';

export default function Auth(props){
  const auth = useContext(AuthContext);

  return <button onClick={auth.login}>Log in!</button>;
  
}