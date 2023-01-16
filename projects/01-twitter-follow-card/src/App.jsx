import './App.css'
import { TwitterFollowCard } from './TwitterFollowCard'

const users = [
  {
    userName: 'midudev',
    name: 'Gerardo Garnica',
    isFollowing: false
  },
  {
    userName: 'holamundo',
    name: 'HolaMundo',
    isFollowing: true
  },
  {
    userName: 'elonmusk',
    name: 'Elon Musk',
    isFollowing: false
  },
  {
    userName: 'samarj_h',
    name: 'Samar Jaffal Mani',
    isFollowing: false
  }
]

export function App() {
  const format = (userName) => `@${userName}`

  return (
    <section className='app-cards'>
      {
        users.map(({ userName, name, isFollowing }) => (
          <TwitterFollowCard
            key={userName}
            formatUserName={format}
            userName={userName}
            initialIsFollowing={isFollowing}>
            {name}
          </TwitterFollowCard>
          ))
      }
    </section>
  )
}