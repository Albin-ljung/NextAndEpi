import { ContentResolver, ResolvedContent, ContentData } from '@episerver/content-delivery';

async function getContentByUrl<T>(url: string, parameters = {}):Promise<ResolvedContent<ContentData & T>> {
    const contentResolver = new ContentResolver();

    const result = await contentResolver.resolveContent<ContentData & T>(url, true, {...parameters});
    return result;
}

export {
    getContentByUrl
}