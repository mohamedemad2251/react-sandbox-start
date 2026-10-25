export type Project = {
  category: string;
  date: string;
  description: string;
  featured: boolean;
  id: string;
  documentId: string;
  image: {
    url: string;
  } | null;
  title: string;
  url: string;
};

// (NEW) Project response is the type defined to match Strapi's endpoint's result
export type StrapiResponse<T> = {
  data: T[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
};

export type ProjectResponse = {
  data: Project;
  meta: {};
};

export type Post = {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  body: string;
  image: {
    url: string;
  };
};

export type PostResponse = {
  data: Post;
  meta: {};
};
