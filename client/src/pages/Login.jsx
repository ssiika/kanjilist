import { useState, useEffect } from 'react';
import {FaSignInAlt} from 'react-icons/fa';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {login, reset} from '../features/authentication/authSlice';
import Spinner from '../components/Spinner'


function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })

  const { username, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {user, isLoading, isSuccess, message} = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if (isSuccess || user) {
      navigate('/')
    }
    
    dispatch(reset())

  }, [user, isSuccess, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      username,
      password,
    }

    dispatch(login(userData));
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div>
      <section className="heading">
        <h1>
          <FaSignInAlt /> Login
        </h1>
      </section>
      <section className="form">
        <form onSubmit={onSubmit} className='loginForm'>
          <div className="form-group">
            <input type="text" 
            className='form-control'
            id='username' 
            name='username' 
            value={username} 
            placeholder='Enter username'
            onChange={onChange} />
          </div>
          <div className="form-group">
            <input type="password" 
            className='form-control'
            id='password' 
            name='password' 
            value={password} 
            placeholder='Enter password'
            onChange={onChange} />
          </div>
          <div className="errorbox">{message}</div>
          <div className="form-group">
            <button type='submit' className='btn btn-block'>
              Submit
            </button>
          </div>
          
        </form>
      </section>
    </div>
  )
}

export default Login