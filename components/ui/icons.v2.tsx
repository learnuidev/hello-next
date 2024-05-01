import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import {
  faCalculatorSimple,
  faChevronLeft,
  faCompass,
  faCopy,
  faEarthAsia,
  faGalaxy,
  faGear,
  faHome,
  faMagnifyingGlass,
  faMusicNote,
  faPowerOff,
  faRectangleVerticalHistory,
  faSeedling,
  faStairs,
  faLightbulb,
  faRectangleHistory,
} from "@fortawesome/pro-thin-svg-icons";
// import { faLightbulb } from "@fortawesome/pro-thin-svg-icons";

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
  stairs: createFAIcon(faStairs),
  musicNote: createFAIcon(faMusicNote),
  analyze: createFAIcon(faGalaxy),
  calculatorSimple: createFAIcon(faCalculatorSimple),
  back: createFAIcon(faChevronLeft),
  lightBulb: createFAIcon(faLightbulb),

  rectangleHistory: createFAIcon(faRectangleHistory),
};
