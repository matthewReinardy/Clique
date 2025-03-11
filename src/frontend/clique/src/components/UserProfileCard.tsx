import { useUser } from "../context/UserContext";
import { Card, CardContent, Typography } from "@mui/material"

export default function UserProfileCard() {

    const {users, loading, error} = useUser()

    return (
        <Card>
            <Typography>Hi!</Typography>

        </Card>
      );
}