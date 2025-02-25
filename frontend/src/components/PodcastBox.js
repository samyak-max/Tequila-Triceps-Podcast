import React, {useState} from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Stack from '@mui/material/Stack';
import PodcastModal from './PodcastModal';
import { useAuth } from "../contexts/AuthContext";
import axios from 'axios';

function limitText(text, maxLength) {
  if (text.length <= maxLength) return text;
  text = text.substr(0, maxLength);
  var lastSpace = text.lastIndexOf(' ');
  return text.substr(0, lastSpace) + '...';
}
export const PodcastBox = function MusicCard(props) {

  const [open, setOpen] = useState(false);
  const [favorite, setFavorite]=useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const {baseURL, currentUser}=useAuth();

 async function handleFav(e){
  console.log(currentUser.email, props.id)
  await axios.post(baseURL+"/api/favorite", {
    email: currentUser.email,
    id: props.id
  }, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
      .then(function (response) {
      })
      .catch(function (response) {
        console.log(response);
      });
      setFavorite(!favorite);
  }

  return (
    <>
    <Card sx={{boxShadow:"rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",padding:1,borderRadius:3,width: 300,  minHeight:400, margin:2}}>
      <Button onClick={handleOpen}>
      <CardMedia
        component="img"
        sx={{ objectFit:"cover", borderRadius:5, height: 250, width: 300, padding:1 }}
        alt="thumbnail"
        image={props.thumbnailURL}
      />
      </Button>
      <PodcastModal open={open} handleClose={handleClose} id={props.id} podcastName={props.podcastName} speakerName={props.speakerName} description={props.description} thumbnailURL={props.thumbnailURL} fileURL={props.fileURL} type={props.type}/>
      <CardContent sx={{padding:1}}>
        <Stack direction="row" sx={{textAlign:"left", justifyContent:"space-between"}}>
          <Stack>
          <Typography gutterBottom variant="h6" component="div" sx={{marginBottom:0, textAlign:'center'}}>
            {props.podcastName}
          </Typography>
          <Typography gutterBottom variant="h8" component="div">
            {props.speakerName}
          </Typography>
          </Stack>
          <CardActions sx={{padding:0, alignItems: "flex-start"}}>
            <IconButton onClick={handleFav} sx={{color:props.fav?"red":"grey"}} aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
          </CardActions>
        </Stack>
        <Typography sx={{height:30, textAlign:"justify"}} variant="body2" color="text.secondary">
          {limitText(props.description,110)}
        </Typography>
      </CardContent>
    </Card>
    </>
  );
};
export default PodcastBox;
