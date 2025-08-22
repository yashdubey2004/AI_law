import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Calendar, Clock, ExternalLink, Newspaper } from "lucide-react"

const mockNews = [
  {
    id: 1,
    title: "Supreme Court Rules on Digital Privacy Rights in Employment Context",
    summary: "A landmark decision establishing new guidelines for employee privacy rights in digital communications and monitoring systems.",
    category: "Employment Law",
    date: "2024-01-20",
    readTime: "5 min read",
    source: "Legal Times",
    urgent: true,
  },
  {
    id: 2,
    title: "New Employment Law Amendments Effective March 2024",
    summary: "Comprehensive changes to employment regulations including remote work policies, compensation transparency, and termination procedures.",
    category: "Employment Law",
    date: "2024-01-18",
    readTime: "7 min read",
    source: "Employment Law Journal",
    urgent: false,
  },
  {
    id: 3,
    title: "Corporate Governance Guidelines Updated by SEC",
    summary: "Updated guidelines for public companies regarding board composition, executive compensation disclosure, and shareholder rights.",
    category: "Corporate Law",
    date: "2024-01-15",
    readTime: "6 min read",
    source: "Corporate Counsel",
    urgent: false,
  },
  {
    id: 4,
    title: "Federal Court Clarifies Contract Law Precedents",
    summary: "Recent ruling provides clarity on force majeure clauses and contract modification requirements in commercial agreements.",
    category: "Contract Law",
    date: "2024-01-12",
    readTime: "4 min read",
    source: "Contract Law Review",
    urgent: false,
  },
  {
    id: 5,
    title: "Intellectual Property Protection Updates for Tech Companies",
    summary: "New guidelines for patent protection, trade secret enforcement, and software copyright in the technology sector.",
    category: "IP Law",
    date: "2024-01-10",
    readTime: "8 min read",
    source: "Tech Law Quarterly",
    urgent: false,
  },
  {
    id: 6,
    title: "Environmental Compliance Requirements for 2024",
    summary: "Updated environmental regulations affecting manufacturing and construction industries with new compliance deadlines.",
    category: "Environmental Law",
    date: "2024-01-08",
    readTime: "6 min read",
    source: "Environmental Law Times",
    urgent: true,
  },
]

const categories = [
  "All Categories",
  "Employment Law",
  "Corporate Law", 
  "Contract Law",
  "IP Law",
  "Environmental Law",
]

export default function LegalNews() {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    })
  }

  const getCategoryColor = (category: string): "default" | "secondary" | "outline" | "destructive" => {
    const colors: Record<string, "default" | "secondary" | "outline" | "destructive"> = {
      "Employment Law": "default",
      "Corporate Law": "secondary", 
      "Contract Law": "outline",
      "IP Law": "destructive",
      "Environmental Law": "default",
    }
    return colors[category] || "outline"
  }

  return (
    <div className="flex-1 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4 flex items-center justify-center gap-3">
            <Newspaper className="h-8 w-8 text-primary" />
            Legal News & Updates
          </h1>
          <p className="text-muted-foreground text-lg">
            Stay informed with the latest legal developments, court decisions, and regulatory changes.
          </p>
        </div>

        {/* Category Filter */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={category === "All Categories" ? "default" : "outline"}
                  size="sm"
                >
                  {category}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* News Articles */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {mockNews.map((article) => (
            <Card key={article.id} className="hover:shadow-lg transition-shadow flex flex-col">
              <CardHeader className="flex-shrink-0">
                <div className="flex items-start justify-between mb-2">
                  <Badge 
                    variant={getCategoryColor(article.category)}
                    className="mb-2"
                  >
                    {article.category}
                  </Badge>
                  {article.urgent && (
                    <Badge variant="destructive" className="ml-2">
                      Urgent
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-xl leading-tight hover:text-primary transition-colors cursor-pointer">
                  {article.title}
                </CardTitle>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {formatDate(article.date)}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {article.readTime}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="flex-1 flex flex-col justify-between">
                <CardDescription className="text-base leading-relaxed mb-4">
                  {article.summary}
                </CardDescription>
                
                <div className="space-y-4">
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Source: {article.source}
                    </span>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Save Article
                      </Button>
                      <Button size="sm" className="group">
                        Read More
                        <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center pt-8">
          <Button variant="outline" size="lg">
            Load More Articles
          </Button>
        </div>
      </div>
    </div>
  )
}