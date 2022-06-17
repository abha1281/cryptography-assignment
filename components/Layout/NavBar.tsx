import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import CustomLink from "../globals/CustomLink";

const pages = [
  {
    name: "Hamming Code",
    url: "/hamming-code",
  },
  {
    name: "Test 1",
    url: "/test-1",
  },
  {
    name: "Test 2",
    url: "/test-2",
  },
  {
    name: "Test 3",
    url: "/test-3",
  },
];

const NavBar = () => {
  const router = useRouter();
  const [active, setActive] = useState(pages[0].url)

  useEffect(() => {
    setActive("/" + router.asPath.split("/")[1]);
  }, [router.pathname]);

  return (
    <div className=" sticky top-0 border-b">
      <div className="flex gap-x-4 py-4 justify-between container mx-auto max-w-7xl">
        {pages.map(page => (
          <div key={page.name}>
            <CustomLink href={page.url}>
              <p
                className={`font-medium ${
                  active === page.url ? "" : "text-gray-500"
                }`}
              >
                {page.name}
              </p>
            </CustomLink>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NavBar;
