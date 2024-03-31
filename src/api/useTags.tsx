import { useCallback, useEffect, useState } from "react";

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

const fakeRes = {
  items: [
    {
      has_synonyms: true,
      is_moderator_only: false,
      is_required: false,
      count: 2528867,
      name: "javascript",
    },
    {
      has_synonyms: true,
      is_moderator_only: false,
      is_required: false,
      count: 2192255,
      name: "python",
    },
    {
      has_synonyms: true,
      is_moderator_only: false,
      is_required: false,
      count: 1917352,
      name: "java",
    },
    {
      has_synonyms: true,
      is_moderator_only: false,
      is_required: false,
      count: 1614996,
      name: "c#",
    },
    {
      collectives: [
        {
          tags: ["php"],
          external_links: [
            {
              type: "support",
              link: "https://stackoverflow.com/contact?topic=15",
            },
          ],
          description:
            "A collective where developers working with PHP can learn and connect about the open source scripting language.",
          link: "/collectives/php",
          name: "PHP",
          slug: "php",
        },
      ],
      has_synonyms: true,
      is_moderator_only: false,
      is_required: false,
      count: 1464453,
      name: "php",
    },
    {
      collectives: [
        {
          tags: ["android", "ios"],
          external_links: [
            {
              type: "support",
              link: "https://stackoverflow.com/contact?topic=15",
            },
          ],
          description:
            "A collective for developers who want to share their knowledge and learn more about mobile development practices and platforms",
          link: "/collectives/mobile-dev",
          name: "Mobile Development",
          slug: "mobile-dev",
        },
      ],
      has_synonyms: true,
      is_moderator_only: false,
      is_required: false,
      count: 1417237,
      name: "android",
    },
    {
      has_synonyms: true,
      is_moderator_only: false,
      is_required: false,
      count: 1187384,
      name: "html",
    },
    {
      has_synonyms: true,
      is_moderator_only: false,
      is_required: false,
      count: 1034846,
      name: "jquery",
    },
    {
      has_synonyms: true,
      is_moderator_only: false,
      is_required: false,
      count: 806735,
      name: "c++",
    },
    {
      has_synonyms: true,
      is_moderator_only: false,
      is_required: false,
      count: 804234,
      name: "css",
    },
    {
      collectives: [
        {
          tags: ["android", "ios"],
          external_links: [
            {
              type: "support",
              link: "https://stackoverflow.com/contact?topic=15",
            },
          ],
          description:
            "A collective for developers who want to share their knowledge and learn more about mobile development practices and platforms",
          link: "/collectives/mobile-dev",
          name: "Mobile Development",
          slug: "mobile-dev",
        },
      ],
      has_synonyms: true,
      is_moderator_only: false,
      is_required: false,
      count: 687250,
      name: "ios",
    },
    {
      has_synonyms: true,
      is_moderator_only: false,
      is_required: false,
      count: 670740,
      name: "sql",
    },
    {
      has_synonyms: true,
      is_moderator_only: false,
      is_required: false,
      count: 662031,
      name: "mysql",
    },
    {
      collectives: [
        {
          tags: [
            "quantmod",
            "r",
            "shiny",
            "rlang",
            "r-package",
            "tidyverse",
            "tidyr",
            "r-raster",
            "readr",
            "dplyr",
            "shinydashboard",
            "rstudio",
            "knitr",
            "lubridate",
            "shiny-server",
            "dtplyr",
            "forcats",
            "plyr",
            "r-caret",
            "purrr",
            "stringr",
            "zoo",
            "ggplot2",
            "tibble",
            "data.table",
            "shinyapps",
            "rvest",
          ],
          external_links: [
            {
              type: "support",
              link: "https://stackoverflow.com/contact?topic=15",
            },
          ],
          description:
            "A collective where data scientists and AI researchers gather to find, share, and learn about R and other subtags like knitr and dplyr.",
          link: "/collectives/r-language",
          name: "R Language",
          slug: "r-language",
        },
      ],
      has_synonyms: true,
      is_moderator_only: false,
      is_required: false,
      count: 505547,
      name: "r",
    },
    {
      has_synonyms: true,
      is_moderator_only: false,
      is_required: false,
      count: 476710,
      name: "reactjs",
    },
    {
      has_synonyms: true,
      is_moderator_only: false,
      is_required: false,
      count: 472036,
      name: "node.js",
    },
    {
      has_synonyms: true,
      is_moderator_only: false,
      is_required: false,
      count: 416689,
      name: "arrays",
    },
    {
      has_synonyms: false,
      is_moderator_only: false,
      is_required: false,
      count: 403907,
      name: "c",
    },
    {
      has_synonyms: true,
      is_moderator_only: false,
      is_required: false,
      count: 374632,
      name: "asp.net",
    },
    {
      has_synonyms: true,
      is_moderator_only: false,
      is_required: false,
      count: 360346,
      name: "json",
    },
    {
      has_synonyms: true,
      is_moderator_only: false,
      is_required: false,
      count: 343660,
      name: "python-3.x",
    },
    {
      has_synonyms: true,
      is_moderator_only: false,
      is_required: false,
      count: 338052,
      name: "ruby-on-rails",
    },
    {
      has_synonyms: true,
      is_moderator_only: false,
      is_required: false,
      count: 337882,
      name: ".net",
    },
    {
      has_synonyms: true,
      is_moderator_only: false,
      is_required: false,
      count: 334512,
      name: "sql-server",
    },
    {
      has_synonyms: true,
      is_moderator_only: false,
      is_required: false,
      count: 333370,
      name: "swift",
    },
  ],
  has_more: true,
  quota_max: 300,
  quota_remaining: 283,
};

const useTags = ({
  page = "1",
  pageSize = "25",
}: useTagsProps): useTagsResult => {
  const [tags, setTags] = useState<useTagsResult["tags"]>(null);
  const [isLoading, setIsLoading] = useState<useTagsResult["isLoading"]>(false);
  const [error, setError] = useState<useTagsResult["error"]>(null);
  const [hasMore, setHasMore] = useState<useTagsResult["hasMore"]>(false);

  //! Maybe use callback
  const fetchTags = async () => {
    setIsLoading(true);

    try {
      // const res: TagResponse = await (
      //   await fetch(
      //     "https://api.stackexchange.com/2.3/tags?" +
      //       new URLSearchParams({
      //         page,
      //         pagesize: pageSize,
      //         site: "stackoverflow",
      //       })
      //   )
      // ).json();

      // setHasMore(res.has_more);
      // setTags(res.items.map(mapTagResponse));

      //! FAKE

      await fetch("https://bible-api.com/john 3:16");

      setTags(fakeRes.items.map(mapTagResponse));
      setHasMore(true);
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
