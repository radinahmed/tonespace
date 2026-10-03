import { AuthGate } from 'deepspace'
import { Iphone } from '../../components/Iphone'

export default function HomePage() {
  return (
    <AuthGate>
      <Iphone />
    </AuthGate>
  )
}