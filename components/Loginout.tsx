import Link from "next/link";
import { auth, signOut } from "@/lib/auth";

const Loginout = () => {
    /* const session = await auth(); */
    const session = true;

  return (
    
    <div className="flex justify-center items-center gap-4 ">
        {session ? 
            <>
                <Link href='/login' className="px-4 py-2 rounded-lg capitalize cursor-pointer loginbutton">login</Link>
            <Link href='/login' className="bg-[var(--btn-color)] text-white px-4 py-2 rounded-lg capitalize cursor-pointer signupbutton">sign up</Link>
        </> : 
        <Link href='/login' className="px-4 py-2 rounded-lg capitalize cursor-pointer loginbutton">login</Link>}
        
    </div>
  )
}

export default Loginout