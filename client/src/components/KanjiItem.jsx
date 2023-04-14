import { useDispatch } from "react-redux";
import { deleteKanji } from "../features/kanji/kanjiSlice";

function KanjiItem({kanji}) {
  const dispatch = useDispatch();

  return (
    <div className="kanjibox">
      <div className="kanji">
        {kanji.kanji}
      </div>
      {kanji.type === "1" && 
        <button onClick={() => dispatch(deleteKanji(kanji.kanji))} 
        className="close">X</button>
      }
   </div> 
  )
}

export default KanjiItem