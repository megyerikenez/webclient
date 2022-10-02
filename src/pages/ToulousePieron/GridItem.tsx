import { Picture } from "./Picture";
import { useTestStore } from './store';

interface GridItemProps {
    row: number;
    column: number;
}

export function GridItem({row, column}: GridItemProps){
    let { selected, picturesToFind, hasEnded, toggleSelected, pictures } = useTestStore(e=>e);

    let isSelected = selected.find(e=>e.row == row && e.column== column);

    let shouldMark = picturesToFind.includes(pictures[row][column]);

    let bg = 'bg-transparent';

    if (!hasEnded){
        if (isSelected){
            bg = 'bg-slate-200';
        }
    } else {
        if (isSelected && shouldMark){
            bg = 'bg-lime-200';
        } else if (isSelected && !shouldMark){
            bg = 'bg-rose-300';
        } else if (!isSelected && shouldMark){
            bg = 'bg-purple-200';
        }
    }

        return <>
            <button

                className={bg}

                style={{
                    borderRadius: '50%',
                    display: 'inline-flex'
                }}
                onClick={()=>{
                    if (!useTestStore.getState().hasEnded){
                        toggleSelected(row,column);
                    }
                }}
            >
                <Picture value={pictures[row][column]} />
            </button>
        </>
}