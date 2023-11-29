const NavigationBar = () => {
  return (
    <nav className="navigation">
      <p className="HomeChefRecipes">🥘 HomeChefRecipes</p>
      <div className="home-login">
        <NavItem text="Home" href="/" />
        <NavItem text="Login" href="/login" />
      </div>
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
