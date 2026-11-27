import BlogArticle from '../components/BlogArticle.jsx'
import articleHtml from './python-blog-article.html?raw'
import { pythonBlogPost } from '../data/blogPosts.js'

export { pythonBlogPath, pythonBlogPost } from '../data/blogPosts.js'

const articleMarkup = {
  __html: articleHtml.replace('python-backend-cover.webp', pythonBlogPost.imageUrl),
}

export default function PythonBlogArticle() {
  return <BlogArticle markup={articleMarkup} />
}
