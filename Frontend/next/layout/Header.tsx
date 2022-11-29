import Link from 'next/link';

export default function Header({menu, error, isLoading}:any){

    if(error) return <p>Could not get main menu</p>

    if(isLoading) return <p>Loading...</p>


    // Mode = "Edit" should be put in a global state so we can
    // access it here and render normal anchor tag in Epi admin 

    
    return (
        <header>
            <nav>
                <ul>
                    {menu.map((item: any, i:number) => (
                        <li key={i}>
                            <Link href={item.menuUrl}>{item.name}</Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    )
}



