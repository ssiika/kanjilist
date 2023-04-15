import { useState } from "react";
import { useDispatch } from "react-redux";
import { createKanji } from '../features/kanji/kanjiSlice';

function KanjiForm() {
    const [kanji, setKanji] = useState('');

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
                <div className="form-group">
                    <label htmlFor="kanji">Add a Kanji</label>
                    <input 
                        type="text"
                        name="kanji"
                        id="kanji"
                        value={kanji}
                        onChange={(e) => setKanji(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <button className="btn btn-block" type="submit">Add</button>
                </div>
                <div className="errorbox">
                    Display error here
                </div>
            </form>
        </section>
    )
}

export default KanjiForm