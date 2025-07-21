import { listenApiUrl } from "@/app/(auth)/listen/constants";
import { useJwtToken } from "@/app/next/features/html-parser/hooks/use-jwt-token";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface AddChapterSectionsResponse {
  chapterId: string;
}

interface AddChapterSectionsRequest {
  chapterId: string;
  sections: {
    title: string;
    mediaId: string;
    sectionNumber: number;
  }[];
}

const addChapterSections = async (
  { chapterId, sections }: AddChapterSectionsRequest,
  { jwt }: { jwt: string }
): Promise<AddChapterSectionsResponse> => {
  const resp = await fetch(`${listenApiUrl}/v1/add-chapter-sections`, {
    method: "POST",

    body: JSON.stringify({ sections, chapterId }),
    headers: {
      Authorization: jwt,
    },
  });

  const respJson = await resp.json();

  return respJson as AddChapterSectionsResponse;
};

export const useAddChapterSectionsMutation = () => {
  const jwt = useJwtToken();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ chapterId, sections }: AddChapterSectionsRequest) => {
      const media = await addChapterSections({ chapterId, sections }, { jwt });

      return media;
    },

    onSuccess: (data: AddChapterSectionsResponse) => {
      queryClient.refetchQueries({
        queryKey: ["list-chapter-sections", data.chapterId],
      });
    },
  });
};
