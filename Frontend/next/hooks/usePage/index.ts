import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../../fetch/fetch";


const getPage = async (url:string) => {
    const res = await fetchData(`http://localhost:5000${url}`);
    return res.json()
}


const usePage = (pageUrl:string) => {
    return useQuery(["page", pageUrl], () =>  getPage(pageUrl));
}


export {
    usePage,
    getPage
}