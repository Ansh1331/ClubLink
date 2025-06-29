import { useContext, useEffect, useRef, useState } from 'react'
import Quill from 'quill'
import { RoleCategories, RolePositions } from '../assets/assets';
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';

const AddRole = () => {

    const [title, setTitle] = useState('');
    const [location, setPosition] = useState('Event Coordinator');
    const [category, setCategory] = useState('Technical');
    const [level, setLevel] = useState('Explorer level');

    const editorRef = useRef(null)
    const quillRef = useRef(null)

    const { backendUrl, clubToken } = useContext(AppContext)

    const onSubmitHandler = async (e) => {
        e.preventDefault()

        try {

            const description = quillRef.current.root.innerHTML

            const { data } = await axios.post(backendUrl + '/api/club/post-role',
                { title, description, location, category, level },
                { headers: { token: clubToken } }
            )

            if (data.success) {
                toast.success(data.message)
                setTitle('')
                quillRef.current.root.innerHTML = ""
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }


    }


    useEffect(() => {
        // Initiate Qill only once
        if (!quillRef.current && editorRef.current) {
            quillRef.current = new Quill(editorRef.current, {
                theme: 'snow',
            })
        }
    }, [])

    return (
        <form onSubmit={onSubmitHandler} className='container p-4 flex flex-col w-full items-start gap-3'>

            <div className='w-full'>
                <p className='mb-2'>Role Title</p>
                <input type="text" placeholder='Type here'
                    onChange={e => setTitle(e.target.value)} value={title}
                    required
                    className='w-full max-w-lg px-3 py-2 border-2 border-gray-300 rounded'
                />
            </div>

            <div className='w-full max-w-lg'>
                <p className='my-2'>Role Description</p>
                <div ref={editorRef}>

                </div>
            </div>

            <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>

                <div>
                    <p className='mb-2'>Role Category</p>
                    <select className='w-full px-3 py-2 border-2 border-gray-300 rounded' onChange={e => setCategory(e.target.value)}>
                        {RoleCategories.map((category, index) => (
                            <option key={index} value={category}>{category}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <p className='mb-2'>Role Position</p>
                    <select className='w-full px-3 py-2 border-2 border-gray-300 rounded' onChange={e => setPosition(e.target.value)}>
                        {RolePositions.map((location, index) => (
                            <option key={index} value={location}>{location}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <p className='mb-2'>Role Level</p>
                    <select className='w-full px-3 py-2 border-2 border-gray-300 rounded' onChange={e => setLevel(e.target.value)}>
                        <option value="Explorer level">Explorer</option>
                        <option value="Contributor level">Contributor </option>
                        <option value="Lead Material level">Lead Material</option>
                    </select>
                </div>

            </div>

            <button className='w-28 py-3 mt-4 bg-black text-white rounded'>ADD</button>
        </form>
    )
}

export default AddRole