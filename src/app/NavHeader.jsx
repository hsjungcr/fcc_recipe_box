import React from 'react';

//maybe add hover to change color later
export default class NavHeader extends React.Component{
  render(){
    const headerStyle ={
      layout:"inline-block"
    }
    return(
      <div style={headerStyle} className="container">
        <h2>FCC Recipe Box</h2><h4>Han Jung</h4>
        <a href="https://www.github.com/hsjungcr" target="_blank"><img src="https://assets-cdn.github.com/images/modules/logos_page/GitHub-Mark.png" height="50" width="50"></img></a>
        <a href="https://www.linkedin.com/in/hsjungcr" target="_blank"><img src="https://cdn3.iconfinder.com/data/icons/free-social-icons/67/linkedin_circle_black-512.png" height="45" width="45"></img></a>
    </div>
    )
  }
}
