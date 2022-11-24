import Link from 'next/link';
import { useMenu } from '../hooks/useMenu';

export default function Header({menu, error, isLoading}:any){

    if(error) return <p>Gick inte att hämta navigationen</p>

    if(isLoading) return <p>Laddar...</p>

    return (
        <header>
            <nav>
                <ul>
                    <a href="/">Home</a>
                    {menu.map((item: any, i:number) => (
                        <li key={i}>
                            <a href={"/" + item.routeSegment}>{item.name}</a>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    )
}



