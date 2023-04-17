import { useDispatch } from "react-redux";
import { deleteKanji, updateKanji } from "../features/kanji/kanjiSlice";

function KanjiItem({kanji}) {
  const dispatch = useDispatch();
  
  const onClick = (kanji) => {
    console.log(kanji);
  }

  return (
    <div className={kanji.known === "true" ? "kanjibox known" : "kanjibox"}>
      <div className="kanji" onClick={() => {onClick(kanji)}}>
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