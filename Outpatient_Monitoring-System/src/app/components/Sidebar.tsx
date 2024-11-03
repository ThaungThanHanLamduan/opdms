import Link from "next/link";
import { CiMedicalCross } from "react-icons/ci";
import { IoLogOutOutline } from "react-icons/io5";
import { RxDashboard } from "react-icons/rx";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "../contexts/AuthContext";
import profile from "@/public/images/doctor.webp";
import { RiFileSearchLine } from "react-icons/ri";

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push('/auth/login');
  };

  return (
    <div className="w-1/6 h-screen bg-primary flex flex-col justify-between px-3 py-10">
      <div className="flex flex-col gap-10">
        <div className="flex items-center gap-3 font-semibold">
          <CiMedicalCross size={20} />
          <h2 className="font-noto text-white">OPD Monitoring System</h2>
        </div>
        <div className="flex flex-col gap-4">
          <Link href="/" passHref>
            <button
              className={`w-[200px] flex items-center gap-4 mx-3 px-4 py-3 rounded-lg text-white ${
                pathname === '/'
                  ? 'bg-primartactive' 
                  : 'bg-white/10' 
              }`}
            >
              <RxDashboard />
              <span>Dashboard</span>
            </button>
          </Link>
          <Link href="/user-guide" passHref>
            <button
              className={`w-[200px] flex items-center gap-4 mx-3 px-4 py-3 rounded-lg text-white ${
                pathname === '/user-guide'
                  ? 'bg-primartactive' 
                  : 'bg-white/10 '
              }`}
            >
              <RiFileSearchLine />
              <span>User Guide</span>
            </button>
          </Link>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <button
          onClick={handleLogout}
          className="flex items-center gap-4 mx-3 px-4 py-3 rounded-lg text-white"
        >
          <IoLogOutOutline size={20} />
          <span>Log out</span>
        </button>
        <hr className="opacity-20" />
        <div className="flex items-center gap-3 py-3">
          <Image src={profile} alt="Profile" className="w-12 h-12 rounded-full object-cover text-white" />
          <p className="text-sm text-white">Emma Watson</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
