import { useQuery } from "@tanstack/react-query"
import { getMainMenu } from "../../services/getMainMenu"


const useMainMenu = () => {
    return useQuery(["mainMenu"], getMainMenu)
}

export {
    useMainMenu
}