import {
  Card,
  CardContent,
  CardMedia,
  Skeleton,
  Typography,
} from '@mui/material'

export default function Character({ data, loading }) {
  return (
    <Card>
      {loading ? (
        <Skeleton
          variant='rectangular'
          width={250}
          height={250}
        />
      ) : (
        <CardMedia
          image={data.image}
          title='Rick Sanchez'
          sx={{ height: 250, width: 250 }}
        />
      )}

      <CardContent>
        {loading ? (
          <Skeleton
            variant='rectangular'
            height={25}
          />
        ) : (
          <Typography variant='h5'>{data.name}</Typography>
        )}
      </CardContent>
    </Card>
  )
}
