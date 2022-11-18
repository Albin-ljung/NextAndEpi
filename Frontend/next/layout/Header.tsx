import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'


export default function Header({ data }: InferGetServerSidePropsType<typeof getServerSideProps>){
    return (
        <header>
            <nav>
                <ul>
                    {data.map((item:any) => (
                        <li>{item.name}</li>
                    ))}
                </ul>
            </nav>
        </header>
    )
}



export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    let myHeaders = new Headers({
        'Accept': 'application/json'
    });
   
    const res = await fetch(`http://localhost:5000/menus/main-menu/children`, {
        headers: myHeaders
    })

    const data = await res.json()
  
    return {
      props: {
       data
      },
    }
}


