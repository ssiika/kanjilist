import { useState, useEffect } from 'react';
import {FaUser} from 'react-icons/fa';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    pwConfirm: '',
  })

  const { username, password, pwConfirm } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault();
    
  }

  return (
    <div>
      <section className="heading">
        <h1>
          <FaUser /> Register
        </h1>
        <p>Please create an account</p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
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
          <div className="form-group">
            <input type="password" 
            className='form-control'
            id='pwConfirm' 
            name='pwConfirm' 
            value={pwConfirm} 
            placeholder='Confirm password'
            onChange={onChange} />
          </div>
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

export default Register