import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import Head from 'next/head'
import Script from 'next/script'
import BlockRenderer from '../layout/BlockRenderer';
import { ResolvedContentStatus, ContextMode } from "@episerver/content-delivery";
import { defaultConfig } from "@episerver/content-delivery";
import  { getContentByUrl }  from '../hooks/useResolvedContent';
import { useEffect, useState } from 'react';
import { ContentResolver, ResolvedContent, ContentData } from '@episerver/content-delivery';

export default function Page({res, notFound, url}: InferGetServerSidePropsType<typeof getServerSideProps>){
    const [pageData, setPageData] = useState<ResolvedContent<ContentData>>(res);

    if(notFound){
      return <p>Page not found</p>
    }

    useEffect(() => {
      window.addEventListener("message", async event => {
        if(event.data.id === "contentSaved") {
          console.log("test")
          const previewUrl = new URL(event.data.data.previewUrl);
          const res = await getContentByUrl(previewUrl.pathname + previewUrl.search + previewUrl.hash);
          setPageData(res);
        }
     }, false)
    })

    return (
        <>
          <h1 data-epi-edit={pageData.mode === ContextMode.Edit ? "title" : null}>{pageData?.content?.title}</h1>
          {pageData?.mode === ContextMode.Edit ? <Script src="/episerver/cms/latest/clientresources/communicationinjector.js" /> : null}
        </>
    )
  }
  //<BlockRenderer blocks={res?.data[0].mainContentArea} />
  
export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  

  

    defaultConfig.getHeaders = () => {
      return new Promise((resolve, reject) => {
          const headers = context.req.headers;
          if (headers["cookie"]) {
            resolve({ cookie : headers["cookie"] });
          }
          reject(undefined); 
      })
    };
    
    const res = await getContentByUrl(context.resolvedUrl);
    
    if(res.status === ResolvedContentStatus.Resolved){
      return {
        props: {
          res: JSON.parse(JSON.stringify(res)),
          url: context.resolvedUrl
        },
      }
    }

    return {
      props: {
        notFound: true
      },
    }
}