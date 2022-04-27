import React from 'react';
import {createUserWithEmailAndPassword } from 'firebase/auth';
import {auth} from "../firebase";
import { useNavigate, Link } from 'react-router-dom';
const Signin = () => {
    let navigate = useNavigate();
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const _doSignin = (evt) => {
        evt.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                alert("Đăng kí thành công");
                navigate('/')
            })
            .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
                alert(errorCode + errorMessage);
            });
    }
    return (
        <div className="bg-white h-screen items-center justify-center shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
            <h1 className='font-bold mb-2'>Đăng kí</h1>
        <div className="mb-4">
                <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="username">
                    Email
                </label>
                <input onChange={(evt) => setEmail(evt.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="username" type="text" placeholder="Username" />
            </div>
            <div className="mb-6">
                <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="password">
                    Mật khẩu
                </label>
                <input onChange={(evt) => setPassword(evt.target.value)} className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3" id="password" type="password" placeholder="******************" />
            </div>
            <div className="flex items-center justify-between">
                <button onClick={_doSignin} className="bg-blue hover:bg-blue-dark font-bold py-2 px-4 rounded" type="button">
                    Đăng kí
                </button>
            </div>
            <button className="bg-blue hover:bg-blue-dark font-bold py-2 px-4 rounded"><Link to={'/'}>Trở về trang đăng nhập</Link></button>
        </div>
    );
}

export default Signin