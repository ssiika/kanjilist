import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import KanjiForm from "../components/KanjiForm";
import Spinner from '../components/Spinner';
import { getKanjiList, reset } from "../features/kanji/kanjiSlice";

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {user} = useSelector((state) => state.auth);
  const {kanjiList, isLoading, isError, message} = useSelector((state) => state.kanji)

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    if (!user) {
      navigate('/login')
    }

    dispatch(getKanjiList())

    return () => {
      dispatch(reset())
    }

  }, [user, navigate, isError, message, dispatch])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className="heading">
        <h1>Welcome {user && user.name}</h1>
        <p>Kanji Dashboard</p>
      </section>

      <KanjiForm />
    </>
  )
}

export default Dashboard