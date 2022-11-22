import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../../fetch/fetch";


const getMenu = async () => {
    const res = await fetchData("http://localhost:5000/menus/main-menu/children");
    return res.json()
}


const useMenu = () => {
    return useQuery(["primaryMenu"], getMenu);
}


export {
    useMenu,
    getMenu
}