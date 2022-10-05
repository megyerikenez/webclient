import { useTranslation } from "react-i18next";
import { getToken } from "../api";
import Navbar from "./Navbar";


interface Props {
    component: JSX.Element;
}

export function AuthGuard({ component }: Props){
    const [t, i18n] = useTranslation('common');

    if (getToken()){
        return <>
            {component}
        </>
    }
    return <>
        <Navbar />
        <main>
           <div
            className="p-6 text-center"
            style={{
                display: 'flex',
                position: 'absolute',
                top: 0,
                width: '100%',
                height: '100%',
                justifyContent: "center",
                alignItems: "center",
                boxSizing: 'border-box'
            }}
            >
            {t('errors.authNeeded')}
        </div>
        </main>
    </>;
}