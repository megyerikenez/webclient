import Chair from '../../assets/icon-test/chair_black_24dp.svg'
import Flower from '../../assets/icon-test/local_florist_black_24dp.svg'
import Lamp from '../../assets/icon-test/light_black_24dp.svg'
import Pizza from '../../assets/icon-test/local_pizza_black_24dp.svg'
import Table from '../../assets/icon-test/table_restaurant_black_24dp.svg'
import { useTestStore } from './store'

var imgRes = [Chair, Flower, Lamp, Pizza, Table];

export function Picture(props: {posIdx?: number, picIdx?: number, res?: string, revised?: boolean, selected?: boolean}) {
    let { picturesToFind, pictures, hasEnded } = useTestStore(e=>e);
    var source = '';
    var bg = '';
    if(props.selected === true)
        bg = 'bg-slate-300';
    if(hasEnded){
        if (props.posIdx != undefined && props.picIdx != undefined && props.selected != undefined){
            let isSelected = pictures[props.posIdx].marked;
            let shouldMark = picturesToFind.includes(props.picIdx);
            console.log(pictures[props.posIdx].marked);
            

            if (isSelected && shouldMark){
                bg = 'bg-lime-200';
            } else if (isSelected && !shouldMark){
                bg = 'bg-rose-300';
            } else if (!isSelected && shouldMark){
                bg = 'bg-purple-200';
            }
        }
    }

    if (props.picIdx != undefined)
        source = imgRes[props.picIdx];
    if (props.res)
        source = props.res;

    return <>
        <img
        style={{
            width: 50,
            height: 50,
        }}
        className={
            'inline p-1.5 m-0.5 ' + (props.revised === false && props.selected === false ? 'opacity-25' : '')  + ' rounded-full ' + bg
        } src={source} />
    </>
}

export function getImgRes() {
    return imgRes;
}