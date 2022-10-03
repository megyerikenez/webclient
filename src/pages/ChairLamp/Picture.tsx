import Chair from '../../assets/icon-test/chair_black_24dp.svg'
import Flower from '../../assets/icon-test/local_florist_black_24dp.svg'
import Lamp from '../../assets/icon-test/light_black_24dp.svg'
import Pizza from '../../assets/icon-test/local_pizza_black_24dp.svg'
import Table from '../../assets/icon-test/table_restaurant_black_24dp.svg'

var imgRes = [Chair, Flower, Lamp, Pizza, Table];

export function Picture(props: {idx?: number, res?: string, revised?: boolean, selected?: boolean}) {
    var source = "";
    if (props.idx != undefined)
        source = imgRes[props.idx];
    if (props.res)
        source = props.res;
    return <>
        <img
        style={{
            width: 50,
            height: 50,
        }}
        className={
            'inline p-1.5 ' + (props.revised === false ? 'opacity-25' : '')  + ' ' + (props.selected === true ? 'bg-slate-300 rounded-full' : '')
        } src={source} />
    </>
}

export function getImgRes() {
    return imgRes;
}