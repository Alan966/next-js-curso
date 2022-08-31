import Link from "next/link";

export default function Header (){
    return(
    <header
        as="header"
        responsive
        display="flex"
        justify="space-between"
        className="flex justify-between items-center mw-w-xl m-auto"
        >
    <h1 className="font-bold">
        <Link href='/'>
            <a className="transition hover: opacity: 80">
                next
                <span className="font-light"> xkcd</span>
            </a>
        </Link>
    </h1>

    <nav>
        <ul className="flex flex-row gap-2 ">
            <li><Link href='/'><a className="text-sm font-bold">Home</a></Link></li>
            <li><Link href='/about'><a className="text-sm font-bold">About</a></Link></li>
            <li><Link href='/search'><a className="text-sm font-bold"> Search</a></Link></li>
        </ul>
    </nav>
    </header>
    )
}