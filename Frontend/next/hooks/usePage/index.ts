import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../../fetch/fetch";


const getPage = async (url:string, headers = {}) => {
    const apiUrl = new URL(`http://localhost:5000/api/episerver/v3.0/content`);
    apiUrl.searchParams.set("contentUrl", url);
    apiUrl.searchParams.set("expand", "*")
    const res = await fetchData(apiUrl.toString(), headers);
    return res;
}


const usePage = (pageUrl:string) => {
    return useQuery(["page", pageUrl], () =>  getPage(pageUrl));
}


export {
    usePage,
    getPage
}