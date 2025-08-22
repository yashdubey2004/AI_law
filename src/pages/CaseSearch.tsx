import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Search, ExternalLink, Calendar, Gavel } from "lucide-react"

const mockCases = [
  {
    id: 1,
    title: "Smith v. Johnson Construction Co.",
    court: "Supreme Court of California",
    year: "2023",
    relevanceScore: 95,
    summary: "Employment contract termination dispute regarding 30-day notice requirements and severance obligations.",
    keyPoints: ["Employment termination", "Notice requirements", "Severance pay"],
    citation: "2023 Cal. LEXIS 4567",
  },
  {
    id: 2,
    title: "Tech Innovations Ltd. v. StartupCorp",
    court: "Federal Circuit Court",
    year: "2022",
    relevanceScore: 88,
    summary: "Contract dispute involving confidentiality clauses and trade secret protection in employment agreements.",
    keyPoints: ["Confidentiality", "Trade secrets", "Employment contracts"],
    citation: "2022 Fed. Cir. LEXIS 8901",
  },
  {
    id: 3,
    title: "Global Services Inc. v. Employee Union",
    court: "Court of Appeals, 9th Circuit",
    year: "2023",
    relevanceScore: 82,
    summary: "Collective bargaining agreement interpretation regarding individual employment contract modifications.",
    keyPoints: ["Collective bargaining", "Contract modification", "Union rights"],
    citation: "2023 9th Cir. LEXIS 2345",
  },
]

export default function CaseSearch() {
  const [searchQuery, setSearchQuery] = useState("employment contract termination")
  const [isLoading, setIsLoading] = useState(false)
  const [searchResults, setSearchResults] = useState(mockCases)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate search delay
    setTimeout(() => {
      setIsLoading(false)
      setSearchResults(mockCases)
    }, 1000)
  }

  const getRelevanceColor = (score: number) => {
    if (score >= 90) return "default"
    if (score >= 80) return "secondary"
    return "outline"
  }

  return (
    <div className="flex-1 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Case Law Search</h1>
          <p className="text-muted-foreground text-lg">
            Search through extensive legal databases to find relevant precedents and case law.
          </p>
        </div>

        {/* Search Bar */}
        <Card>
          <CardContent className="p-6">
            <form onSubmit={handleSearch} className="flex gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Enter legal topic, case name, or keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="text-lg h-12"
                />
              </div>
              <Button type="submit" size="lg" disabled={isLoading}>
                <Search className="mr-2 h-5 w-5" />
                {isLoading ? "Searching..." : "Search Cases"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Search Results</h2>
              <p className="text-muted-foreground">
                Found {searchResults.length} relevant cases
              </p>
            </div>

            <div className="space-y-4">
              {searchResults.map((case_) => (
                <Card key={case_.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Gavel className="h-5 w-5 text-primary" />
                          <CardTitle className="text-xl">{case_.title}</CardTitle>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {case_.year}
                          </div>
                          <span>{case_.court}</span>
                          <span className="font-mono">{case_.citation}</span>
                        </div>
                      </div>
                      <Badge variant={getRelevanceColor(case_.relevanceScore)}>
                        {case_.relevanceScore}% Match
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <CardDescription className="text-base leading-relaxed">
                      {case_.summary}
                    </CardDescription>
                    
                    <div>
                      <h4 className="font-medium mb-2">Key Legal Points:</h4>
                      <div className="flex flex-wrap gap-2">
                        {case_.keyPoints.map((point, index) => (
                          <Badge key={index} variant="outline">
                            {point}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">
                        Citation: <span className="font-mono">{case_.citation}</span>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Save to Library
                        </Button>
                        <Button size="sm" className="group">
                          View Full Case
                          <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}