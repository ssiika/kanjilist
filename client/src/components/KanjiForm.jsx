import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createKanji } from '../features/kanji/kanjiSlice';

function KanjiForm() {
    const [kanji, setKanji] = useState('');

    const {message} = useSelector((state) => state.kanji)

    const dispatch = useDispatch();

    const onSubmit = (e) => {
        e.preventDefault();
        const formattedKanjiObject = {
            kanji,
            type: "1",
            known: "true",
        }
        dispatch(createKanji(formattedKanjiObject));
        setKanji('');
    }

    return (
        <section className="addkanjiformbox">
            <form onSubmit={onSubmit} className="addkanjiform">
                    <label htmlFor="kanji">Add a Kanji</label>
                    <input 
                        type="text"
                        name="kanji"
                        id="kanji"
                        value={kanji}
                        onChange={(e) => setKanji(e.target.value)}
                    />
                    <button type="submit" className="btn kanjibutton">Add</button>
                <div className="errorbox">
                    {message}
                </div>
            </form>
        </section>
    )
}

export default KanjiForm