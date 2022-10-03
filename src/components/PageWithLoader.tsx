import React, {ReactChildren, ReactChild, ReactElement} from "react"
import Navbar from "./Navbar"

interface PageProps {
    component: React.Component
    fetch: () => Promise<any>
}

export function PageWithLoader({ component, fetch }: PageProps){
    return <>
        <div></div>
    </>
}