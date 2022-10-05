import Bed from '../../assets/icon-test/bed.svg'
import Chair from '../../assets/icon-test/chair.svg'
import Coffee from '../../assets/icon-test/coffee.svg'
import Flower from '../../assets/icon-test/flower.svg'
import House from '../../assets/icon-test/house.svg'
import Lamp from '../../assets/icon-test/lamp.svg'
import Pizza from '../../assets/icon-test/pizza.svg'
import Ship from '../../assets/icon-test/ship.svg'
import { useTestStore } from './store'

var imgRes = [Bed, Chair, Coffee, Flower, House, Lamp, Pizza, Ship];

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