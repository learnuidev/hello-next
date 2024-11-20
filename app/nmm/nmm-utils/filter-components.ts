import { getHumanPinyin } from "./get-human-pinyin";

// const filterComponent = ({
//   component,
//   query,
//   characters,
//   isQuerySameAsVal = false,
//   getAll = false,
// }: {
//   component: any;
//   query: string;
//   characters?: any;
//   isQuerySameAsVal?: boolean;
//   getAll?: boolean;
// }) => {

// const filterComponent = (
//   query: string,
//   comp: any,
//   meta?: any,
//   isQuerySameAsVal = false
// ) => {
const filterComponent = ({
  component: comp,
  query,
  characters,
  isQuerySameAsVal = false,
  meta,
  getAll = false,
}: {
  component: any;
  query: string;
  characters?: any;
  meta?: any;
  isQuerySameAsVal?: boolean;
  getAll?: boolean;
}) => {
  if (getAll) {
    return { ...comp, score: 1 };
  }
  if (query) {
    const metaComp = meta?.find((item: any) => item?.hanzi === comp?.hanzi);

    const storyJSON = JSON.stringify(metaComp?.story)?.toLowerCase() || "";

    const component = comp?.en ? comp : metaComp || comp;

    const englishPinyin = getHumanPinyin({ ...comp, ...metaComp });

    const en = `${comp?.en} ${metaComp?.en}`;

    // First Filter
    if (
      query?.toLowerCase() === englishPinyin ||
      query?.toLowerCase() === (comp?.hanzi || metaComp?.hanzi || comp?.input)
    ) {
      return {
        ...comp,
        ...metaComp,
        score: 1,
      };
    }

    // Second Filter
    if (!isQuerySameAsVal && storyJSON.includes(query?.toLowerCase())) {
      return {
        ...comp,
        ...metaComp,
        score: 1,
      };
    }

    if (englishPinyin?.includes(query?.toLowerCase())) {
      return {
        ...comp,
        ...metaComp,
        score: 0.5,
      };
    }

    if (query?.toLowerCase() === component?.en?.toLowerCase()) {
      return {
        ...comp,
        ...metaComp,
        score: 0.4,
      };
    }
    if (query?.toLowerCase() === component?.query?.toLowerCase()) {
      return {
        ...comp,
        ...metaComp,
        score: 0.3,
      };
    }
    if (component?.query?.toLowerCase()?.includes(query?.toLowerCase())) {
      return {
        ...comp,
        ...metaComp,
        score: 0.2,
      };
    }

    const queryLength = query?.length;

    if (
      en?.slice(0, queryLength)?.toLowerCase()?.includes(query?.toLowerCase())
    ) {
      return {
        ...comp,
        ...metaComp,
        score: 0.3,
      };
    }

    if (en?.toLowerCase()?.includes(query?.toLowerCase())) {
      return {
        ...comp,
        ...metaComp,
        score: 0.2,
      };
    }

    if (
      (comp?.es || metaComp?.es)?.toLowerCase()?.includes(query?.toLowerCase())
    ) {
      return {
        ...comp,
        ...metaComp,
        score: 0.2,
      };
    }
    if (
      (comp?.lang || metaComp?.lang)
        ?.toLowerCase()
        ?.includes(query?.toLowerCase())
    ) {
      return {
        ...comp,
        ...metaComp,
        score: 0.2,
      };
    }

    return null;
  } else {
    return { ...comp, score: 1 };
  }
};

export const filterComponents = ({
  components,
  query,
  characters,
  isQuerySameAsVal = false,
  getAll = false,
}: {
  components: any;
  query: string;
  characters?: any;
  isQuerySameAsVal?: boolean;
  getAll?: boolean;
}) => {
  const filteredComponents = components?.length
    ? components
        // .filter((component: any) => component?.hanzi?.length <= 3)
        .map((component: any) => {
          return filterComponent({
            query,
            component,
            characters,
            isQuerySameAsVal,
            getAll,
          });
        })
        .filter(Boolean)
        .sort((a: any, b: any) => b.score - a.score)
    : //
      [];

  return filteredComponents;
};
