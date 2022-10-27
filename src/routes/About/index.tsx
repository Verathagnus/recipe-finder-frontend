import React from 'react'

const About = () => {
  return (
    <div id='about' className="px-10 w-[90%]  mx-auto drop-shadow-lg pb-20">
      <h3 className="font-medium text-left leading-tight text-3xl mt-0 mb-2 text-red-600 pb-5 pt-10">
        About
        </h3>
        <p>A recipe finder site to find recipes based on ingredients</p>
        <p>Currently, it uses a simple view count, times filtered count etc. to show the more popular objects first.</p>
    </div>
  )
}

export default About