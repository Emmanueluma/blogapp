import Hero from './Hero'
import Latestpost from './Latestpost'

const Main = () => {
  return (
    <main className='w-full h-[100vh]'>
        <Hero />
        <Latestpost showLink={true} />
    </main>
  )
}

export default Main