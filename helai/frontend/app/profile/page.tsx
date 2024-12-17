import UserProfileForm from '@/components/profile/UserProfileForm'

export default function ProfilePage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Complete Your Profile</h1>
      <UserProfileForm />
    </div>
  )
}

