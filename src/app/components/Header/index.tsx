import Image from "next/image";
export function Header() {
  return (
    <header className="flex w-full p-4 bg-primary-gradient shadow-md fixed z-50">
      <Image
        width={40}
        height={40}
        src="/imparLogo.svg"
        alt="Logo"
        className="h-auto w-auto object-contain"
      />
    </header>
  );
}
