import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../../fetch/fetch";


const getMainMenu = async () => {
   const res = await fetchData(`http://localhost:5000/api/episerver/v3.0/content?contentUrl=/menus/main-menu/&matchExact=true`);
   const menu = await fetchData(`http://localhost:5000/api/episerver/v3.0/content/${res.data[0].contentLink.guidValue}/children`);
   return menu.data;
}


const useMenu = () => {
    return useQuery(["primaryMenu"], getMainMenu);
}


export {
    useMenu,
    getMainMenu
}