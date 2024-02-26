import React from "react";
import Link from "next/link";
import Image from "next/image";
import SidebarRoboface from "../assets/SidebarRoboface.png";

function Sidebar() {
  const Navitems = [
    "Dashboard",
    "Courses",
    "Assessments",
    "AI Tutor",
    "Open IDE",
    "Log Out",
  ];
  return (
    <>
      <div className="h-screen" >
        <Image
          src={SidebarRoboface}
          width={75}
          height={75}
          alt="Robo Mascot"
        />

        <ul className="flex-col">
          {Navitems.map((m, index) => (
            <li className="py-2">
              <Link href={"/" + m.replace(/\s+/g, "")}> {m} </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Sidebar;
