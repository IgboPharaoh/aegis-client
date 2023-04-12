import { firebaseAuthApp } from '@/firebase';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/router';
import { useState } from 'react';

export const useSignInHook = () => {
    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
    });
    const [signIn, setSignIn] = useState({
        error: '',
        isLoading: false,
        user: {},
    });

    const router = useRouter();
    const { email, password } = loginData;
    const { error, isLoading } = signIn;
    const [userdata, setUserdata] = useState<any>();

    const signInToAccount = () => {
        setSignIn({ ...signIn, isLoading: true });

        if (!email) {
            setSignIn((signIn) => ({
                ...signIn,
                error: `You might want to ensure your email is correct`,
                isLoading: false,
            }));
            return;
        }
        if (!password) {
            setSignIn((signIn) => ({
                ...signIn,
                error: `Ooops! you might want to check your password is not empty`,
                isLoading: false,
            }));
            return;
        }

        setSignIn((signIn) => ({
            ...signIn,
            error: ``,
        }));

        const auth = getAuth(firebaseAuthApp);
        if (!auth) {
            setSignIn((signIn) => ({ ...signIn, error: `Unfortunately, no authentication details was found` }));
            return;
        }

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                setUserdata(user);
                setSignIn((signIn) => ({ ...signIn, isLoading: false, user }));
                setLoginData((loginData) => ({ ...loginData, email: '', password: '' }));

                router.push('/home');
            })
            .catch((error) => {
                const errorCode = error.code;
                setSignIn((signIn) => ({ ...signIn, error: errorCode.message, isLoading: false }));
                setLoginData((loginData) => ({ ...loginData, email: '', password: '' }));
            });
    };

    return {
        loginData,
        setLoginData,
        email,
        password,
        error,
        signInToAccount,
        isLoading,
    };
};
