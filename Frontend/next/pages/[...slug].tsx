import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'

export default function Page({ data, notFound }: InferGetServerSidePropsType<typeof getServerSideProps>){

    if(notFound){
        return <p>Not found</p>
    }

    return (
        <>
            <p>{data.name}</p>
        </>
    )
}




export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    let myHeaders = new Headers({
        'Accept': 'application/json'
    });
   
    const res = await fetch(`http://localhost:5000${context.resolvedUrl}`, {
        headers: myHeaders
    })


    if(res.status === 404){
        return {
            props: {
             notFound: true
            },
          }
    }

    const data = await res.json()
  
    return {
      props: {
       data
      },
    }
}