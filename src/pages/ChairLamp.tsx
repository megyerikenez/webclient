import '../css/ChairLamp.css'

import { Picture, getImgRes } from './ChairLamp/Picture'

import Navbar from '../components/Navbar'
import apple from '../assets/icon-test/apple.png'
import boot from '../assets/icon-test/boot.png'
import flower from '../assets/icon-test/flower.png'
import mug from '../assets/icon-test/mug.png'
import shallow from 'zustand/shallow'
import table from '../assets/icon-test/table.png'
import { useTestStore } from './ToulousePieron/store'

var elapsedTime = 0;
var imgLabels = ["apple", "boot", "flower", "mug", "table"];
var pictures: number[] = [];
var started = false;

export function ChairLampPage(){
    return <>
      <Navbar />
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <ChairLamp />
        </div>
      </main>
    
    </>
}

function ChairLamp() {
    
    let store = useTestStore(({startTime, endTime, hasStarted, hasEnded, endTest, startTest, pictures, picturesToFind})=>({
        startTime, endTime, hasStarted, hasEnded, endTest, startTest, pictures, picturesToFind
    }), shallow);
    
    if (!store.hasStarted || store.startTime == null){
        
        startTest();
        store.hasStarted = true;

        return <>
            <div className='px-6'>
                <h1 className='mb-6'>Chair-Lamp teszt</h1>
                <p>A következő feladatban 5 féle kép közül kell a lentebb látható képeket bejelölni (kattintással).</p>
                <p>A feladat megoldására 5 perc áll rendelkezésre.</p>
                <button
                    className='mt-6 button-primary'
                    onClick={()=>{
                        store.startTest();
                    }}
                >Kezdés</button>
            </div>
        </>

    }

    return <>
        <p className={started ? 'undefined' : 'hidden'}>Eltelt idő: </p>
        <div className="test-container">
            {
                pictures.map(x => {
                    return <>
                        {/* <img className={imgLabels[x]} alt={imgLabels[x]} src={imgRes[x]} /> */}
                        <Picture idx={x} />
                    </>
                })
            }
        </div>
    </>

}

function startTest() {
	for (let i = 0; i < 5; i++) {
		const rand = Math.floor(Math.random() * getImgRes().length);
		pictures.push(rand);
	}
}

export default ChairLampPage;
