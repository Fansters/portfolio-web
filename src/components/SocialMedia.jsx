import React from 'react'

import {FaLinkedin, FaGithub} from 'react-icons/fa'

const SocialMedia = () => {
  return (
     <div className='app__social'>
        <div>
           <FaLinkedin />
        </div>
        <div>
           <FaGithub />
        </div>
    </div>
  )
}

export default SocialMedia