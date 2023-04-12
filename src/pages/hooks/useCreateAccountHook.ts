import { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/router';
import { firebaseAuthApp } from '@/firebase';

export const useCreateAccountHook = () => {
    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
    });
    const [createAccountState, setCreateAccountState] = useState({
        error: '',
        isLoading: false,
        user: {},
    });

    const [userdata, setUserdata] = useState<any>();
    const { error, isLoading } = createAccountState;
    const router = useRouter();
    const { email, password } = loginData;

    const createUserAccount = () => {
        setCreateAccountState({ ...createAccountState, isLoading: true });

        if (!email) {
            setCreateAccountState((createAccountState) => ({
                ...createAccountState,
                error: `Please choose an email to create an account`,
                isLoading: false,
            }));
            return;
        }
        if (!password) {
            setCreateAccountState((createAccountState) => ({
                ...createAccountState,
                error: `Please choose a strong password to secure your funds`,
                isLoading: false,
            }));
            return;
        }
        setCreateAccountState((createAccountState) => ({
            ...createAccountState,
            error: ``,
        }));

        const auth = getAuth(firebaseAuthApp);
        if (!auth) {
            setCreateAccountState((createAccountState) => ({ ...createAccountState, error: `Unfortunately, no authentication details was found` }));
            return;
        }
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                setUserdata(user);
                console.log(userdata, '<<<<<');
                setCreateAccountState((createAccountState) => ({ ...createAccountState, isLoading: false, user }));
                setLoginData((loginData) => ({ ...loginData, email: '', password: '' }));

                router.push('/home');
            })
            .catch((error) => {
                const errorCode = error.code;
                setCreateAccountState((createAccountState) => ({ ...createAccountState, error: errorCode.message, isLoading: false }));
                setLoginData((loginData) => ({ ...loginData, email: '', password: '' }));
            });
    };

    return {
        loginData,
        setLoginData,
        email,
        password,
        error,
        createUserAccount,
        isLoading,
    };
};
