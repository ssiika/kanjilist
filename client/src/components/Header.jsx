import { FaSignOutAlt, FaUser } from 'react-icons/fa';
import {Link, useNavigate} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/authentication/authSlice';

function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {user} = useSelector((state) => state.auth);

    const onLogout = () => {
        dispatch(logout());
        dispatch(reset());
        navigate('/');
    }
    return (
    <header className='header'>
        <div className="logo">
            <Link to='/'>Kanji List</Link>
        </div>
        <ul>
            {user ? (
                <>
                    <li>
                        {user.username}
                    </li>
                    <li>
                        <button className='logout' onClick={onLogout}>
                            <FaSignOutAlt /> Logout
                        </button>
                    </li>
                </>
                ) : (
                <>
                    <li>
                        <Link to='/login'>
                            Login
                        </Link>
                    </li>
                    <li className='registerbox'>
                        <Link to='/register'>
                            <FaUser /> Register
                        </Link>
                    </li>
                </>
                )}
        </ul>
        <div className="altlogo">
            漢字リスト
        </div>
    </header>
  )
}

export default Header