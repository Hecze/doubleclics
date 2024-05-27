"use client"
import SingleBlog from "@/components/Blog/SingleBlog";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { image } from "@nextui-org/theme";
import { useTranslations } from "next-intl";

const Blog = () => {
  const t = useTranslations('blog');
  const currentPath = window.location.pathname;

  const blogData = [
    {
      id: 1,
      title: t('blogs.0.title'),
      paragraph: t('blogs.0.paragraph'),
      image: t('blogs.0.image'),
      author: {
        name: t('blogs.0.author.name'),
        image: t('blogs.0.author.image'),
        designation: t('blogs.0.author.designation'),
      },
      tags: [],
      publishDate: t('blogs.0.publishDate'),
      path: currentPath + '/blog-details1'
      
    },
    {
      id: 1,
      title: t('blogs.1.title'),
      paragraph: t('blogs.1.paragraph'),
      image: t('blogs.1.image'),
      author: {
        name: t('blogs.1.author.name'),
        image: t('blogs.1.author.image'),
        designation: t('blogs.1.author.designation'),
      },
      tags: [],
      publishDate: t('blogs.1.publishDate'),
      path: currentPath + '/blog-details2'
    },
    {
      id: 3,
      title: t('blogs.2.title'),
      paragraph: t('blogs.2.paragraph'),
      image: t('blogs.2.image'),
      author: {
        name: t('blogs.2.author.name'),
        image: t('blogs.2.author.image'),
        designation: t('blogs.2.author.designation'),
      },
      tags: [],
      publishDate: t('blogs.2.publishDate'),
      path: currentPath + '/blog-details3'
    },
  ]

  return (
    <>
      <Breadcrumb
        pageName="Blog Grid"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In varius eros eget sapien consectetur ultrices. Ut quis dapibus libero."
      />

      <section className="pb-[120px] pt-[120px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap justify-center">
            {blogData.map((blog) => (
              <div
                key={blog.id}
                className="w-full px-4 md:w-2/3 lg:w-1/2 xl:w-1/3"
              >
                <SingleBlog blog={blog} />
              </div>
            ))}
          </div>

          <div className="-mx-4 flex flex-wrap" data-wow-delay=".15s">
            <div className="w-full px-4">
              <ul className="flex items-center justify-center pt-8">
                <li className="mx-1">
                  <a
                    href="#0"
                    className="flex h-9 min-w-[36px] items-center justify-center rounded-md bg-body-color bg-opacity-[15%] px-4 text-sm text-body-color transition hover:bg-primary hover:bg-opacity-100 hover:text-white"
                  >
                    Prev
                  </a>
                </li>
                <li className="mx-1">
                  <a
                    href="#0"
                    className="flex h-9 min-w-[36px] items-center justify-center rounded-md bg-body-color bg-opacity-[15%] px-4 text-sm text-body-color transition hover:bg-primary hover:bg-opacity-100 hover:text-white"
                  >
                    1
                  </a>
                </li>
                <li className="mx-1">
                  <a
                    href="#0"
                    className="flex h-9 min-w-[36px] items-center justify-center rounded-md bg-body-color bg-opacity-[15%] px-4 text-sm text-body-color transition hover:bg-primary hover:bg-opacity-100 hover:text-white"
                  >
                    2
                  </a>
                </li>
                <li className="mx-1">
                  <a
                    href="#0"
                    className="flex h-9 min-w-[36px] items-center justify-center rounded-md bg-body-color bg-opacity-[15%] px-4 text-sm text-body-color transition hover:bg-primary hover:bg-opacity-100 hover:text-white"
                  >
                    3
                  </a>
                </li>
                <li className="mx-1">
                  <span className="flex h-9 min-w-[36px] cursor-not-allowed items-center justify-center rounded-md bg-body-color bg-opacity-[15%] px-4 text-sm text-body-color">
                    ...
                  </span>
                </li>
                <li className="mx-1">
                  <a
                    href="#0"
                    className="flex h-9 min-w-[36px] items-center justify-center rounded-md bg-body-color bg-opacity-[15%] px-4 text-sm text-body-color transition hover:bg-primary hover:bg-opacity-100 hover:text-white"
                  >
                    12
                  </a>
                </li>
                <li className="mx-1">
                  <a
                    href="#0"
                    className="flex h-9 min-w-[36px] items-center justify-center rounded-md bg-body-color bg-opacity-[15%] px-4 text-sm text-body-color transition hover:bg-primary hover:bg-opacity-100 hover:text-white"
                  >
                    Next
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Blog;
