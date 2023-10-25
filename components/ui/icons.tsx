'use client'

import * as React from 'react'
// import {
//   faBowlChopsticksNoodles,
//   faUserShakespeare
// } from '@fortawesome/pro-duotone-svg-icons'
import {
  faCitrus,
  faBowlChopsticksNoodles,
  faUserShakespeare,
  faSeedling,
  faXmark,
  faMapLocationDot,
  faMapPin,
  faFarm,
  faCow,
  faTheaterMasks,
  faCameraRetro,
  faCamcorder,
  faCameraMovie,
  faClapperboardPlay,
  faChartSimple,
  faPlay,
  faAbacus,
  faTrees,
  faGameConsoleHandheld,
  faBackpack,
  faTableTree,
  faComment,
  faAngleRight,
  faPause,
  faAngleLeft,
  faMicrophone,
  faThoughtBubble,
  faCheck,
  faFaceLaugh,
  faMusic,
  faFaceGrinBeamSweat,
  faFaceThinking,
  faHeadphones,
  faLightbulb,
  faProjector,
  faMoonCloud,
  faSunHaze,
  faCloudDrizzle,
  faCloudsSun,
  faGrid2,
  faGear,
  faPlus,
  faPlusLarge,
  faBooks,
  faCauldron,
  faMapLocation,
  faBlog,
  faAtomSimple,
  faTicketAirline,
  faPersonHiking,
  faWatermelonSlice
} from '@fortawesome/sharp-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faYoutube } from '@fortawesome/free-brands-svg-icons'

// import { faCitrus } from '@fortawesome/pro-duotone-svg-icons'

export const SearchIcon = (props: any) => {
  const isHeight =
    props.className && props?.className.includes('h-') ? '' : `h-6 w-6`
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth={1.5}
      stroke='currentColor'
      className={`${props.className} ${isHeight}`}
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
      />
    </svg>
  )
}

export const PropsIcon = (props: any) => {
  return <FontAwesomeIcon {...props} icon={faBowlChopsticksNoodles} />
}
export const CharacterIcon = (props: any) => {
  return <FontAwesomeIcon {...props} icon={faUserShakespeare} />
}

export const WordIcon = (props: any) => {
  return <FontAwesomeIcon {...props} icon={faSeedling} />
}

export const SentenceIcon = (props: any) => {
  return <FontAwesomeIcon {...props} icon={faTrees} />
}

export const CloseIcon = (props: any) => {
  return <FontAwesomeIcon {...props} icon={faXmark} />
}

export const PlaceIcon = (props: any) => {
  return <FontAwesomeIcon {...props} icon={faMapPin} />
}

export const BackIcon = (props: any) => {
  const isHeight = props.className && props?.className.includes('h-') ? '' : `h-6 w-6`;

  return (
      <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className={`${props.className} ${isHeight}`}
      >
          <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M21 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953l7.108-4.062A1.125 1.125 0 0121 8.688v8.123zM11.25 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953L9.567 7.71a1.125 1.125 0 011.683.977v8.123z'
          />
      </svg>
  );
};


export const VillageIcon = (props: any) => {
  return <FontAwesomeIcon {...props} icon={faCow} />
}

export const ActorIcon = (props: any) => {
  return <FontAwesomeIcon {...props} icon={faTheaterMasks} />
}
export const NomadIcon = (props: any) => {
  return <FontAwesomeIcon {...props} icon={faPersonHiking} />
}

export const TravellerIcon = (props: any) => {
  return <FontAwesomeIcon {...props} icon={faBackpack} />
}
export const SceneIcon = (props: any) => {
  return <FontAwesomeIcon {...props} icon={faClapperboardPlay} />
}

export const StoryIcon = (props: any) => {
  return <FontAwesomeIcon {...props} icon={faWatermelonSlice} />
}

export const AnalyticsIcon = (props: any) => {
  return <FontAwesomeIcon {...props} icon={faChartSimple} />
}

export const LearnIcon = (props: any) => {
  return <FontAwesomeIcon {...props} icon={faAbacus} />
}

export const GameIcon = (props: any) => {
  return <FontAwesomeIcon {...props} icon={faGameConsoleHandheld} />
}
export const ConvosIcon = (props: any) => {
  return <FontAwesomeIcon {...props} icon={faComment} />
}

export const PinyinChartIcon = (props: any) => {
  return <FontAwesomeIcon {...props} icon={faTableTree} />
  // return <FontAwesomeIcon {...props} icon={faMapLocation} />
}

export const MandarinoIcon = (props: any) => {
  return <FontAwesomeIcon {...props} icon={faCitrus} />
}

export const MessageIcon = (props: any) => {
  return <FontAwesomeIcon {...props} icon={faComment} />
}
export const NextIcon = (props: any) => {
  return <FontAwesomeIcon {...props} icon={faAngleRight} />
}
export const PrevIcon = (props: any) => {
  return <FontAwesomeIcon {...props} icon={faAngleLeft} />
}
export const PlayIcon = (props: any) => {
  return <FontAwesomeIcon {...props} icon={faPlay} />
}
export const PauseIcon = (props: any) => {
  return <FontAwesomeIcon {...props} icon={faPause} />
}

export const MicIcon = (props: any) => {
  return <FontAwesomeIcon {...props} icon={faMicrophone} />
}
export const ThoughtIcon = (props: any) => {
  return <FontAwesomeIcon {...props} icon={faThoughtBubble} />
}
export const CheckIcon = (props: any) => {
  return <FontAwesomeIcon {...props} icon={faCheck} />
}

export const GradeAIcon = (props: any) => {
  return <FontAwesomeIcon {...props} icon={faMusic} />
}

export const GradeBIcon = (props: any) => {
  return <FontAwesomeIcon {...props} icon={faFaceThinking} />
}
export const GradeFIcon = (props: any) => {
  return <FontAwesomeIcon {...props} icon={faFaceGrinBeamSweat} />
  // return <FontAwesomeIcon {...props} icon={faHeadphones} />
}

export const FocusIcon = (props: any) => {
  // return <FontAwesomeIcon {...props} icon={faProjector} />
  return <FontAwesomeIcon {...props} icon={faLightbulb} />
  // return <FontAwesomeIcon {...props} icon={faHeadphones} />
}
export const MovieIcon = (props: any) => {
  // return <FontAwesomeIcon {...props} icon={faProjector} />
  return <FontAwesomeIcon {...props} icon={faCameraMovie} />
  // return <FontAwesomeIcon {...props} icon={faLightbulb} />
  // return <FontAwesomeIcon {...props} icon={faHeadphones} />
}
export const MoonIcon = (props: any) => {
  // return <FontAwesomeIcon {...props} icon={faProjector} />
  return <FontAwesomeIcon {...props} icon={faMoonCloud} />
  // return <FontAwesomeIcon {...props} icon={faLightbulb} />
  // return <FontAwesomeIcon {...props} icon={faHeadphones} />
}
export const SunRiseIcon = (props: any) => {
  // return <FontAwesomeIcon {...props} icon={faSunHaze} />
  return <FontAwesomeIcon {...props} icon={faCloudsSun} />
}
export const CloudyIcon = (props: any) => {
  // return <FontAwesomeIcon {...props} icon={faProjector} />
  return <FontAwesomeIcon {...props} icon={faCloudDrizzle} />
  // return <FontAwesomeIcon {...props} icon={faLightbulb} />
  // return <FontAwesomeIcon {...props} icon={faHeadphones} />
}
export const AppStoreIcon = (props: any) => {
  // return <FontAwesomeIcon {...props} icon={faProjector} />
  return <FontAwesomeIcon {...props} icon={faGrid2} />
  // return <FontAwesomeIcon {...props} icon={faLightbulb} />
  // return <FontAwesomeIcon {...props} icon={faHeadphones} />
}
export const YoutubeIcon = (props: any) => {
  // return <FontAwesomeIcon {...props} icon={faProjector} />
  return <FontAwesomeIcon {...props} icon={faYoutube} />
  // return <FontAwesomeIcon {...props} icon={faLightbulb} />
  // return <FontAwesomeIcon {...props} icon={faHeadphones} />
}
export const SettingsIcon = (props: any) => {
  // return <FontAwesomeIcon {...props} icon={faProjector} />
  return <FontAwesomeIcon {...props} icon={faGear} />
  // return <FontAwesomeIcon {...props} icon={faLightbulb} />
  // return <FontAwesomeIcon {...props} icon={faHeadphones} />
}
export const PlusIcon = (props: any) => {
  // return <FontAwesomeIcon {...props} icon={faProjector} />
  return <FontAwesomeIcon {...props} icon={faPlusLarge} />
  // return <FontAwesomeIcon {...props} icon={faLightbulb} />
  // return <FontAwesomeIcon {...props} icon={faHeadphones} />
}
export const LearningIcon = (props: any) => {
  return <FontAwesomeIcon {...props} icon={faBooks} />
}
export const HskIcon = (props: any) => {
  return <FontAwesomeIcon {...props} icon={faCauldron} />
}

export const PatraIcon = (props: any) => {
  return <FontAwesomeIcon {...props} icon={faTicketAirline} />
}
export const CCIcon = (props: any) => {
  return <FontAwesomeIcon {...props} icon={faAtomSimple} />
}
