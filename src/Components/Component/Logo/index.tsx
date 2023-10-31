import { icons } from "@Assets";
import { Image } from "@Components";

function Logo() {
  return (
    <div className="text-center">
      <Image src={icons.logoText} alt={"intrvu-logo"} height={25} style={{
        objectFit: 'contain'
      }} />
    </div>
  );
}

export { Logo };
