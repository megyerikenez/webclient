import Chair from '../../assets/icon-test/chair_black_24dp.svg'
import Flower from '../../assets/icon-test/local_florist_black_24dp.svg'
import Lamp from '../../assets/icon-test/light_black_24dp.svg'
import Pizza from '../../assets/icon-test/local_pizza_black_24dp.svg'
import Table from '../../assets/icon-test/table_restaurant_black_24dp.svg'

var imgRes = [Chair, Flower, Lamp, Pizza, Table];

export function Picture(props: {idx: number}) {
    return <>
        <img src={imgRes[props.idx]} />
    </>
}

export function getImgRes() {
    return imgRes;
}