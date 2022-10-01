import { Corner } from './Corner';
import { Side } from './Side';

export function Picture(props: {value: number}){
    let { value } = props;

    let P = value % 2 == 0 ? Corner : Side;

    let rotation = Math.floor(value / 2);

    let style = {
        transform: `rotate(${90*rotation}deg)`,
        display: 'inline-block',
    }

    return <>
        <span style={style}>
            <P/>
        </span>
    </>
}