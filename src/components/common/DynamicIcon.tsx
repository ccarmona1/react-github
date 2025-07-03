import { useEffect, useState, type FC } from "react";
import type { IconType } from "react-icons";

interface DynamicIconProps {
  lib: "si" | "go";
  icon: string;
  className?: string;
}

type CustomIconsType = typeof import("./CustomIcons").customIcons;

type GoIcons = keyof CustomIconsType["go"];
type SiIcons = keyof CustomIconsType["si"];

export const DynamicIcon: FC<DynamicIconProps> = ({
  lib,
  icon,
  className = "",
}) => {
  const [Icon, setIcon] = useState<IconType | null>(null);

  useEffect(() => {
    let mounted = true;
    import("./CustomIcons").then((mod) => {
      let IconComponent: IconType | null = null;
      if (lib === "go" && (icon as GoIcons) in mod.customIcons.go) {
        IconComponent = mod.customIcons.go[icon as GoIcons];
      } else if (lib === "si" && (icon as SiIcons) in mod.customIcons.si) {
        IconComponent = mod.customIcons.si[icon as SiIcons];
      }
      if (mounted) setIcon(() => IconComponent);
    });
    return () => {
      mounted = false;
    };
  }, [lib, icon]);

  if (!Icon) return null;
  return <Icon className={className} />;
};
