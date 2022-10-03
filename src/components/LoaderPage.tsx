import { Loader } from "./Loader";

export function LoaderPage(){
    return <div
      style={{
        display: 'flex',
        position: 'absolute',
        top: 0,
        width: '100%',
        height: '100%',
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Loader />
    </div>
}