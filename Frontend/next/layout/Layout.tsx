import { useMenu } from "../hooks/useMenu"
import { PropsWithChildren } from "react";
import Header from "./Header";

export default function Layout({children}: PropsWithChildren) {

    const { data, error, isLoading } = useMenu();

    return (
        <div>
            <Header isLoading={isLoading} error={error} menu={data} />
            {children}
        </div>
    )
}