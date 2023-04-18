import { useSelector, useDispatch } from "react-redux";
import { editDeletePending, deleteKanji } from "../features/kanji/kanjiSlice";

function DeleteConfirm() {

const {deletePending} = useSelector((state) => state.kanji)

const handleDelete = () => {
    dispatch(deleteKanji(deletePending));
    dispatch(editDeletePending(""));
}

const dispatch = useDispatch();
  return (
    <div className="deleteBoxContainer">
        <div className="deleteBox">
            <div className="deleteText">Are you sure you want to delete {deletePending}?</div>
            <button className="btn" onClick={() => handleDelete()}>Delete</button>
            <button className="btn cancel" onClick={() => dispatch(editDeletePending(""))}>Cancel</button>
        </div>
    </div>
  )
}

export default DeleteConfirm