// import Image from 'next/image'

import { Editor } from "@/components/Editor";

export default function Home() {
  return (
    <main className='dark:bg-black'>
      <Editor content="" id="ai"  className="dark:bg-black"/>
    </main>
  )
}
