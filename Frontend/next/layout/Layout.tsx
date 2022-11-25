import { useMenu } from "../hooks/useMenu"
import { PropsWithChildren } from "react";
import Header from "./Header";

export default function Layout({children}: PropsWithChildren) {

   // const { data, error, isLoading } = useMenu();

            //<Header isLoading={isLoading} error={error} menu={data} />
    return (
        <div>
            {children}
        </div>
    )
}