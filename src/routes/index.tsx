import { createFileRoute } from '@tanstack/react-router'
import { Countdown } from '../components/Countdown'
import { Programme } from '../components/Programme'
import { PhotoDrop } from '../components/PhotoDrop'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-8 p-8">
      <h1 className="text-4xl font-bold">ASSC Formal Website</h1>
      <Countdown />
      <Programme />
      <PhotoDrop />
    </div>
  )
}
