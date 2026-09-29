import Image from "next/image"
import Link from "next/link"
import HeroModel from "@/models/Hero"
import dbConnect from "@/lib/mongodb"

const Hero = async () => {
  await dbConnect();
  const hero = await HeroModel.findOne();
  console.log(hero.image);
  if (!hero) return null;

  return (
    <section className="w-full h-[calc(100%_-_50%)] pt-10 flex justify-center items-center mt-[80px]">
        <div className="w-[50%] h-full px-20  flex justify-center items-start flex-col gap-6">
            <h1 className="text-5xl font-bold">{hero.heading}</h1>
            <p className="text-xl">{hero.subtext}</p>
            
            <Link href='/posts' className="bg-[var(--btn-color)] text-white px-12 py-3 rounded-lg capitalize cursor-pointer signupbutton">explore</Link>
        </div>
        <div className="w-[50%] h-full flex justify-center items-center " >
             <div className="w-[550px] h-[90%]">
                <Image 
                    src={hero.image}
                    alt={hero.heading}
                    width={500}
                    height={400}
                    className="w-full h-full object-cover rounded-lg "
                />
             </div>
        </div>
    </section>
  )
}

export default Hero