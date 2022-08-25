// import React, { useState } from 'react';
// import FavoriteIcon from '@mui/icons-material/Favorite';


// const LikeButton = () => {
//   const [likes, setLikes] = useState(0);
//   const [isClicked, setIsClicked] = useState(false);

//   const handleClick = (e) => {
    
//     if (isClicked) {
//         e.preventDefault();
//       setLikes(likes - 1);
//     } else {
//       setLikes(likes + 1);
//     }
//     setIsClicked(!isClicked);
//   };

//   return (
//     <button className={ `like-button ${isClicked && 'liked'}` } onClick={ handleClick }>
//       <FavoriteIcon/>
//       <span className="likes-counter">{ `${likes}` }</span>
//     </button>
//   );
// };

// export default LikeButton;