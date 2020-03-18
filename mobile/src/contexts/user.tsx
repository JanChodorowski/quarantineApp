import React from 'react';

interface User {
  user: string | null;
  setUser: any;
}

const UserContext = React.createContext<User>({
  user: null,
  setUser: () => {
    console.log('test');
  }
});

export default UserContext;
