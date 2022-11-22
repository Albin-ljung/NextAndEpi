export const fetchData = async (api:string, config = {}) => {
    let myHeaders = new Headers({
        'Accept': 'application/json'
    });
   
    return await fetch(api, {
        headers: myHeaders
    });
}