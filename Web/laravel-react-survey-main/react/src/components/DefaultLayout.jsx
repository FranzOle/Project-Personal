import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  BellIcon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Navigate, NavLink, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios";
import { useEffect } from "react";
import Toast from "./Toast";

const navigation = [
  { name: "Dashboard", to: "/" },
  { name: "Surveys", to: "/surveys" },
  { name: "Our Team", to:"/team"}
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function DefaultLayout() {
  const { currentUser, userToken, setCurrentUser, setUserToken } =
    useStateContext();

  if (!userToken) {
    return <Navigate to="login" />;
  }

  const logout = (ev) => {
    ev.preventDefault();
    axiosClient.post("/logout").then((res) => {
      setCurrentUser({});
      setUserToken(null);
    });
  };

  useEffect(() => {
    axiosClient.get('/me')
      .then(({ data }) => {
        setCurrentUser(data)
      })
  }, [])

  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-indigo-600">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <img
                        className="h-8 w-8"
                        src="https://i.ibb.co/7JQXyxK/society-white.png"
                        alt="Your Company"
                      />
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        {navigation.map((item) => (
                          <NavLink
                            key={item.name}
                            to={item.to}
                            className={({ isActive }) =>
                              classNames(
                                isActive
                                  ? "bg-indigo-600 text-white"
                                  : "text-indigo-500 hover:bg-indigo-700 hover:text-white",
                                "px-3 py-2 rounded-md text-sm font-medium"
                              )
                            }
                          >
                            {item.name}
                          </NavLink>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                      {/* Profile dropdown */}
                      <Menu as="div" className="relative ml-3">
                        <div>
                          <Menu.Button className="flex max-w-xs items-center rounded-full bg-indigo-700 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-700">
                            <span className="sr-only">Open user menu</span>
                            <UserIcon className="w-8 h-8 bg-black/25 p-2 rounded-full text-white" />
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <Menu.Item>
                              <div className="block px-4 py-2 text-sm text-gray-700">
                                <div>{currentUser.name}</div>
                                <div>{currentUser.email}</div>
                              </div>
                            </Menu.Item>
                            <Menu.Item>
                              <a
                                href="#"
                                onClick={(ev) => logout(ev)}
                                className={
                                  "block px-4 py-2 text-sm text-gray-700"
                                }
                              >
                                Sign out
                              </a>
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-indigo-700 p-2 text-indigo-500 hover:bg-indigo-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-700">
                      <span className="sr-only">Buka main menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
                  {navigation.map((item) => (
                    <NavLink
                      key={item.name}
                      to={item.to}
                      className={({ isActive }) =>
                        classNames(
                          isActive
                            ? "bg-indigo-600 text-white"
                            : "text-indigo-500 hover:bg-indigo-700 hover:text-white",
                          "block px-3 py-2 rounded-md text-base font-medium"
                        )
                      }
                    >
                      {item.name}
                    </NavLink>
                  ))}
                </div>
                <div className="border-t border-indigo-700 pt-4 pb-3">
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                      <UserIcon className="w-8 h-8 bg-black/25 p-2 rounded-full text-white" />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium leading-none text-white">
                        {currentUser.name}
                      </div>
                      <div className="text-sm font-medium leading-none text-indigo-400">
                        {currentUser.email}
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 space-y-1 px-2">
                    <Disclosure.Button
                      as="a"
                      href="#"
                      onClick={(ev) => logout(ev)}
                      className="block rounded-md px-3 py-2 text-base font-medium text-indigo-500 hover:bg-indigo-700 hover:text-white"
                    >
                      Logout
                    </Disclosure.Button>
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        <Outlet />

        <Toast />
        <footer className="">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex justify-center items-center">
        <p className="text-indigo-500 text-sm">Made with ❤️ by: <span>&copy; 2024 Societyco.</span></p>
    </div>
    </footer>
      </div>
    </>
  );
}
