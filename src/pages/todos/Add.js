import React, {useEffect, useState, useRef} from 'react';
import {db, auth} from "../../firebase";
import {collection, deleteDoc, doc, onSnapshot, addDoc } from "firebase/firestore";
import {useNavigate, Link} from 'react-router-dom'
const Add = () => {
    let navigate = useNavigate();
    const [todos, setTodos] = useState([]);
    const [message, setMessage] = useState('');
    const [filter, setFilter] = useState([]);
    const [id, setId] = useState(0)
    const focus =  useRef(null);
    let unsub = null;
    useEffect(() => {
        if(!auth.currentUser){
            navigate('/')
            alert('Vui lòng đăng nhập để thực hiện chức năng này')
        }
      (async () => {
        const collectionRef = collection(db, 'todo');
        unsub = onSnapshot(collectionRef, (snapShot) => {
          const localTodos = [];
          snapShot.forEach(doc => {
            localTodos.push({
                id: doc.id,
              id_user: doc.data().id,
              message: doc.data().message
            });
        });
        setTodos(localTodos);
        setMessage('');
    });
})();
}, []);
    const addNote = async () => {
        const collectionRef = collection(db, 'todo');
        console.log(collectionRef)
        await addDoc(collectionRef, { message: message,id: id});
        focus.current.focus();

    }
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                setId(user.uid)
                console.log(user.uid);
            }
          })
        setFilter(todos.filter(todo => todo.id_user === id))
    }, [todos])

    const _logOut = () => {
        auth.signOut();
        navigate('/')
    }
    const deleteNote = async (id) => {

        const docRef = doc(db, 'todo', id);
        await deleteDoc(docRef);
    }

    return (
        <div className='container mt-2 mx-auto'>
            <div>
                <button className='px-3 float-right py-2 text-sm text-blue-100 bg-red-600 rounded' onClick={_logOut}>Đăng xuất</button>
                <h1 className='text-center font-bold mt-10 uppercase'>Thêm công việc</h1>
                <div className="my-10">
                <label htmlFor="comment" className="text-lg text-gray-600"></label>
                <textarea onChange={(evt) => setMessage(evt.target.value)}
                    value={message} className="w-full h-20 p-2 border rounded focus:outline-none focus:ring-gray-300 focus:ring-1"
                name="comment" placeholder=""></textarea>
                </div>
                <div className='flex items-center justify-between'>
                    <button onClick={addNote} className="px-3 py-2 text-sm text-blue-100 bg-blue-600 rounded">Thêm công việc</button>
                </div>
            </div>
            <div className='mt-10'>
                    {filter?.map((item, index) => (
                        <div className='flex items-center justify-between my-2' key={index}>
                            <p>{item.message}</p> 
                            <div>
                                <Link to={`/edit?id=${item.id}`}>Sửa</Link>
                                <button onClick={() => deleteNote(item.id)} className='px-3 ml-2 py-2 text-sm text-blue-100 bg-blue-600 rounded'>Xóa</button>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default Add;
