import { useDispatch } from "react-redux";
import { editDeletePending, updateKanji } from "../features/kanji/kanjiSlice";

function KanjiItem({kanji}) {
  const dispatch = useDispatch();
  
  const onClick = (kanji) => {
    const formattedKanjiObject = {
      kanji: kanji.kanji,
      type: kanji.type,
      known: kanji.known === "false" ? "true" : "false",
  }
  dispatch(updateKanji(formattedKanjiObject))
  }

  return (
    <div className={kanji.known === "true" ? "kanjibox known" : "kanjibox"}>
      <div className="kanji" onClick={() => {onClick(kanji)}}>
        {kanji.kanji}
      </div>
      {kanji.type === "1" && 
        <button onClick={() => dispatch(editDeletePending(kanji.kanji))} 
        className="close">X</button>
      }
   </div> 
  )
}

export default KanjiItem