import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface Question {
  id: number;
  text: string;
  options: string[];
  category: string;
}

interface PersonalizationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (answers: Record<number, string>) => void;
}

const PersonalizationModal: React.FC<PersonalizationModalProps> = ({ isOpen, onClose, onComplete }) => {
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})

  useEffect(() => {
    // In a real application, you would fetch these questions from your API
    const fetchedQuestions: Question[] = [
      {
        id: 1,
        text: "How do you prefer to access educational content?",
        options: ["Tablet", "Computer", "Both", "Smartphone", "E-reader"],
        category: "Technology Usage"
      },
      {
        id: 2,
        text: "What is your preferred method of learning?",
        options: ["Reading", "Videos", "Interactive Quizzes", "Group Discussions", "Hands-on Projects"],
        category: "Learning Preferences"
      },
      {
        id: 3,
        text: "How many hours a day can you dedicate to learning?",
        options: ["1-2 hours", "3-4 hours", "5+ hours", "Less than 1 hour", "Variable depending on the day"],
        category: "Time Management"
      },
      // Add more questions here...
    ]
    setQuestions(fetchedQuestions)
  }, [])

  const handleAnswer = (answer: string) => {
    setAnswers(prev => ({ ...prev, [questions[currentQuestionIndex].id]: answer }))
  }

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
    } else {
      onComplete(answers)
    }
  }

  const currentQuestion = questions[currentQuestionIndex]

  if (!currentQuestion) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{currentQuestion.category}</DialogTitle>
          <DialogDescription>
            Question {currentQuestionIndex + 1} of {questions.length}
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <h4 className="mb-4 text-lg font-medium">{currentQuestion.text}</h4>
          <RadioGroup onValueChange={handleAnswer} value={answers[currentQuestion.id]}>
            {currentQuestion.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`}>{option}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        <DialogFooter>
          <Button onClick={handleNext} disabled={!answers[currentQuestion.id]}>
            {currentQuestionIndex < questions.length - 1 ? "Next" : "Complete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default PersonalizationModal

