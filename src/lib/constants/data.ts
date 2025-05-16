export enum CallStatusEnum {
  SCHEDULED = 'SCHEDULED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  NO_ANSWER = 'NO_ANSWER',
  RESCHEDULED = 'RESCHEDULED',
  FOLLOW_UP = 'FOLLOW_UP',
  PENDING = 'PENDING'
}

export const PotentialCustomer = [
  {
    id: '1',
    name: 'John Doe',
    email: 'Johndoe@gmail.com',
    image: '/vercel.svg',
    isActive: true,
    lastLoginAt: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
    tags: ['New', 'Hot Lead'],
    callStatus: CallStatusEnum.COMPLETED,
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'janesmith@gmail.com',
    image: '/vercel.svg',
    isActive: true,
    lastLoginAt: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
    tags: ['New', 'Hot Lead'],
    callStatus: CallStatusEnum.SCHEDULED,
  },
  {
    id: '3',
    name: 'Alice Johnson',
    email: 'alicejohnson@gmail.com',
    image: '/vercel.svg',
    isActive: true,
    lastLoginAt: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
    tags: ['New', 'Hot Lead'],
    callStatus: CallStatusEnum.IN_PROGRESS,
  }
]
