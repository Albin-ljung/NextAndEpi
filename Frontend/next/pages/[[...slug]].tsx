import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import { getPage } from '../hooks/usePage'
import BlockRenderer from '../layout/BlockRenderer';

export default function Page({pageData}: InferGetServerSidePropsType<typeof getServerSideProps>){
  console.log(pageData)
    return (
        <>
            <div data-epi-property-name="title" data-epi-edit="title">
              <h1 data-epi-property-name="title" data-epi-edit="title">{pageData.name}</h1>
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