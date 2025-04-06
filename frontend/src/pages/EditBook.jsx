import React,{useState,useEffect} from 'react'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import axios from 'axios'
import { useNavigate,useParams } from 'react-router-dom'
import { useSnackbar } from 'notistack'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Editbook = () => {
  const [title,setTitle] = useState('');
  const [author,setAuthor] = useState('');
  const [publishYear,setPublishYear] = useState('');
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();
  const {id} = useParams();
  const enqueueSnackbar = useSnackbar();
  useEffect(()=>{
    setLoading(true);
    axios.get(`http://localhost:3000/books/${id}`).then((response)=>{
      setTitle(response.data.book.title);
      setAuthor(response.data.book.author);
      setPublishYear(response.data.book.publishYear);
      setLoading(false);
    }).catch((error)=>{
      setLoading(false);
      // alert('An error happened. Please check console');

      console.log(error);
    })
  },[])
  const handleEditBook = () => {
    const data = {
      title,author,publishYear,
    };
    setLoading(true);
    axios.put(`${BACKEND_URL}/books/${id}`,data).then(()=>{
      setLoading(false);
      navigate('/');
      enqueueSnackbar('Book Edited Successfully', {variant: 'success'});
    }).catch((error)=>{
      setLoading(false);
      // alert('An error happened. Please check console.')
      enqueueSnackbar('Error', {variant: 'error'});
      console.log(error);
    })
  }

  return (
    <div className='p-4'>
      <BackButton/>
      <h1 className='text-3xl my-4'>Create Book</h1>
      {loading ? <Spinner/>:''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Title</label>
          <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)} className='border-2 border-gray-500'/>
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Author</label>
          <input type="text" value={author} onChange={(e)=>setAuthor(e.target.value)} className='border-2 border-gray-500'/>
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Publish Year</label>
          <input type="text" value={publishYear} onChange={(e)=>setPublishYear(e.target.value)} className='border-2 border-gray-500'/>
        </div>
      </div>
      <button className='p-2 bg-sky-300 m-8' onClick={handleEditBook}>
        Save
      </button>
    </div>
  )
}

export default Editbook