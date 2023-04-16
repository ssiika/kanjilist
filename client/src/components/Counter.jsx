import { useSelector } from "react-redux";

function Counter() {
  
  const {kanjiList} = useSelector((state) => state.kanji)

  const knownSum = kanjiList.reduce(
    (total, curr) => curr.known === "true" ? total + 1 : total,
    0
  )

  return (
    <div className="counterbox">{knownSum}/{kanjiList.length} ({Math.floor( (knownSum / kanjiList.length) * 100 )}%)</div>
  )
}

export default Counter