import React, { memo } from 'react'

function Footer() {
  return (
    <footer>
      <a href='github' title='Github Repo' target='_blank' rel='noreferrer'>
        Github
      </a>
      -
      <a href='https://www.markdownguide.org/extended-syntax/' title='issues' target='_blank' rel='noreferrer'>
        Issues
      </a>
    </footer>
  )
}

export default memo(Footer)
