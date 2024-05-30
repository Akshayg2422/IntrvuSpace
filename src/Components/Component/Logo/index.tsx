import { Image, H, P } from "@Components";
import { icons } from "@Assets";
import { translate } from "@I18n";

function Logo() {
  return (
    <div className="text-center">
      <Image src={icons.logo} alt={"quanta-logo"} width={90} height={90} />
      <div className="text-center">
        <H
          className={"mb-0 mt-2"}
          tag={"h2"}
          text={translate("common.businessAppName")}
        />
        {/* <div className="paragraph">
          <P text={translate("common.businessAppSubtext")} />
        </div> */}
      </div>
    </div>
  );
}

export { Logo };
