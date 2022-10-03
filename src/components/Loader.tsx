import LoaderSvg from '../assets/icon-components/LoaderSvg';

export function Loader(){
    return <>
        <span
            style={{
                animation:'spin 2.5s linear infinite'
            }}
        >
            <LoaderSvg />
        </span>
    </>
}