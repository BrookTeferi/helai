from django.core.management.base import BaseCommand
from assessments.models import Category, Choice,Question
from account_users.models import Role
from django.conf import settings


class Command(BaseCommand):
    help = "Seed Questions"
    def handle(self, *args, **kwargs):
        questions_data = {
  "Student": {
    "Technology Usage": [
      {
        "text": "How do you prefer to access educational content?",
        "options": ["Tablet", "Computer", "Both", "Smartphone", "E-reader"]
      },
      {
        "text": "How often do you use technology to aid your learning?",
        "options": ["Every day", "Several times a week", "Occasionally", "Rarely", "Never"]
      },
      {
        "text": "Which device do you find most effective for learning?",
        "options": ["Laptop", "Tablet", "Smartphone", "Desktop", "None"]
      },
      {
        "text": "What type of online platforms do you use for learning?",
        "options": ["YouTube", "Online courses", "Podcasts", "E-books", "Social Media"]
      },
      {
        "text": "How comfortable are you using educational technology?",
        "options": ["Very comfortable", "Somewhat comfortable", "Not comfortable", "I need assistance"]
      }
    ],
    "Learning Preferences": [
      {
        "text": "What is your preferred method of learning?",
        "options": ["Reading", "Videos", "Interactive Quizzes", "Group Discussions", "Hands-on Projects"]
      },
      {
        "text": "Do you prefer learning individually or in groups?",
        "options": ["Individually", "In Groups", "A mix of both"]
      },
      {
        "text": "How do you prefer to receive feedback on your learning progress?",
        "options": ["Written feedback", "Verbal feedback", "Peer feedback", "Self-assessment"]
      },
      {
        "text": "Which type of learning environment helps you focus best?",
        "options": ["Quiet room", "Background music", "Group study", "Public spaces"]
      },
      {
        "text": "How do you like to engage with your learning materials?",
        "options": ["Active Participation", "Watching lectures", "Taking notes", "Discussions"]
      }
    ],
    "Time Management": [
      {
        "text": "How many hours a day can you dedicate to learning?",
        "options": ["1-2 hours", "3-4 hours", "5+ hours", "Less than 1 hour", "Variable depending on the day"]
      },
      {
        "text": "How do you manage your study schedule?",
        "options": ["Strictly planned", "Flexible", "Last-minute", "Depends on workload"]
      },
      {
        "text": "Do you prefer to study in short bursts or long sessions?",
        "options": ["Short bursts", "Long sessions", "A mix of both"]
      },
      {
        "text": "How often do you review your study materials?",
        "options": ["Daily", "Once a week", "Before exams", "Rarely"]
      },
      {
        "text": "What time of day do you prefer to study?",
        "options": ["Morning", "Afternoon", "Evening", "Night", "Anytime"]
      }
    ],
    "Motivation": [
      {
        "text": "What motivates you to study?",
        "options": ["Grades", "Interest in subject", "Future career", "Peer pressure", "Other"]
      },
      {
        "text": "How do you stay motivated during difficult tasks?",
        "options": ["Breaks", "Rewards", "Support from peers", "Focus on the end goal"]
      },
      {
        "text": "How often do you feel motivated to start studying?",
        "options": ["Every day", "Weekly", "Occasionally", "Rarely"]
      },
      {
        "text": "What factors most influence your motivation to study?",
        "options": ["Course difficulty", "Instructor's teaching style", "Peer group", "Personal interest"]
      },
      {
        "text": "How do you set goals for your studies?",
        "options": ["Long-term goals", "Short-term goals", "Weekly goals", "No specific goals"]
      }
    ],
    "Course Engagement": [
      {
        "text": "How often do you engage with course content outside of class?",
        "options": ["Daily", "Weekly", "Occasionally", "Rarely"]
      },
      {
        "text": "How do you prefer to engage with course materials?",
        "options": ["Read", "Watch videos", "Participate in discussions", "Take notes"]
      },
      {
        "text": "How do you prepare for exams?",
        "options": ["Study notes", "Practice problems", "Group study", "Review past exams"]
      },
      {
        "text": "How engaged do you feel in your current course?",
        "options": ["Very engaged", "Somewhat engaged", "Neutral", "Not engaged"]
      },
      {
        "text": "How do you stay focused during lectures?",
        "options": ["Taking notes", "Asking questions", "Staying active", "Listening passively"]
      }
    ],
    "Preferred Communication": [
      {
        "text": "How do you prefer to communicate with your instructor?",
        "options": ["Email", "Class announcements", "One-on-one meetings", "Online forums", "Other"]
      },
      {
        "text": "How do you prefer to receive reminders and updates from your instructor?",
        "options": ["Email", "SMS", "Course platform notifications", "Social media"]
      },
      {
        "text": "How do you prefer to collaborate with peers?",
        "options": ["Group chat", "In-person meetings", "Online forums", "Email"]
      },
      {
        "text": "How often would you like communication from your instructor?",
        "options": ["Once a week", "Before exams", "Only as needed", "Every day"]
      },
      {
        "text": "How would you like to give feedback to your instructor?",
        "options": ["Surveys", "Anonymous forms", "In-person meetings", "Class discussions"]
      }
    ],
    "Course Feedback": [
      {
        "text": "How satisfied are you with the current course material?",
        "options": ["Very satisfied", "Satisfied", "Neutral", "Dissatisfied", "Very dissatisfied"]
      },
      {
        "text": "How clear are the course objectives?",
        "options": ["Very clear", "Clear", "Somewhat clear", "Unclear", "Very unclear"]
      },
      {
        "text": "How well does the course align with your learning goals?",
        "options": ["Very well", "Well", "Somewhat well", "Poorly", "Not at all"]
      },
      {
        "text": "How likely are you to recommend this course to others?",
        "options": ["Very likely", "Likely", "Neutral", "Unlikely", "Very unlikely"]
      },
      {
        "text": "How satisfied are you with the instructor's teaching methods?",
        "options": ["Very satisfied", "Satisfied", "Neutral", "Dissatisfied", "Very dissatisfied"]
      }
    ]
  },
  "Instructor": {
    "Technology Usage": [
      {
        "text": "How do you prefer to access educational content for teaching?",
        "options": ["Tablet", "Computer", "Both", "Smartphone", "E-reader"]
      },
      {
        "text": "How often do you incorporate technology into your teaching?",
        "options": ["Every class", "Weekly", "Occasionally", "Rarely", "Never"]
      },
      {
        "text": "What type of teaching tools do you primarily use?",
        "options": ["PowerPoint", "Interactive Whiteboard", "Videos", "Online Platforms", "Books"]
      },
      {
        "text": "Which technology do you find most useful for creating learning materials?",
        "options": ["Online Learning Platforms", "Word Processors", "Presentation Software", "Video Editing Software", "Other"]
      },
      {
        "text": "How comfortable are you using technology in your teaching?",
        "options": ["Very comfortable", "Somewhat comfortable", "Not comfortable", "I need assistance"]
      }
    ],
    "Learning Preferences": [
      {
        "text": "What is your preferred method of teaching?",
        "options": ["Lectures", "Interactive Sessions", "Group Activities", "Online Modules", "Hands-on Demonstrations"]
      },
      {
        "text": "How do you organize your teaching content?",
        "options": ["Lectures", "Readings", "Assignments", "Interactive Activities", "Discussions"]
      },
      {
        "text": "How do you handle diverse learning styles in your class?",
        "options": ["Provide different formats", "Incorporate multimedia", "One-on-one sessions", "Self-paced learning", "Group work"]
      },
      {
        "text": "What type of activities do you prefer to include in your teaching?",
        "options": ["Group projects", "Case studies", "Role plays", "Debates", "Exams"]
      },
      {
        "text": "How do you engage students in your classes?",
        "options": ["Discussions", "Quizzes", "Hands-on activities", "Lectures", "Group work"]
      }
    ],
    "Time Management": [
      {
        "text": "How many hours a day can you dedicate to teaching?",
        "options": ["1-2 hours", "3-4 hours", "5+ hours", "Variable", "Depends on the workload"]
      },
      {
        "text": "How do you allocate your time between teaching and preparation?",
        "options": ["Mostly teaching", "Mostly preparation", "Balanced", "Depends on the week"]
      },
      {
        "text": "Do you prefer to conduct classes in the morning or evening?",
        "options": ["Morning", "Afternoon", "Evening", "Anytime"]
      },
      {
        "text": "How do you manage time during a class session?",
        "options": ["Strict schedule", "Flexible depending on discussion", "Based on student engagement", "Time-sensitive"]
      },
      {
        "text": "How do you prioritize tasks when preparing for a class?",
        "options": ["Lecture preparation", "Creating assignments", "Student interaction", "Grading", "Planning activities"]
      }
    ],
    "Motivation": [
      {
        "text": "How do you stay motivated to teach?",
        "options": ["Student progress", "Passion for the subject", "Positive feedback", "Peer collaboration"]
      },
      {
        "text": "How do you motivate students in your class?",
        "options": ["Inspiring lectures", "Active participation", "Incorporating technology", "Rewards", "Challenges"]
      },
      {
        "text": "How do you handle motivational challenges in students?",
        "options": ["Provide extra support", "Change teaching approach", "Involve parents", "Use peer support"]
      },
      {
        "text": "How often do you seek student feedback on your teaching?",
        "options": ["After every class", "At the end of a module", "Once a semester", "Rarely"]
      },
      {
        "text": "How do you act on the feedback provided by students?",
        "options": ["Make adjustments in teaching methods", "Ignore feedback", "Provide individual responses"]
      }
    ],
    "Course Engagement": [
      {
        "text": "How often do you engage with course content outside of class?",
        "options": ["Daily", "Weekly", "Occasionally", "Rarely"]
      },
      {
        "text": "How do you engage with students outside of class?",
        "options": ["Email", "Office hours", "Online forums", "Study groups", "Social media"]
      },
      {
        "text": "How often do you update course materials?",
        "options": ["Every semester", "Annually", "When necessary", "Rarely"]
      },
      {
        "text": "How do you encourage student participation in class?",
        "options": ["Interactive discussions", "Quizzes", "Group activities", "Lectures", "Peer presentations"]
      },
      {
        "text": "How would you improve student engagement in your courses?",
        "options": ["More hands-on activities", "More online resources", "Increased collaboration", "Better communication"]
      }
    ],
    "Preferred Communication": [
      {
        "text": "How do you prefer to communicate with students?",
        "options": ["Email", "Course announcements", "One-on-one meetings", "Online platforms"]
      },
      {
        "text": "How do you prefer to receive feedback from students?",
        "options": ["Surveys", "Anonymous forms", "One-on-one discussions", "Email"]
      },
      {
        "text": "How often would you like communication from students?",
        "options": ["Every class", "Occasionally", "Only as needed"]
      },
      {
        "text": "How do you prefer to communicate with other instructors?",
        "options": ["Email", "Online forums", "In-person meetings", "Group chats"]
      },
      {
        "text": "How often do you communicate with fellow instructors?",
        "options": ["Weekly", "Monthly", "Rarely", "Never"]
      }
    ],
    "Course Feedback": [
      {
        "text": "How satisfied are you with the course materials you teach?",
        "options": ["Very satisfied", "Satisfied", "Neutral", "Dissatisfied", "Very dissatisfied"]
      },
      {
        "text": "How clear are the course objectives for you?",
        "options": ["Very clear", "Clear", "Somewhat clear", "Unclear", "Very unclear"]
      },
      {
        "text": "How well do you think the course is helping students achieve their learning goals?",
        "options": ["Very well", "Well", "Somewhat well", "Poorly", "Not at all"]
      },
      {
        "text": "How likely are you to recommend the course to others?",
        "options": ["Very likely", "Likely", "Neutral", "Unlikely", "Very unlikely"]
      },
      {
        "text": "How satisfied are you with the students' engagement in the course?",
        "options": ["Very satisfied", "Satisfied", "Neutral", "Dissatisfied", "Very dissatisfied"]
      }
    ]
  }
}


        for role_name, categories in questions_data.items():
            role = Role.objects.get(name=role_name)
            
            for category_name, questions in categories.items():
                # Get or create the Category
                category, created = Category.objects.get_or_create(name=category_name)
                
                for question_data in questions:
                    # Create a new Question
                    question = Question.objects.create(role=role, category=category, text=question_data["text"], options=question_data["options"])
                    
                    # Output success message for each question
                    self.stdout.write(self.style.SUCCESS(f"Question '{question.text}' has been seeded successfully!"))
                
                # Output success message for category
                if created:
                    self.stdout.write(self.style.SUCCESS(f"Category '{category.name}' has been created successfully!"))
            
            # Output success message for role
            self.stdout.write(self.style.SUCCESS(f"Role '{role.name}' has been seeded successfully!"))

        self.stdout.write(self.style.SUCCESS("Questions have been seeded successfully!"))
