import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import KanjiForm from "../components/KanjiForm";
import KanjiItem from "../components/KanjiItem";
import Counter from "../components/Counter";
import Spinner from '../components/Spinner';
import DeleteConfirm from "../components/DeleteConfirm";
import { getKanjiList, reset } from "../features/kanji/kanjiSlice";

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {user} = useSelector((state) => state.auth);
  const {kanjiList, isLoading, deletePending} = useSelector((state) => state.kanji)

  useEffect(() => {
  

    if (!user) {
      navigate('/login')
    }

    dispatch(getKanjiList())

    return () => {
      dispatch(reset())
    }

  }, [user, navigate, dispatch])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      {deletePending && <DeleteConfirm />}
      <div className="topbox">
        <KanjiForm />
        <Counter />
      </div>
      
      <section className="content">
        {kanjiList.length > 0 ? (
          <div className="kanjilist">
            {kanjiList.map((kanji) => (
              <KanjiItem key={kanji.kanji} kanji={kanji}/>
            ))}
          </div>
        ) : (
        <h3>Kanji list not found</h3>
        )}
      </section>
    </>
  )
}

export default Dashboard