import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import { getPage } from '../hooks/usePage'
import BlockRenderer from '../layout/BlockRenderer';

export default function Page({pageData}: InferGetServerSidePropsType<typeof getServerSideProps>){

    return (
        <>
            <div className='epi-editContainer'>
              <span data-epi-edit="Title">{pageData.title}</span>
            </div>

            <BlockRenderer blocks={pageData?.mainContentArea?.expandedValue} />
        </>
    )
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    const pageData = await getPage(context.resolvedUrl + "?expand=*");

    return {
      props: {
        pageData
      },
    }
}