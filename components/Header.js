import Link from "next/link";
import { useState, useRef } from "react";

export default function Header (){
    const [results, setResults] = useState()
    const searchRef = useRef()

    const handleChange = () => {
        const q =  searchRef.current.value
        fetch(`/api/search?q=${q}`)
        .then(res => res.json())
        .then(results => {
            setResults(results)
        })
    }

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
            <li className="relative">
                <input className="rounded-lg border rounded-3xl border-gray-400 px-2 py-1 text-xs" ref={searchRef} type="search" onChange={handleChange} />
                <div className="relative">
                {
                    results && results.length && <div className="absoulete top-0 left-0">
                        <ul className="w-full hidden border border-gray-50 rounded-lg shadow-xl z-10">
                            {
                            results.map(result => {
                                return(
                                    <li className="m-0 " key={result.id}>
                                        <Link href={`/comic/${result.id}`}>
                                            <a className="py-1 px-2 text-sm font-semibold hover:bg-slate-200" block>{result.title}</a>
                                        </Link>
                                    </li>
                                )
                            })
                            }
                        </ul>
                    </div>
                }
                </div>
            </li>
        </ul>
    </nav>
    </header>
    )
}