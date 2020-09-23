// Borrowed liberally from https://itnext.io/adding-commento-to-react-apps-like-gatsby-871824fb57ae
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

const { REACT_APP_COMMENTO_URL } = process.env

// Helper to add scripts to our page
const insertScript = (src, id, parentElement) => {
  const script = window.document.createElement('script')
  script.async = true
  script.src = src
  script.id = id
  parentElement.appendChild(script)
  return script
}
// Helper to remove scripts from our page
const removeScript = (id, parentElement) => {
  const script = window.document.getElementById(id)
  if (script) {
    parentElement.removeChild(script)
  }
}
// The actual component
const Commento = ({ id }) => {
  useEffect(() => {
    // If there's no window there's nothing to do for us
    if (!window) {
      return
    }
    const document = window.document
    // In case our #commento container exists we can add our commento script
    if (document.getElementById('commento')) {
      insertScript(`${REACT_APP_COMMENTO_URL}/js/commento.js`, 'commento-script', document.body)
    }
    // Cleanup; remove the script from the page
    return () => removeScript('commento-script', document.body)
  }, [id])
  return <div id={'commento'} />
}

Commento.propTypes = {
  id: PropTypes.string.isRequired
}

export default Commento
