const NavigationBar = () => {
    return (
        <nav className="navigation">
          <NavItem text="home" href="/" />
          <NavItem text="login" href="/login" />
        </nav>
    );
  };
  interface NavItemProps {
    href: string;
    text: string;
  }
  
  const NavItem = ({ text, href }: NavItemProps) => {
    return (
      <>
        <a href={href}>{text}</a>
      </>
    );
  };
  
  export default NavigationBar;
  