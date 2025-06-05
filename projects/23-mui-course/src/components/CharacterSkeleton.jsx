import { Card, CardContent, Skeleton } from '@mui/material'

export default function CharacterSkeleton() {
  return (
    <Card>
      <Skeleton
        variant='rectangular'
        width={250}
        height={250}
      />

      <CardContent>
        <Skeleton
          variant='rectangular'
          height={25}
        />
      </CardContent>
    </Card>
  )
}
