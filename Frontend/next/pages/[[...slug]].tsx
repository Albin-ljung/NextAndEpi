import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import Head from 'next/head'
import Script from 'next/script'
import { ReponseHeaders } from '../fetch/fetch';

import { getPage } from '../hooks/usePage'
import BlockRenderer from '../layout/BlockRenderer';

export default function Page({res, notFound}: InferGetServerSidePropsType<typeof getServerSideProps>){

    const mode = Object.entries(res?.headers as ReponseHeaders).find((entry) => {
      if(entry[0] === "x-epi-contextmode") return entry
    }) as any;

    if(notFound){
      return (
        <p>Not found page</p>
      )
    }

    
    if(mode && mode[1] === "Preview"){
      return (
        <span  data-epi-edit="Title">{res?.data[0].title}</span>
      )
    }

    return (
        <>
          <span>{res?.data[0].title}</span>
        </>
    )
  }
  
  //<Script src="/episerver/cms/latest/clientresources/communicationinjector.js" />
export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    const res = await getPage(context.resolvedUrl + "?expand=*");

    

    if(res.ok && res.data.length != 0){
      return {
        props: {
          res: res
        },
      }
    }

    return {
      props: {
        notFound: true
      },
    }
}