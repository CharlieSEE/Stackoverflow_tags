import { useEffect, useState } from "react";

type TagResponseItem = {
  has_synonyms: boolean;
  is_moderator_only: boolean;
  is_required: boolean;
  count: number;
  name: string;
};

type TagResponse = {
  items: Array<TagResponseItem>;
  has_more: boolean;
  quota_max: number;
  quota_remaining: number;
};

export type Tag = {
  count: number;
  name: string;
};

type useTagsResult = {
  tags: Array<Tag> | null;
  isLoading: boolean;
  error: Error | null;
  hasMore: boolean;
};

type useTagsProps = {
  page?: string;
  pageSize?: string;
};

const mapTagResponse = (tag: TagResponseItem): Tag => ({
  name: tag.name,
  count: tag.count,
});

const useTags = ({
  page = "1",
  pageSize = "25",
}: useTagsProps): useTagsResult => {
  const [tags, setTags] = useState<useTagsResult["tags"]>(null);
  const [isLoading, setIsLoading] = useState<useTagsResult["isLoading"]>(false);
  const [error, setError] = useState<useTagsResult["error"]>(null);
  const [hasMore, setHasMore] = useState<useTagsResult["hasMore"]>(false);

  const fetchTags = async () => {
    setIsLoading(true);

    try {
      const res: TagResponse = await (
        await fetch(
          "https://api.stackexchange.com/2.3/tags?" +
            new URLSearchParams({
              page,
              pagesize: pageSize,
              site: "stackoverflow",
            })
        )
      ).json();

      setHasMore(res.has_more);
      setTags(res.items.map(mapTagResponse));
    } catch (error: any) {
      setError(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchTags();
  }, [page, pageSize]);

  return { tags, isLoading, error, hasMore };
};

export default useTags;
