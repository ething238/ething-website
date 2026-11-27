import BlogArticle from '../components/BlogArticle.jsx'
import articleHtml from './ai-hiring-blog-article.html?raw'

const markup = { __html: articleHtml }

export default function AiHiringBlogArticle() {
  return <BlogArticle markup={markup} />
}
