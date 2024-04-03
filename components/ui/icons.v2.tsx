import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import {
  faCompass,
  faCopy,
  faEarthAsia,
  faGear,
  faHome,
  faMagnifyingGlass,
  faPowerOff,
  faRectangleVerticalHistory,
  faSeedling,
} from "@fortawesome/pro-thin-svg-icons";

const createFAIcon = (icon: FontAwesomeIconProps["icon"]) => {
  return function FAIcon(props: any) {
    return <FontAwesomeIcon icon={icon} {...props} />;
  };
};

export const Icons = {
  magnifyingGlass: createFAIcon(faMagnifyingGlass),
  verticalStack: createFAIcon(faRectangleVerticalHistory),
  earthAsia: createFAIcon(faEarthAsia),
  compass: createFAIcon(faCompass),
  home: createFAIcon(faHome),
  gear: createFAIcon(faGear),
  powerOff: createFAIcon(faPowerOff),
  copy: createFAIcon(faCopy),
  seedling: createFAIcon(faSeedling),
};
