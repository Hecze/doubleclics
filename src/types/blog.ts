type Author = {
  name: string;
  image: string;
  designation: string;
};

type BlogContent = {
  title: string;
  paragraph: string;
  list: any;
}

export type Blog = {
  id: number;
  title: string;
  paragraph: string;
  image: string;
  author: Author;
  tags: string[];
  publishDate: string;
  path: string;
};
