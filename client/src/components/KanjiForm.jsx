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
        <section className="form">
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="kanji">Kanji</label>
                    <input 
                        type="text"
                        name="kanji"
                        id="kanji"
                        value={kanji}
                        onChange={(e) => setKanji(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <button className="btn btn-block" type="submit">Add Kanji</button>
                </div>
            </form>
        </section>
    )
}

export default KanjiForm