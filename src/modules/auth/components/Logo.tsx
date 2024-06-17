import logo from "@/assets/images/logo.webp";

export const Logo = () => {
  return (
    <img
      src={logo}
      alt="logo"
      width={450}
      height={450}
      className="size-64 md:size-[350px] lg:size-[400px] xl:size-[500px]"
    />
  );
};
