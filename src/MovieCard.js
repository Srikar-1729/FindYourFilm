import React from 'react'
import './MovieCard.css';
import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImdb } from '@fortawesome/free-brands-svg-icons';



function MovieCard({plot,title,image,runtime,date,dir,cast,imdbRat,ott}){
   
    
    return(
        <div class="Card">
          <img src={image} alt="Movie Poster" class="poster"></img>
          <div class="content">
            <h1 style={{margin:0,fontFamily: 'Bebas Neue'}}>{title}</h1>
            <p style={{margin:0,fontFamily:"Roboto"}}>{runtime}</p>
            
            
            <p class='plot' style={{fontFamily:"Roboto"}}>{plot}</p>
            <div style={{display:'flex',gap:'25px'}}>
              <div >
                  <p style={{margin:0,fontWeight:'bolder'}}>{imdbRat}/10</p>
                  <FontAwesomeIcon icon={faImdb} size="2xl" style={{color:'black',margin:5,backgroundColor:'yellow'}} />
              </div>
              {{ott}.length!=0 && <p style={{fontFamily:"Roboto"}}><span style={{fontWeight:"bold"}}>Available on: </span>{ott}</p> }
            </div>
           
            <div class="crew" style={{display:"flex",gap:'10px',fontFamily:"Roboto"}}>
               
               <p style={{margin:0}}><span style={{fontWeight:'bold'}}>Director : </span>{dir}</p>
               <p style={{margin:0}}><span style={{fontWeight:'bold'}}>Cast : </span>{cast}</p>
              
            </div>
            
          </div>
         
        </div>

        // <Card sx={{display:'flex',width:'85%', minHeight:'50%'}}>
        //     <CardMedia
        //         sx={{ height:266,width:340,margin: '5px'}}
        //         image={image}
        //         title="green iguana"
        //     />
        //     <Box sx={{ display: "flex", flexDirection: "column",maxWidth:'700px',height:'266px'}}>
        // <CardContent sx={{display:"flex",flexDirection:"column",height:'100%'}}>
        //   <Typography variant="h4" component="div" sx={{}} >
        //     {title}
        //   </Typography>
        //   <Typography variant="body1" component="div" sx={{}}>
        //     {runtime}
        //   </Typography>
        //   <Typography variant="body2" color="text.secondary" sx={{textAlign:'left'}}>
        //     {plot}
        //   </Typography>
        //   <div style={{}}>
        //     <Typography variant="body2" color="text.primary" sx={{textAlign:'left',fontWeight:'bold'}}>
                    
        //       {imdbRat}/10 

        //     </Typography>
            // <FontAwesomeIcon icon={faImdb} size="2xl" style={{color:'black',margin:5,backgroundColor:'yellow'}} />
     
             
      //     </div>
          
          
      //   </CardContent>
      // </Box>
      //   </Card>
    );
}

export default MovieCard;