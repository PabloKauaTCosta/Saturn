import { useState, creatContext } from 'react'

export const AppContext = creatContext({});

export const AppProvider = ({children}) => {

    const [user, setUser] = useState(null);

    const login = (tipo) => {
        setUser({name: 'Usuário Teste', role; tipo});
    };

    const logout = () => {
        setUser(null);
    };

    return (
    <AppContext.Provider value={{user, login, logout}}> </AppContext.Provider>
    );
};