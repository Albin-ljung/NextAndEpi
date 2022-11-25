import Link from 'next/link';
import { useMenu } from '../hooks/useMenu';

export default function Header({menu, error, isLoading}:any){

    if(error) return <p>Gick inte att hämta navigationen</p>

    if(isLoading) return <p>Laddar...</p>

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



