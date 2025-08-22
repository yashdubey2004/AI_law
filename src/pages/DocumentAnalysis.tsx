import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Volume2, Send, FileText } from "lucide-react"

const mockClauses = [
  {
    id: 1,
    title: "Employment Duration",
    originalText: "The Employee's employment under this Agreement shall commence on the Effective Date and shall continue until terminated in accordance with the provisions herein. This Agreement may be terminated by either party with thirty (30) days written notice.",
    translation: "Your job starts on the date mentioned in this contract and continues until either you or the company decides to end it. Either side can end the job by giving 30 days written notice to the other.",
    importance: "high",
  },
  {
    id: 2,
    title: "Compensation Structure",
    originalText: "The Company shall pay Employee a base salary of $75,000 per annum, payable in accordance with the Company's standard payroll practices. In addition to base salary, Employee may be eligible for discretionary bonuses based on performance metrics established by the Company.",
    translation: "The company will pay you $75,000 per year, following their normal pay schedule. You might also get bonus money based on how well you do your job, but the company decides if and how much bonus you get.",
    importance: "high",
  },
  {
    id: 3,
    title: "Confidentiality Obligations",
    originalText: "Employee acknowledges that during the course of employment, Employee may have access to and become acquainted with various trade secrets, inventions, innovations, processes, information, records and specifications owned or licensed by the Company.",
    translation: "You understand that in this job, you'll learn about secret business information, company processes, and other private details that belong to the company.",
    importance: "medium",
  },
]

const mockChatHistory = [
  {
    id: 1,
    type: "user" as const,
    message: "What does the termination clause mean for me?",
    timestamp: "2:30 PM",
  },
  {
    id: 2,
    type: "ai" as const,
    message: "The termination clause means that either you or your employer can end the employment relationship by providing 30 days written notice. This gives both parties protection and time to plan for the transition.",
    timestamp: "2:31 PM",
  },
  {
    id: 3,
    type: "user" as const,
    message: "Can I negotiate the salary mentioned in this contract?",
    timestamp: "2:35 PM",
  },
  {
    id: 4,
    type: "ai" as const,
    message: "Yes, salary is typically negotiable before signing the contract. The document shows a base salary of $75,000 plus potential performance bonuses. You could discuss adjustments to the base salary, bonus structure, or additional benefits during negotiations.",
    timestamp: "2:36 PM",
  },
]

export default function DocumentAnalysis() {
  const [chatMessage, setChatMessage] = useState("")
  const [chatHistory, setChatHistory] = useState(mockChatHistory)

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!chatMessage.trim()) return

    // Add user message
    const newUserMessage = {
      id: chatHistory.length + 1,
      type: "user" as const,
      message: chatMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    // Simulate AI response
    const aiResponse = {
      id: chatHistory.length + 2,
      type: "ai" as const,
      message: "I understand your question about the document. Based on the clauses I've analyzed, I can help clarify the legal implications and provide guidance in simple terms.",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setChatHistory([...chatHistory, newUserMessage, aiResponse])
    setChatMessage("")
  }

  const handleReadAloud = (text: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      speechSynthesis.speak(utterance)
    }
  }

  const getImportanceBadge = (importance: string) => {
    switch (importance) {
      case "high":
        return <Badge variant="destructive">High Priority</Badge>
      case "medium":
        return <Badge variant="secondary">Medium Priority</Badge>
      default:
        return <Badge variant="outline">Low Priority</Badge>
    }
  }

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Left Panel - Document Viewer */}
      <div className="flex-1 border-r bg-background">
        <div className="border-b p-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-semibold">Employment Contract.pdf</h1>
              <p className="text-sm text-muted-foreground">
                Analyzed • 3 key clauses identified
              </p>
            </div>
          </div>
        </div>

        <ScrollArea className="h-[calc(100%-5rem)] p-4">
          <div className="space-y-6">
            {mockClauses.map((clause) => (
              <Card key={clause.id} className="border-l-4 border-l-primary">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{clause.title}</CardTitle>
                    {getImportanceBadge(clause.importance)}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Original Legal Text */}
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-2">
                      Original Legal Text:
                    </h4>
                    <div className="bg-muted/50 p-3 rounded-md text-sm leading-relaxed">
                      {clause.originalText}
                    </div>
                  </div>

                  <Separator />

                  {/* Layman's Translation */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-sm text-primary">
                        Simple Translation:
                      </h4>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleReadAloud(clause.translation)}
                      >
                        <Volume2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="bg-primary/5 p-3 rounded-md text-sm leading-relaxed">
                      {clause.translation}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Right Panel - AI Chat */}
      <div className="w-96 flex flex-col bg-muted/30">
        <div className="border-b p-4">
          <h2 className="text-lg font-semibold">Ask NyayMantra about this document</h2>
          <p className="text-sm text-muted-foreground">
            Get instant answers about your legal document
          </p>
        </div>

        {/* Chat History */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {chatHistory.map((chat) => (
              <div
                key={chat.id}
                className={`flex ${chat.type === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 text-sm ${
                    chat.type === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-background border"
                  }`}
                >
                  <p>{chat.message}</p>
                  <p className="text-xs mt-1 opacity-70">{chat.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Chat Input */}
        <div className="border-t p-4">
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <Input
              placeholder="Ask about this document..."
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" size="sm">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}