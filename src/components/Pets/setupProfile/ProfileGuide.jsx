import './ProfileGuide.css';
const ProfileGuide = () => {
    return (
        <div className="profile-guide-container">
          <div className="content">
            <h3>Adopt or Rehome a pet in just </h3>
            <p>3 Easy Steps</p>
          </div>
          <div className="rehomeCard">
            <div className="background-image">
                <img src="/src/assets/Right & Left.png" alt="dashed background" />
            </div>
            <div className="three-card-layout">
                <div className="card card1">
                    <div className="circle_container">
                        <p className="circle">1</p>
                    </div>
                    <img className="profileIcons" src="/src/assets/group_add.png" alt="edit info" />
                    <p>Set up your profile (including photos) in minutes</p>
                </div>
                <div className="card card2">
                    <div className="circle_container">
                        <p className="circle">2</p>
                    </div>
                    <img className="profileIcons" src="/src/assets/home_work.png" alt="home" />
                    <p>Describe your home and routine so rehomers can see if it’s right for their pet</p>
                </div>
                <div className="card card3">
                    <div className="circle_container">
                        <p className="circle">3</p>
                    </div>
                    <img className="profileIcons" src="/src/assets/content_paste_search.png" alt="paper" />
                    <p>Start your search!</p>
                </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileGuide;
