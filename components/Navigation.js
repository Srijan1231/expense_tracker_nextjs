import { ImStatsBars } from "react-icons/im";

function Navigation() {
  return (
    <header className="container max-w-2xl px-6 py-6 mx-auto">
      <div className=" flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-[40px] w-[40px] rounded-full overflow-hidden">
            {/*  img*/}
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/2048px-Windows_10_Default_Profile_Picture.svg.png"
              alt="picture"
            />
          </div>

          {/* name */}
          <small>Hello</small>
        </div>
        {/*    right-side of the navigation */}
        <nav className="flex items-center gap-2">
          <div>
            <ImStatsBars />
          </div>
          <div>
            <button className="btn btn-danger">Logout Button</button>
          </div>
        </nav>
      </div>
      {/*  User information*/}
    </header>
  );
}

export default Navigation;
