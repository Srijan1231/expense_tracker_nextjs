import { authContext } from "@/lib/store/auth-context";
import { useContext } from "react";
import { ImStatsBars } from "react-icons/im";

function Navigation() {
  const { user, loading, logout } = useContext(authContext);
  return (
    <header className="container max-w-2xl px-6 py-6 mx-auto">
      <div className=" flex items-center justify-between">
        {user && !loading && (
          <div className="flex items-center gap-2">
            <div className="h-[40px] w-[40px] rounded-full overflow-hidden">
              {/*  img*/}
              <img
                src={user.photoURL}
                alt={user.displayName}
                referrerPolicy="no-referrer"
              />
            </div>

            {/* name */}
            <small>{user.displayName}</small>
          </div>
        )}

        {/*    right-side of the navigation */}
        {user && !loading && (
          <nav className="flex items-center gap-2">
            <div>
              <a href="#stats">
                <ImStatsBars />
              </a>
            </div>
            <div>
              <button className="btn btn-danger" onClick={logout}>
                Logout
              </button>
            </div>
          </nav>
        )}
      </div>
      {/*  User information*/}
    </header>
  );
}

export default Navigation;
