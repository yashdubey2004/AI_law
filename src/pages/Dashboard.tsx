import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Upload, Eye, Trash2, Search, FileText, Clock, CheckCircle, AlertCircle } from "lucide-react"

const mockDocuments = [
  {
    id: 1,
    name: "Employment Contract.pdf",
    uploadDate: "2024-01-15",
    status: "Analyzed",
    statusColor: "success" as const,
  },
  {
    id: 2,
    name: "Lease Agreement.pdf",
    uploadDate: "2024-01-14",
    status: "Pending",
    statusColor: "warning" as const,
  },
  {
    id: 3,
    name: "NDA Template.pdf",
    uploadDate: "2024-01-13",
    status: "Analyzed",
    statusColor: "success" as const,
  },
]

const mockNews = [
  "Supreme Court ruling on digital privacy rights",
  "New employment law amendments effective March 2024",
  "Corporate governance guidelines updated",
  "Recent changes in contract law precedents",
]

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isUploadOpen, setIsUploadOpen] = useState(false)
  const { toast } = useToast()

  const handleUpload = () => {
    toast({
      title: "Document uploaded",
      description: "Your document is being analyzed...",
    })
    setIsUploadOpen(false)
  }

  const handleViewAnalysis = (docName: string) => {
    toast({
      title: "Opening analysis",
      description: `Loading analysis for ${docName}`,
    })
    // In a real app, navigate to document analysis page
    window.location.href = "/document-analysis"
  }

  const handleDelete = (docName: string) => {
    toast({
      title: "Document deleted",
      description: `${docName} has been removed from your locker`,
      variant: "destructive",
    })
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Analyzed":
        return <CheckCircle className="h-4 w-4" />
      case "Pending":
        return <Clock className="h-4 w-4" />
      default:
        return <AlertCircle className="h-4 w-4" />
    }
  }

  const getStatusVariant = (statusColor: string) => {
    switch (statusColor) {
      case "success":
        return "default"
      case "warning":
        return "secondary"
      default:
        return "destructive"
    }
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-bold">Welcome back, John Doe!</h1>
        <p className="text-muted-foreground">
          Manage your legal documents and stay updated with the latest legal insights.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Content - Document Locker */}
        <div className="lg:col-span-3 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Document Locker
                </CardTitle>
                <CardDescription>
                  Your uploaded documents and analysis results
                </CardDescription>
              </div>
              <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload New Document
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Upload Document</DialogTitle>
                    <DialogDescription>
                      Drag and drop your legal document here or click to browse.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-12 text-center">
                    <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-sm text-muted-foreground mb-4">
                      Drop your file here or click to browse
                    </p>
                    <Button onClick={handleUpload}>Select File</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Document Name</TableHead>
                    <TableHead>Upload Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockDocuments.map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell className="font-medium">{doc.name}</TableCell>
                      <TableCell>{doc.uploadDate}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusVariant(doc.statusColor)} className="flex items-center gap-1 w-fit">
                          {getStatusIcon(doc.status)}
                          {doc.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleViewAnalysis(doc.name)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDelete(doc.name)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar - Quick Access */}
        <div className="space-y-6">
          {/* Case Law Search Widget */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Case Law Search
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="Search case law..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button className="w-full">
                <Search className="mr-2 h-4 w-4" />
                Search
              </Button>
            </CardContent>
          </Card>

          {/* Legal News Widget */}
          <Card>
            <CardHeader>
              <CardTitle>Latest Legal News</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockNews.map((news, index) => (
                  <div key={index} className="text-sm">
                    <a
                      href="#"
                      className="hover:text-primary transition-colors line-clamp-2"
                    >
                      {news}
                    </a>
                    {index < mockNews.length - 1 && <hr className="my-3" />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}