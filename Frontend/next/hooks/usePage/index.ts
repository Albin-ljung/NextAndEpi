import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../../fetch/fetch";


const getPage = async (url:string) => {
    const res = await fetchData(`http://localhost:5000/api/episerver/v3.0/content?contentUrl=${url}&matchExact=true&expand=*`);
    return res;
}


const usePage = (pageUrl:string) => {
    return useQuery(["page", pageUrl], () =>  getPage(pageUrl));
}


export {
    usePage,
    getPage
}