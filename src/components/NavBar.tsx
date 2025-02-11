import Link from "next/link"
import { Button } from "~/components/ui/button"

interface NavBarProps {
  userRole: "admin" | "employee" | null
  onLogout: () => void
}

export default function NavBar({ userRole, onLogout }: NavBarProps) {
  return (
    <nav className="bg-secondary mb-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-white font-bold text-xl">
              EMS
            </Link>
          </div>
          <div className="flex">
            {userRole === "admin" && (
              <>
                <Link
                  href="/employees"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Employees
                </Link>
                <Link
                  href="/schedule"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Schedule
                </Link>
              </>
            )}
            {userRole === "employee" && (
              <Link
                href="/my-schedule"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                My Schedule
              </Link>
            )}
            {userRole && (
              <Button
                onClick={onLogout}
                variant="ghost"
                className="text-gray-300 hover:bg-gray-700 hover:text-white ml-2"
              >
                Logout
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

