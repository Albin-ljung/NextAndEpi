
import { PropsWithChildren } from "react";
import { useMainMenu } from "../hooks/useMainMenu";
import Header from "./Header";

export default function Layout({children}: PropsWithChildren) {

   const { data, error, isLoading } = useMainMenu();

   return (
       <div>
            <Header isLoading={isLoading} error={error} menu={data} />
            {children}
        </div>
    )
}