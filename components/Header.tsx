import Navbar from "./Navbar";

type HeaderProps = {
    isLoggedIn: boolean;
    userImage?: string | null;
  };

const Header = ({ isLoggedIn, userImage }: HeaderProps) => {
 
  return (
    <>
    <header>
        <Navbar isLoggedIn={isLoggedIn} userImage={userImage} />
    </header>
    
    </>
    
  )
}

export default Header