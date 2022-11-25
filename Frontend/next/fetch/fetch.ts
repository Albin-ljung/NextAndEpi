
export const fetchData = (api:string, config = {}) => {
    let myHeaders = new Headers({
        'Accept': '*/*',
        'Accept-language': "en"
    });

    return new Promise<ApiResponse>((resolve, reject) => {
        fetch(api, {headers: myHeaders}).then(async(res) => {
            
            const result = {
                ok: res.ok,
                status: res.status,
                statusText: res.statusText,
                headers: {} as any,
                data: await res.json().catch(() => {})
            }

            console.log(res.headers.get("x-epi-contextmode"))

       
            res.headers.forEach((val: string, key: string) => {
               
                
                result.headers = {...result.headers, [key]: val}
            });
            


            resolve(result);
        }).catch((error: any) => {
            reject(mapToError(error))
        });

    })
   
}


export function mapToError(error: any): ApiError {
    let result: ApiError = {};
  
    if (typeof error.json === 'function') {
      error.json().then((jsonError: any) => {
        result.data = jsonError;
      }).catch((errorResponse: Response) => {
        result.status = errorResponse.status;
        result.statusText = errorResponse.statusText;
      });
    } else {
      result.statusText = error;
    }
  
    return result;
  }


export interface ReponseHeaders {
    "cache-control": string;
    'content-length': string;
    'content-type': string;
    date: string;
    etag: string;
    server: string;
    'set-cookie': string;
    'x-epi-branch': string;
    'x-epi-contentguid': string;
    'x-epi-contextmode': string
    'x-epi-siteid': string;
    'x-epi-startpageguid': string;
}  

export interface ApiError {
    /**
     * HTTP status code from the API.
     */
    status?: number,
  
    /**
     * Status text.
     */
    statusText?: string,
  
    /**
     * Data if any.
     */
    data?: any,
  }

  export interface ApiResponse {
    /**
     * HTTP status code from the API.
     */
    status: number,
  
    /**
     * Status text.
     */
    statusText: string,
  
    /**
     * The requested resource.
     */
    data?: any,
  
    /**
     * Headers associated with the resource.
     */
    headers: object
  
    /**
     * True if the response has status between 200 and 299.
     */
    ok: boolean,
  }
