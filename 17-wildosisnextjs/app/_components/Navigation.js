import Link from "next/link";
import { auth } from "../_lib/Auth";

export default async function Navigation() {
  const session=await auth()
  // console.log(session.user.image)
    return (
      <nav className="z-10 text-xl">
        <ul className="flex gap-16 items-center">
          <li>
            <Link href="/cabins" className="hover:text-accent-400 transition-colors">
              Cabins
            </Link>
          </li>
          <li>
            <Link href="/about" className="hover:text-accent-400 transition-colors">
              About
            </Link>
          </li>
          <li>
           {session?.user?.image? <Link
              href="/account"
              className="hover:text-accent-400 transition-colors flex items-center gap-2"
            >
              <span>Guest area</span>
              <img className="h-8 rounded-full" src={session?.user?.image} referrerPolicy="no-referrer" alt={session?.user?.name} />
            </Link>
           
            :<Link
              href="/account"
              className="hover:text-accent-400 transition-colors"
            >
              Guest area
            </Link>}
          </li>
        </ul>
      </nav>
    );
  }
  