import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import Head from 'next/head'
import Script from 'next/script'
import { useEffect } from 'react';
import { getPage, usePage } from '../hooks/usePage'
import BlockRenderer from '../layout/BlockRenderer';

export default function Page({res, notFound}: InferGetServerSidePropsType<typeof getServerSideProps>){

 
    console.log(res)

    if(notFound){
      return <p>Page not found</p>
    }

    return (
        <>
          <h1 data-epi-edit={(res?.headers as any)["x-epi-contextmode"] ? "title" : null}>{res?.data[0].title}</h1>
          {(res?.headers as any)["x-epi-contextmode"] ? <Script src="/episerver/cms/latest/clientresources/communicationinjector.js" /> : null}
          <BlockRenderer blocks={res?.data[0].mainContentArea} />
        </>
    )
  }
  
export const getServerSideProps = async (context: GetServerSidePropsContext) => {

    const res = await getPage(context.resolvedUrl, {cookie: context.req.headers.cookie}); // Cookie for authorizing 

    if(res.ok){
      return {
        props: {
          res: res,
        },
      }
    }

    return {
      props: {
        notFound: true
      },
    }
}