import { useState } from 'react'

export function TwitterFollowCard({ children, formatUserName, userName, initialIsFollowing }) {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing)

  const followingButtonText = isFollowing ? 'Siguiendo' : 'Seguir'
  const followingButtonClassName = isFollowing
    ? 'tw-followCard-button is-following'
    : 'tw-followCard-button'
  
  const handleFollowingButtonClick = () => {
    setIsFollowing(!isFollowing)
  }

  return (
    <article className='tw-followCard'>
      <header className='tw-followCard-header'>
        <img
          className='tw-followCard-avatar'
          alt="El avatar del usuario"
          src={`https://unavatar.io/${userName}`} />
        <div className='tw-followCard-info'>
          <strong>{children}</strong>
          <span className='tw-followCard-userName'>{formatUserName(userName)}</span>
        </div>
      </header>

      <aside>
        <button className={followingButtonClassName} onClick={handleFollowingButtonClick}>
          <span className='tw-followCard-buttonText'>{followingButtonText}</span>
          <span className='tw-followCard-button-stopFollow'>Dejar de seguir</span>
        </button>
      </aside>
    </article>
  )
}