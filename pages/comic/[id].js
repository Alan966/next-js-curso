import  Header  from 'components/Header';
import Head from 'next/head'
import Image from 'next/image'
import React from 'react'
import { readFile, readdir, stat } from 'fs/promises'
import Link from 'next/link';
import { basename } from 'path';


export default function Comic({ img, alt, title, width, height, hasNext, hasPrevious, prevId, nextId }) {
  return(
  <>
      <Head>
        <title>xkcd- Comics for developers</title>
        <meta name="description" content="Comics for developers" />
      </Head>
      <Header />

      <main>
      <section className='max-w-lg m-auto'>
        <h1 className='font-bold text-xl text-center mb-4'>{title}</h1>
        <div className="max-w-sm m-auto mb-4">
        <Image width={width} height={height} src={img} alt={alt} layout='responsive'/>
        </div>
        <p>{alt}</p>

        {/* Create pagination with nextId and prevId if available */}
        <div className="flex justify-between mt-4 font-bold ">
        {
          hasPrevious && <Link href={`./${prevId}`}>
            <a className='text-gray-600'>Previus</a>
          </Link>
        }
        {
          hasNext && <Link href={`./${nextId}`}>
            <a href="" className="text-gray-600">Next</a>
          </Link>
        }
        </div>
      </section>
      </main>
  </>
  )
}

export async function getStaticPaths({ locales }){
  const files = await readdir(`./comics`)
  let paths = []

  locales.forEach(locale => {
    paths = paths.concat(files.map(file => {
      const id = basename(file, '.json')
      return {params : { id }, locale}
    }))
  })


  return{
    paths,
    fallback: false  //false or 'blocking'
  }
}

export async function getStaticProps({ params }){
  const { id } = params
  const content = await readFile(`./comics/${id}.json`, 'utf8')
 const comic = JSON.parse(content)
   console.log(comic)

  const idNumber = +id
  const prevId = idNumber - 1
  const nextId = idNumber + 1

  const [prevResult, nextResult] = await Promise.allSettled([
    stat(`./comics/${prevId}.json`),
    stat(`./comics/${nextId}.json`),
  ])

  const hasPrevious = prevResult.status === 'fulfilled'
  const hasNext = nextResult.status === 'fulfilled'


  return{
    props:{
      ...comic,
      hasPrevious,
      hasNext,
      nextId,
      prevId
    }
  }
}