import * as React from "react"
import { useState, useEffect } from "react"
import { Dialog, DialogOverlay, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import axios from "axios"

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
    // Fetch questions from the API
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('/api/questions/')
        setQuestions(response.data)
      } catch (error) {
        console.error("Error fetching questions:", error.response ? error.response.data : error.message)
      }
    }

    if (isOpen) {
      fetchQuestions()
    }
  }, [isOpen])

  const handleAnswerChange = (questionId: number, answer: string) => {
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [questionId]: answer
    }))
  }

  const handleSubmit = async () => {
    try {
      await axios.post('/api/user-answers/', {
        answers: Object.entries(answers).map(([questionId, answer]) => ({
          question: questionId,
          answer
        }))
      })
      onComplete(answers)
      onClose()
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error submitting answers:", error.response ? error.response.data : error.message)
      } else {
        console.error("Error submitting answers:", error)
      }
   }
  }

  const currentQuestion = questions[currentQuestionIndex]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay />
      <DialogContent>
        <DialogTitle>Personalization Questions</DialogTitle>
        {currentQuestion && (
          <div>
            <Label>{currentQuestion.text}</Label>
            <RadioGroup
              value={answers[currentQuestion.id] || ''}
              onValueChange={(value) => handleAnswerChange(currentQuestion.id, value)}
            >
              {currentQuestion.options.map((option) => (
                <RadioGroupItem key={option} value={option}>
                  {option}
                </RadioGroupItem>
              ))}
            </RadioGroup>
            <button
              onClick={() => setCurrentQuestionIndex((prevIndex) => prevIndex + 1)}
              disabled={currentQuestionIndex >= questions.length - 1}
            >
              Next
            </button>
            {currentQuestionIndex === questions.length - 1 && (
              <button onClick={handleSubmit}>Submit</button>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default PersonalizationModal
