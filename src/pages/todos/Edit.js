import React, {useEffect, useState} from 'react';
import {useSearchParams} from "react-router-dom";
import {doc, getDoc, updateDoc} from 'firebase/firestore';
import {db, auth} from "../../firebase";
import {useNavigate, Link} from 'react-router-dom'

const Edit = () => {
    let navigate = useNavigate();
    const [searchParam] = useSearchParams();
    const [message, setMessage] = useState('');
    useEffect(() => {
        if(!auth.currentUser){
            navigate('/')
            alert('Vui lòng đăng nhập để thực hiện chức năng này')
        }
        (async () => {
            const docRef = doc(db, 'todo', searchParam.get('id'));
            const docSnapshot = await getDoc(docRef);
            setMessage(docSnapshot.data().message);
        })();
    }, []);

    const editNote = async () => {
        const docRef = doc(db, 'todo', searchParam.get('id'));
        await updateDoc(docRef, {message: message});
        alert('Sửa thành công');
        navigate('/add')
    };

    return (
        <div className='container mx-auto'>
            <button className="px-3 float-right mt-5 py-2 text-sm text-blue-100 bg-blue-600 rounded">
                <Link to={'/add'}>Trở về trang thêm công việc</Link>
            </button>
            <h1 className='text-center font-bold my-10'>Sửa</h1>
            <div className='flex justify-center'>
                <textarea value={message} onChange={(evt) => setMessage(evt.target.value)} class="w-full h-20 p-2 border rounded focus:outline-none focus:ring-gray-300 focus:ring-1"
                    name="comment" placeholder=""></textarea>
            </div>
            <button onClick={editNote} className="px-3 mt-5 py-2 text-sm text-blue-100 bg-blue-600 rounded">Sửa</button>
        </div>
    );
};

export default Edit;
