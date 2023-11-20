import { icons } from "@Assets";
import { Image } from "@Components";
import './index.css'

function Logo() {
  return (
    <div className={'text-center'}>
      <Image className={'logo'} src={icons.logoText} alt={"intrvu-logo"} style={{
        objectFit: 'contain'
      }} />
    </div>
  );
}

export { Logo };
