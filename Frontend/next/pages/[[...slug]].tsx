import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import Script from 'next/script'
import BlockRenderer from '../layout/BlockRenderer';
import { ResolvedContentStatus, ContextMode } from "@episerver/content-delivery";
import { defaultConfig } from "@episerver/content-delivery";
import { getContentByUrl }  from '../services/getContentByUrl';
import { useEffect, useState } from 'react';
import { ResolvedContent, ContentData } from '@episerver/content-delivery';

type Page = {
  title: string;
  blocks: []
}

export default function Page({res, notFound}: InferGetServerSidePropsType<typeof getServerSideProps>){
    const [pageData, setPageData] = useState<ResolvedContent<ContentData & Page>>(res);

    if(notFound){
      return <p>Page not found</p>
    }

    useEffect(() => {
      setPageData(res)
    },[res])

    useEffect(() => {
      window.addEventListener("message", async event => {
        if(event.data.id === "contentSaved") {
          const previewUrl = new URL(event.data.data.previewUrl);
          const res = await getContentByUrl<Page>(previewUrl.pathname + previewUrl.search + previewUrl.hash);
          setPageData(res);
        }
     }, false)
    })

    return (
        <>
          <h1 data-epi-edit={pageData.mode === ContextMode.Edit ? "title" : null}>{pageData.content?.title}</h1>
          {pageData?.mode === ContextMode.Edit ? <Script src="/episerver/cms/latest/clientresources/communicationinjector.js" /> : null}
          <BlockRenderer blocks={pageData.content?.blocks} />
        </>
    )
  }
  
export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    
    defaultConfig.getHeaders = () => {
      return new Promise((resolve, reject) => {
          const headers = context.req.headers;
          if (headers["cookie"]) {
            resolve({ 
              cookie : headers["cookie"],
            });
          }
          resolve({})
      })
    };
    
    const res = await getContentByUrl<Page>(context.resolvedUrl, {expand: ["mainContentArea"]});

    if(res.status === ResolvedContentStatus.Resolved){
      return {
        props: {
          res: JSON.parse(JSON.stringify(res)),
        },
      }
    }

    return {
      props: {
        notFound: true
      },
    }
}