import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useRef } from "react";

export default function Header (){
    const [results, setResults] = useState()
    const searchRef = useRef()
    const {locale, locales } = useRouter()

    const getValue = () => searchRef.current?.value


    const handleChange = () => {
        const q = getValue()

        if(!q) return
        fetch(`/api/search?q=${q}`)
        .then(res => res.json())
        .then(results => {
            setResults(results)
        })
    }


        const restOfLocales =  locales.filter(l => l !== locale)


    return(
    <header
        as="header"
        responsive="true"
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
        <ul className="flex flex-row gap-2" block="true">
            <li><Link href='/'><a className="text-sm font-bold">Home</a></Link></li>
            <li>
                <Link href='/' locale={restOfLocales[0]}>
                    <a className="text-sm font-bold">{restOfLocales[0]}</a>
                </Link>
            </li>
            <li className="relative">
                {/*
                <input className=" border rounded-3xl border-gray-400 px-4 py-1 text-xs" ref={searchRef} type="search" onChange={handleChange} />
                <div className="relative z-10">
                 {
                    results && results.length && <div className="absoulete top-0 left-0">
                        <ul className="w-full border border-gray-50 rounded-lg shadow-xl z-50 br-white overflow-hidden">
                            <li className="m-0 " key='all-results'>
                                <Link href={`/search?q=${getValue()}`}>
                                    <a className="py-1 px-2 text-sm font-semibold hover:bg-slate-200 text-grap-400
                                    text-ellipsis whitespace-nowrap overflow-hidden" block="true">{`Ver${results.length}`}</a>
                                </Link>
                            </li>

                             {
                            results.map(result => {
                                return(
                                    <li className="m-0 " key={result.id}>
                                        <Link href={`/comic/${result.id}`}>
                                            <a className="py-1 px-2 text-sm font-semibold hover:bg-slate-200 text-ellipsis whitespace-nowrap
                                            overflow-hidden" block="true">{result.title}</a>
                                        </Link>
                                    </li>
                                )
                            })
                            }
                        </ul>
                    </div>
                }
                </div>
            */}
            </li>
        </ul>
    </nav>
    </header>
    )
}