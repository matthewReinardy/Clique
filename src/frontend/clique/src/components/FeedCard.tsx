import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";
import Flag from "@mui/icons-material/Flag";
import { deletePost } from "../api/postApi";
import { toast } from "react-toastify";

interface FeedCardProps {
  username: string;
  date: string;
  content: string;
  location: string;
  likeCount: number;
  image: string;
  tag: string;
  postId: Number;
  isAd: boolean;
}

export default function FeedCard({
  username,
  date,
  content,
  location,
  likeCount,
  image,
  tag,
  postId,
  isAd,
}: FeedCardProps) {
  const formattedDate = new Date(date).toLocaleString("en-US", {
    month: "short", // "Apr"
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const handleDelete = () => {
    const deleteP = async () => {
      try {
        const response = await deletePost(postId);
        if (response) toast.success("Post deleted successfully");
      } catch (error) {
        toast.error(`Error: ${error}`);
      }
    };

    deleteP();
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <Flag />
          </IconButton>
        }
        title={username}
        subheader={formattedDate}
      />
      <CardMedia
        component="img"
        height="194"
        image={`data:image/jpeg;base64,${image}`}
        alt="No Photo"
      />
      <CardContent>
        {isAd && (
          <Typography
            variant="body2"
            sx={{ color: "grey", fontStyle: "italic", fontSize: "10px" }}
          >
            Sponsored
          </Typography>
        )}
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {likeCount} likes
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {content}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {location}
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: "text.secondary", fontStyle: "italic" }}
        >
          {tag}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton onClick={handleDelete} aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
