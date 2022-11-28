import { useQuery } from "@tanstack/react-query";
import { ContentResolver, ResolvedContent, ContentData } from '@episerver/content-delivery';



const getContentByUrl = async (url:string) => {
    const contentResolver = new ContentResolver();
    const result = await contentResolver.resolveContent(url, true);
    return result;
}


export {
    getContentByUrl
}