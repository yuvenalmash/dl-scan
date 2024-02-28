import Link from "next/link";

export default function Navbar() {
  const navItems = [
    { label: "Home", href: "/" },
    { label: "Capture Image", href: "/captureImage" },
  ];

  return (
    <nav className="flex shadow-sm shadow-lime-500 gap-20  p-4 bg-black bg-opacity-95">
      <p className="text-2xl text-[--primary-color] font-bold">DL Scanner</p>

      <ul className="flex gap-6">
        {navItems.map((item) => (
          <li
            key={item.href}
            className="hover:text-[--primary-color] flex items-center"
          >
            <Link href={item.href}>{item.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
