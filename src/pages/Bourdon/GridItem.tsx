import { Picture } from "./Picture";
import { useTestStore } from './store';

interface GridItemProps {
    row: number;
    column: number;
}

export function GridItem({row, column}: GridItemProps){
    let { selected, hasEnded, toggleSelected, letters } = useTestStore(e=>e);

    let isSelected = selected.find(e=>e.row == row && e.column== column);

    let shouldMark = letters[row][column] == letters[row][0];

    let bg = 'bg-transparent';

    if (!hasEnded){
        if (isSelected){
            bg = 'bg-lime-200';
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
    if (column == 0){
        bg = 'bg-lime-200'
    }

    return <>
        <span

            className={bg}

            style={{
                display: 'inline-flex',
                cursor: 'pointer',
                userSelect: 'none',
                fontSize: 'min(3.2vw, 1rem)'
            }}
            onClick={()=>{
                if (!useTestStore.getState().hasEnded && column != 0){
                    toggleSelected(row,column);
                }
            }}
        >
            {letters[row][column]}
        </span>
    </>
}