import { ContentResolver, ContentLoader } from '@episerver/content-delivery';

async function getMainMenu(){
    const contentResolver = new ContentResolver();
    const contentLoader = new ContentLoader();

    const result = await contentResolver.resolveContent("/en/menus/main-menu/", true); // There could be better ways to do this, now we are locked to a name
    if(!result.content) return [];
   
    const menu = await contentLoader.getChildren(result.content.contentLink.guidValue, {
        branch: result.branch
    });
    
    return menu;
}

export {
    getMainMenu
}