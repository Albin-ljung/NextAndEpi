import { dehydrate, QueryClient, useQueries, useQuery } from '@tanstack/react-query'
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import { fetchData } from '../fetch/fetch'
import { getMenu, useMenu } from '../hooks/useMenu'
import { getPage, usePage } from '../hooks/usePage'

export default function Page({pageData}: InferGetServerSidePropsType<typeof getServerSideProps>){;

    return (
        <>
            <p>{pageData.name}</p>
        </>
    )
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {

    const pageData = await getPage(context.resolvedUrl);
  
    return {
      props: {
        pageData
      },
    }
}