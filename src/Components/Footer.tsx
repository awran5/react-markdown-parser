import React, { memo } from 'react'

function Footer() {
  return (
    <footer>
      <a href='https://github.com/awran5/react-markdown-parser' title='repo' target='_blank' rel='noreferrer'>
        Github
      </a>
      -
      <a href='https://github.com/awran5/react-markdown-parser/issues' title='issues' target='_blank' rel='noreferrer'>
        Issues
      </a>
    </footer>
  )
}

export default memo(Footer)
