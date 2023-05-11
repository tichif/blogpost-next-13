import Link from 'next/link';

import { getPostMeta } from '@/lib/posts';
import ListItem from '@/app/components/ListItem';

export const revalidate = 0;

type Props = {
  params: {
    tag: string;
  };
};

// export async function generateStaticParams() {
//   const posts = await getPostMeta();

//   if (!posts) {
//     return [];
//   }

//   const tags = new Set(posts.map((post) => post.tags).flat());

//   return Array.from(tags).map((tag) => ({ tag }));
// }

export function generateMetadata({ params: { tag } }: Props) {
  return {
    title: `Posts about ${tag}`,
  };
}

const TagPage = async ({ params: { tag } }: Props) => {
  const posts = await getPostMeta();

  if (!posts) {
    return <p className='mt-10 text-center'>Sorry, no post available</p>;
  }

  const tagPosts = posts.filter((post) => post.tags.includes(tag));

  if (!tagPosts.length) {
    return (
      <div className='text-center'>
        <p className='mt-10'>Sorry, no posts for {tag}.</p>
        <Link href='/'>Back to Home</Link>
      </div>
    );
  }

  return (
    <>
      <h2 className='text-3xl mt-4 mb-0'>Results for: #{tag}</h2>
      <section className='mt-6 mx-auto max-w-2xl'>
        <ul className='w-full list-none p-0'>
          {tagPosts.map((post) => (
            <ListItem key={post.id} post={post} />
          ))}
        </ul>
      </section>
    </>
  );
};

export default TagPage;
